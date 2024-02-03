import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Store Id is required", { status: 403 });
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        placard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, placardId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 403 });
    }

    if (!placardId) {
      return new NextResponse("Placard Id is required", { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 403 });
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

    const patchedStore = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
      data: {
        name: name,
        placardId: placardId,
      },
    });

    return NextResponse.json(patchedStore);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 403 });
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

    const deletedStore = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(deletedStore);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
