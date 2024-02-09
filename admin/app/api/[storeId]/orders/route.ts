import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { status, orderId } = body;

    console.log("SOMETHING");
    console.log(status, orderId);

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!store) return new NextResponse("Store is required", { status: 401 });

    if (
      !orderId ||
      orderId.length === 0 ||
      orderId === undefined ||
      orderId === null
    )
      return new NextResponse("OrderId is required", { status: 401 });

    const order = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: status,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse("Server Error", { status: 500 });
  }
}
