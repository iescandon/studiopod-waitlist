import { dbConnect } from "@/lib";
import Session from "@/models/Session";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  sessionId: string;
}

export async function GET(request: NextRequest, context: { params: Params }) {
  await dbConnect();
  try {
    const sessionId = context.params.sessionId;
    const session = await Session.findById(sessionId);
    return NextResponse.json(session, { status: 200 });
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
    const sessionId = context.params.sessionId;
    const body = await request.json();
    const session = await Session.findByIdAndUpdate(sessionId, body, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json(session, { status: 200 });
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
    const sessionId = context.params.sessionId;
    const message = await Session.deleteOne({ _id: sessionId });
    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 520 });
    }
  }
}
