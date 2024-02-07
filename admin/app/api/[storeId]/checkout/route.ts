import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const headersConfig = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: headersConfig });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { products } = await req.json();

  if (!products || products.length === 0) {
    return new NextResponse("Product Ids are required", { status: 400 });
  }

  const productsArr = await Promise.all(
    products.map(
      async (product: { product: string; size: string; quantity: number }) => {
        const res = await prismadb?.product.findFirst({
          where: {
            id: product.product,
          },
        });

        const updateQuantity = await prismadb.product.update({
          where: {
            id: product.product,
          },
          data: {
            // @ts-ignore
            stocks: res?.stocks - product.quantity,
          },
        });

        console.log("UPDATED QUANTITY HERE");
        console.log(updateQuantity);

        return { product: res, size: product.size, quantity: product.quantity };
      }
    )
  );

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  productsArr.forEach((product) => {
    line_items.push({
      quantity: product.quantity,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.product.name,
        },
        unit_amount: product.product.price.toNumber() * 100,
      },
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderitems: {
        create: products.map((product: any) => ({
          product: {
            connect: {
              id: product.product,
            },
          },
          quantity: product.quantity,
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_URL}/carts`,
    cancel_url: `${process.env.FRONTEND_URL}/carts`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json({ url: session.url }, { headers: headersConfig });
}

// export async function POST(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   const { productIds } = await req.json();

//   if (!productIds || productIds.length === 0) {
//     return new NextResponse("Product Ids are required", { status: 400 });
//   }

//   const products = await prismadb?.product.findMany({
//     where: {
//       id: {
//         in: productIds,
//       },
//     },
//   });

//   const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

//   products.forEach((product) => {
//     line_items.push({
//       quantity: 1,
//       price_data: {
//         currency: "USD",
//         product_data: {
//           name: product.name,
//         },
//         unit_amount: product.price.toNumber() * 100,
//       },
//     });
//   });

//   const order = await prismadb.order.create({
//     data: {
//       storeId: params.storeId,
//       isPaid: false,
//       orderitems: {
//         create: productIds.map((productId: string) => ({
//           product: {
//             connect: {
//               id: productId,
//             },
//           },
//         })),
//       },
//     },
//   });

//   const session = await stripe.checkout.sessions.create({
//     line_items,
//     mode: "payment",
//     billing_address_collection: "required",
//     phone_number_collection: {
//       enabled: true,
//     },
//     success_url: `${process.env.FRONTEND_URL}/cart?success=1`,
//     cancel_url: `${process.env.FRONTEND_URL}/cart?cancelled=1`,
//     metadata: {
//       orderId: order.id,
//     },
//   });

// return NextResponse.json({ url: session.url }, { headers: headersConfig });
// }
