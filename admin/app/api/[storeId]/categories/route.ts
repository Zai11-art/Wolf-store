import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required.", { status: 403 });
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
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
    const { name, placardId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Category Name is required", { status: 401 });
    }

    if (!placardId) {
      return new NextResponse("Placard Id is required", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 401 });
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!store) {
      return new NextResponse("Store is required", { status: 400 });
    }

    const postedCategories = await prismadb.category.create({
      data: {
        name: name,
        placardId: placardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(postedCategories);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
