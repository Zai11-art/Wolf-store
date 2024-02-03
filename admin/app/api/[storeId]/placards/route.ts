import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; placardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required.", { status: 403 });
    }

    const placards = await prismadb.placard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(placards);
  } catch (error) {
    console.log("[PLACARD_GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("ImageUrl is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store is required", { status: 400 });
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const placard = await prismadb.placard.create({
      data: {
        storeId: params.storeId,
        imageUrl: imageUrl,
        label: label,
      },
    });

    return NextResponse.json(placard);
  } catch (error) {
    return new NextResponse("Server Error", { status: 500 });
  }
}
