import { apiClient } from './apiClient';
import type { Product } from '@models/product';

export async function getProducts(): Promise<Product[]> {
  const response = await apiClient.get<Product[]>('/products?limit=12');
  return response.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
}
