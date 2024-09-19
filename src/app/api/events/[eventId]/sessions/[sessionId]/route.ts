import { dbConnect } from "@/lib";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    eventId: string;
    sessionId: string;
  }

export async function DELETE(request: NextRequest, context: { params: Params }) {
  await dbConnect();
  try {
    const eventId = context.params.eventId;
    const sessionId = context.params.sessionId;
    const message = await Event.updateOne(
        { _id: eventId },
        { $pull: { sessionIds: sessionId } }
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