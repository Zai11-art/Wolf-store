import React from "react";
import { getProduct, getProducts, getSizes } from "@/fetchers/fetch-data";
import { Container, Box, useMediaQuery } from "@mui/material";
import Catalogue from "@/components/catalouge";
import ImageSLider from "@/components/gallery";
import ProductInfo from "@/components/product-info";
import ProductViewer from "./components/product-viewer";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  if (!product) {
    return null;
  }

  return (
    <Container>
      <ProductViewer product={product} />
      <Catalogue products={suggestedProducts} title="Similar Products" />
    </Container>
  );
};

export default ProductPage;
