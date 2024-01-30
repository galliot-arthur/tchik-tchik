import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(JSON.stringify({}), {
    headers: { "Content-Type": "application/json", status: "200" },
  });
}

export async function POST(req: NextRequest) {
  return new NextResponse(JSON.stringify({}), {
    headers: { "Content-Type": "application/json", status: "200" },
  });
}
