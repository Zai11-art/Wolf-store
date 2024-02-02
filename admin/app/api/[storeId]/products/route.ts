import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId)
      return new NextResponse("No store found.", { status: 404 });

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("CHECK HERE");
    console.log(products);

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

// export async function GET(
//   req: Request,
//   { params }: { params: { storeId: string; sizeId: string } }
// ) {
//   try {
//     const { searchParams } = new URL(req.url);
//     // const categoryId = searchParams.get("categoryId") || undefined;
//     // const colorId = searchParams.get("colorId") || undefined;
//     // const sizeId = searchParams.get("sizeId") || undefined;
//     const isFeatured = searchParams.get("isFeatured");

//     // if (!params.storeId) {
//     //   return new NextResponse("Store Id is required", { status: 400 });
//     // }

//     // const products = await prismadb.product.findMany({
//     //   where: {
//     //     storeId: params.storeId,
//     //     categoryId,
//     //     colorId,
//     //     sizeId,
//     //     isFeatured: isFeatured ? true : undefined,
//     //     isArchived: false,
//     //   },
//     //   include: {
//     //     images: true,
//     //     category: true,
//     //     color: true,
//     //     size: true,
//     //   },
//     //   orderBy: {
//     //     createdAt: "desc",
//     //   },
//     // });

//     const products = await prismadb.product.findMany({
//       where: {
//         isFeatured: isFeatured ? true : false,
//       },
//     });

//     console.log("CHECK HERE");
//     console.log(products);
//     // return NextResponse.json(products);
//   } catch (error) {
//     console.log("[PRODUCT_GET]", error);
//     return new NextResponse("Server Error", { status: 500 });
//   }
// }

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    const dataHere = {
      name,
      images,
      price,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    };

    console.log(dataHere);

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

    const product = await prismadb.product.create({
      data: {
        name,
        images: {
          createMany: {
            data: [...images.map((img: { url: string }) => img)],
          },
        },
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
