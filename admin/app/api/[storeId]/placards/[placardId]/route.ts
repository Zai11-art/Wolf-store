import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; placardId: string } }
) {
  try {
    if (!params.placardId) {
      return new NextResponse("Store Id is required", { status: 403 });
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    console.log(store);

    if (!store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const placard = await prismadb.placard.findUnique({
      where: {
        id: params.placardId,
      },
    });

    return NextResponse.json(placard);
  } catch (error) {
    console.log("[PLACARD_GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { placardId: string; storeId: string };
  }
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

    if (!params.placardId) {
      return new NextResponse("Placard is required", { status: 400 });
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

    const placard = await prismadb.placard.updateMany({
      where: {
        id: params.placardId,
      },
      data: {
        label: label,
        imageUrl: imageUrl,
      },
    });

    return NextResponse.json(placard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; placardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.placardId) {
      return new NextResponse("Placard is required", { status: 400 });
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

    const placard = await prismadb.placard.delete({
      where: {
        id: params.placardId,
      },
    });

    return NextResponse.json(placard);
  } catch (error) {
    console.log("[PLACARD_DELETE]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
