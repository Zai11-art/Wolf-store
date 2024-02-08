import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json()


    


  } catch (error) {
    console.error("[AUTH_POST]", error);
    return new NextResponse("Servr Error", { status: 500 });
  }
}
