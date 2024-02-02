import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Size Id is required", { status: 403 });
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        size: true,
        color: true,
        category: true,
        images: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTID_GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { productId: string; storeId: string };
  }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
      name,
      images,
      price,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is ", { status: 401 });
    }
    if (!images || images.length === 0) {
      return new NextResponse("Images are required", { status: 403 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 403 });
    }
    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 403 });
    }
    if (!colorId) {
      return new NextResponse("Color ID is required", { status: 403 });
    }
    if (!sizeId) {
      return new NextResponse("Size ID is required", { status: 403 });
    }
    if (!isFeatured) {
      return new NextResponse("Feature Selection is required", { status: 403 });
    }
    if (!isArchived) {
      return new NextResponse("Archived Selection is required", {
        status: 403,
      });
    }
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
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

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        images: { deleteMany: {} },
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
      },
    });

    const patchedProducts = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((img: { url: string }) => img)],
          },
        },
      },
    });

    return NextResponse.json(patchedProducts);
  } catch (error) {
    console.log("[PRODUCTID_PATCH]", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.productId) {
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

    const products = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTID_DELETE]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
