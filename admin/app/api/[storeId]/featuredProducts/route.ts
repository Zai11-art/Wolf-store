import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {

    const featuredProducts = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        isFeatured: true,
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

    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.log("[FEATURED_PRODUCTS_GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
