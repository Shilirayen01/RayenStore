// Intégration complète dans Supabase pour les produits
// Nous allons maintenant créer un fichier `src/services/productService.ts` pour faire le lien

import { supabase } from '../config/supabaseClient';
import { Product } from '../types';

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data as Product[];
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const { data, error } = await supabase.from('products').insert([product]).select().single();
  if (error) throw error;
  return data as Product;
}

export async function updateProduct(product: Product): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', product.id)
    .select()
    .single();
  if (error) throw error;
  return data as Product;
}

export async function deleteProduct(id: number): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}
