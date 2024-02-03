import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse("Placard is required", { status: 403 });
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

    const patchStore = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId: userId,
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json(patchStore);
  } catch (error) {
    console.log("[STOREID_PATCH]", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 403 });
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

    const deletedStore = await prismadb.store.delete({
      where: {
        id: params.storeId,
        userId: userId,
      },
      include: {
        placards: true,
        categories: true,
        colors: true,
        sizes: true,
        products: true,
        orders: true,
      },
    });

    return NextResponse.json(deletedStore);
  } catch (error) {
    console.log("[STOREID_DELETE]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
