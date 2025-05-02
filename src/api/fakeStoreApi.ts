import { Product } from '../types';

const BASE_URL = 'https://fakestoreapi.com';

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const fetchProductById = async (id: string | number): Promise<Product> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
     if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product = await response.json();
     if (!data || !data.id) {
        throw new Error(`Product with id ${id} not found.`);
     }
    return data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};