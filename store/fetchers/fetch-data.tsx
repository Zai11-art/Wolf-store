import {
  Placard,
  Category,
  Color,
  Product,
  Size,
  ParamQueryProps,
} from "@/types";
import axios from "axios";
import qs from "query-string";

// GET ALL PLACARDS
export const getPlacards = async (id: string): Promise<Placard[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/placards/${id}`
  );

  return response.json();
};

// GET PLACARD
export const getPlacard = async (placardId: string): Promise<Placard> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/placards/${placardId}`
  );

  return response.json();
};

// GET ALL CATEGORIES
export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

  return response.json();
};

// GET ONE CATEGORY
export const getCategory = async (id: string): Promise<Category> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
  );

  return response.json();
};

// GET ALL COLORS
export const getColors = async (): Promise<Color[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/colors`);

  return response.json();
};

// GET ONE PRODUCT
export const getProduct = async (id: string): Promise<Product> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
  );

  return response.json();
};

export const getProducts2 = async (): Promise<Product[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  return response.json();
};

// GET ALL PRODUCTS
export const getProducts = async (obj: ParamQueryProps): Promise<Product[]> => {
  const urlQuery = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_URL}/products`,
    query: {
      colorId: obj.colorId,
      sizeId: obj.sizeId,
      categoryId: obj.categoryId,
      isFeatured: obj.isFeatured,
    },
  });

  console.log("URL QUERY HERE");
  console.log(urlQuery);
  console.log(process.env.NEXT_PUBLIC_API_URL);

  const response = await fetch(urlQuery);

  return response.json();
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/featuredProducts`
  );

  return response.json();
};

// GET ALL SIZES
export const getSizes = async (): Promise<Size[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sizes`);

  return response.data;
};

// GET ALL PRODUCTS
export const getAllProducts = async (): Promise<Size[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );

  return response.data;
};
