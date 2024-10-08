import { dbConnect } from "@/lib";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  eventId: string;
}

const getEventWithUserSessions = (eventId: string) => {
  return Event.aggregate([
    { $match: { _id: eventId } },
    { $limit: 1 }, // Stop if no match is found

    // Step 1: Check if sessionIds array is empty
    {
      $project: {
        sessionIds: 1,
        name: 1,
        date: 1,
        logoUrl: 1,
        accessCode: 1,
        sessionIdsNotEmpty: { $gt: [{ $size: "$sessionIds" }, 0] }, // Check if sessionIds array has elements
      }
    },

    // Step 2: Use $facet to handle cases where sessionIds is empty or not
    {
      $facet: {
        sessionsPresent: [
          {
            $match: { sessionIdsNotEmpty: true } // Only process if sessionIds are present
          },
          { $lookup: { from: "sessions", localField: "sessionIds", foreignField: "_id", as: "sessions" } },
          { $unwind: "$sessions" },
          { $lookup: { from: "users", localField: "sessions.userId", foreignField: "_id", as: "sessions.user" } },
          { $unwind: "$sessions.user" },
          {
            $group: {
              _id: "$_id",
              name: { $first: "$name" },
              date: { $first: "$date" },
              logoUrl: { $first: "$logoUrl" },
              accessCode: { $first: "accessCode" },
              waiting: {
                $push: {
                  $cond: [
                    { $eq: ["$sessions.status", "waiting"] },
                    {
                      _id: "$sessions._id",
                      user: "$sessions.user",
                      status: "$sessions.status",
                      notified: "$sessions.notified",
                      checkInTime: "$sessions.checkInTime",
                      skippedTime: "$sessions.skippedTime",
                      entryTime: "$sessions.entryTime",
                      exitTime: "$sessions.exitTime"
                    },
                    null
                  ]
                }
              },
              completed: {
                $push: {
                  $cond: [
                    { $eq: ["$sessions.status", "completed"] },
                    {
                      _id: "$sessions._id",
                      user: "$sessions.user",
                      status: "$sessions.status",
                      notified: "$sessions.notified",
                      checkInTime: "$sessions.checkInTime",
                      skippedTime: "$sessions.skippedTime",
                      entryTime: "$sessions.entryTime",
                      exitTime: "$sessions.exitTime"
                    },
                    null
                  ]
                }
              },
              skipped: {
                $push: {
                  $cond: [
                    { $eq: ["$sessions.status", "skipped"] },
                    {
                      _id: "$sessions._id",
                      user: "$sessions.user",
                      status: "$sessions.status",
                      notified: "$sessions.notified",
                      checkInTime: "$sessions.checkInTime",
                      skippedTime: "$sessions.skippedTime",
                      entryTime: "$sessions.entryTime",
                      exitTime: "$sessions.exitTime"
                    },
                    null
                  ]
                }
              }
            }
          },
          {
            $project: {
              waiting: { $filter: { input: "$waiting", as: "item", cond: { $ne: ["$$item", null] } } },
              completed: { $filter: { input: "$completed", as: "item", cond: { $ne: ["$$item", null] } } },
              skipped: { $filter: { input: "$skipped", as: "item", cond: { $ne: ["$$item", null] } } },
              name: 1,
              date: 1,
              logoUrl: 1,
              accessCode: 1
            }
          },
          {
            $addFields: {
              waiting: {
                $sortArray: { input: "$waiting", sortBy: { checkInTime: 1 } }
              },
              completed: {
                $sortArray: { input: "$completed", sortBy: { exitTime: 1 } }
              },
              skipped: {
                $sortArray: { input: "$skipped", sortBy: { skippedTime: 1 } }
              }
            }
          }
        ],
        noSessions: [
          {
            $match: { sessionIdsNotEmpty: false } // No sessionIds, return basic event details
          },
          {
            $project: {
              name: 1,
              date: 1,
              logoUrl: 1,
              accessCode: 1,
              waiting: { $literal: [] },
              completed: { $literal: [] },
              skipped: { $literal: [] }
            }
          }
        ]
      }
    },

    // Step 3: Merge both facets back into a single result
    {
      $project: {
        eventData: {
          $cond: {
            if: { $gt: [{ $size: "$sessionsPresent" }, 0] },
            then: { $arrayElemAt: ["$sessionsPresent", 0] },
            else: { $arrayElemAt: ["$noSessions", 0] }
          }
        }
      }
    }
  ]).exec();
};

export async function GET(request: NextRequest, context: { params: Params }) {
  await dbConnect();
  try {
    const eventId = context.params.eventId;
    const event = await getEventWithUserSessions(eventId);
    return NextResponse.json(event[0].eventData || null, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 520 });
    }
  }
}

