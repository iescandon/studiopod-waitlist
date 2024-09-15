import { dbConnect } from "@/app/lib";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  userId: string;
}

export async function GET(request: NextRequest, context: { params: Params }) {
  await dbConnect();
  try {
    const userId = context.params.userId;
    const user = await User.findById(userId);
    return NextResponse.json(user, { status: 200 });
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
    const userId = context.params.userId;
    const body = await request.json();
    const user = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json(user, { status: 200 });
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
    const userId = context.params.userId;
    const message = await User.deleteOne({ _id: userId });
    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 520 });
    }
  }
}
