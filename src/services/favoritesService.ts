import { supabase } from '../config/supabaseClient';
import { Product, FavoriteWithProduct } from '../types';

export async function getFavorites(userId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('product_id, user_id, products (*)')
    .eq('user_id', userId)
    .returns<FavoriteWithProduct[]>();

  if (error) throw error;

  return data.map((fav) => fav.products); // ✅ fav.products existe bien maintenant
}

export async function addFavorite(userId: string, productId: number): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .insert([{ user_id: userId, product_id: productId }]);
  if (error) throw error;
}

export async function removeFavorite(userId: string, productId: number): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);
  if (error) throw error;
}
