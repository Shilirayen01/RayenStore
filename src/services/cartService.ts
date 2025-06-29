import { supabase } from '../config/supabaseClient';
import { Product, CartItem } from '../types';

interface CartItemWithProduct {
  product_id: number;
  quantity: number;
  products: Product; // <- Correction ici
}

export async function getCart(userId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from('cart')
    .select('product_id, quantity, products(*)')
    .eq('user_id', userId);

  if (error) throw error;

  return (data as unknown as CartItemWithProduct[]).map(item => ({
    product: item.products,
    quantity: item.quantity
  }));
}

export async function addToCart(userId: string, productId: number, quantity: number) {
  const { error } = await supabase
    .from('cart')
    .upsert([{ user_id: userId, product_id: productId, quantity }], { onConflict: 'user_id,product_id' });
  if (error) throw error;
}

export async function updateCartItem(userId: string, productId: number, quantity: number) {
  const { error } = await supabase
    .from('cart')
    .update({ quantity })
    .eq('user_id', userId)
    .eq('product_id', productId);
  if (error) throw error;
}

export async function removeFromCart(userId: string, productId: number) {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);
  if (error) throw error;
}
