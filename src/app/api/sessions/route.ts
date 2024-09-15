import { dbConnect } from "@/app/lib";
import Session, { Session as SessionType } from "@/app/models/Session";
// import Event from "@/app/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const sessions = await Session.find({});
    return NextResponse.json(sessions, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 520 });
    }
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const session: SessionType = await Session.create(body);
    // await Event.updateOne(
    //   { _id: session.eventId },
    //   { $push: { sessionIds: session._id } }
    // );
    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 520 });
    }
  }
}
