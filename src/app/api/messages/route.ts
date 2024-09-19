// export const config = {
//   runtime: 'edge'
// }

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messageParams = {
        phone: body.phone,
        message: body.message,
        key: process.env.TEXTBELT_API_KEY,
      }
    const result = await axios.post('https://textbelt.com/text', messageParams);
    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 520 });
    }
  }
}
