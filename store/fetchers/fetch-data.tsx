import {
  Placard,
  Category,
  Color,
  Product,
  Size,
  ParamQueryProps,
} from "@/types";
import qs from "query-string";

const API_URL = `${process.env.API_URL}`;

// GET ALL PLACARDS
export const getPlacards = async (id: string): Promise<Placard[]> => {
  const response = await fetch(`${API_URL}/placards/${id}`);

  return response.json();
};

// GET ALL CATEGORIES
export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_URL}/categories`);

  return response.json();
};

// GET ONE CATEGORY
export const getCategory = async (id: string): Promise<Category> => {
  const response = await fetch(`${API_URL}/categories/${id}`);

  return response.json();
};

// GET ALL COLORS
export const getColors = async (): Promise<Color> => {
  const response = await fetch(`${API_URL}/colors`);

  return response.json();
};

// GET ONE PRODUCT
export const getProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);

  return response.json();
};

// GET ALL PRODUCTS
export const getProducts = async (obj: ParamQueryProps): Promise<Product[]> => {
  console.log("received object here below ");
  console.log(obj);

  const urlQuery = qs.stringifyUrl({
    url: `${API_URL}/products`,
    query: {
      colorId: obj.colorId,
      sizeId: obj.sizeId,
      categoryId: obj.categoryId,
      isFeatured: obj.isFeatured,
    },
  });
  console.log("stringified here below");
  console.log(urlQuery);

  const response = await fetch(urlQuery);

  return response.json();
};

// GET ALL SIZES
export const getSizes = async (): Promise<Size[]> => {
  const response = await fetch(`${API_URL}/sizes`);

  return response.json();
};
