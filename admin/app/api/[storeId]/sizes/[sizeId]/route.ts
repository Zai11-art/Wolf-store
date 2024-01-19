import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size Id is required", { status: 403 });
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

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZEID_GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { sizeId: string; storeId: string };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 403 });
    }

    if (!value) {
      return new NextResponse("Size Value is required", { status: 403 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size Id is required", { status: 403 });
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

    const patchedSize = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name: name,
        value: value,
      },
    });

    return NextResponse.json(patchedSize);
  } catch (error) {
    console.log("[SIZEID_PATCH]", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 403 });
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

    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZEID_DELETE]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
