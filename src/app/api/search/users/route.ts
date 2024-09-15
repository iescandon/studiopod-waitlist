import { dbConnect } from "@/app/lib";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const searchParams = request.nextUrl.searchParams;
    if (!searchParams) {
        return NextResponse.json({ error: 'Missing query search params' }, { status: 400 })
    };
    const key = searchParams.keys().next().value || '';
    const value = searchParams.get(key) || '';
    if (!key || !value) {
      return NextResponse.json({ error: 'Missing query search params' }, { status: 400 })
  };
    const user = await User.findOne({ [key]: value });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 520 });
    }
  }
}