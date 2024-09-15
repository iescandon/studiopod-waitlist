import { dbConnect } from "@/app/lib";
import Event from "@/app/models/Event";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    eventId: string;
  }

export async function POST(request: NextRequest, context: { params: Params }) {
  await dbConnect();
  try {
    const eventId = context.params.eventId;
    const body = await request.json();
    if (!body.sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    };
    const message = await Event.updateOne(
        { _id: eventId },
        { $push: { sessionIds: body.sessionId } }
      );
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 520 });
    }
  }
}

export async function DELETE(request: NextRequest, context: { params: Params }) {
  await dbConnect();
  try {
    const eventId = context.params.eventId;
    const body = await request.json();
    if (!body.sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    };
    const message = await Event.updateOne(
        { _id: eventId },
        { $pull: { sessionIds: body.sessionId } }
      );
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 520 });
    }
  }
}