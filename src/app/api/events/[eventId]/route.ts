import { dbConnect } from "@/lib";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  eventId: string;
}

export async function GET(request: NextRequest, context: { params: Params }) {
  await dbConnect();
  try {
    const eventId = context.params.eventId;
    const event = await Event.findById(eventId);
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 520 });
    }
  }
}

export async function PATCH(request: NextRequest, context: { params: Params }) {
  await dbConnect();
  try {
    const eventId = context.params.eventId;
    const { sessionIds, ...body } = await request.json();
    
    const event = await Event.findByIdAndUpdate(eventId, body, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json(event, { status: 200 });
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
    const message = await Event.deleteOne({ _id: eventId });
    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 520 });
    }
  }
}
