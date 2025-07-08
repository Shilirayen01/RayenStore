import { supabase } from '../config/supabaseClient';
import { CartItem } from '../types';
import { v4 as uuidv4 } from 'uuid'; // pour générer un id unique

export const createOrder = async (
  userId: string,
  items: CartItem[],
  total: number,
  visible: boolean = true // ✅ valeur par défaut
) => {
  const { error } = await supabase.from('orders').insert([
    {
      id: uuidv4(),
      user_id: userId,
      items: items.map(({ product, quantity }) => ({
        product_id: product.id,
        name: product.name,
        quantity,
        price: product.price,
      })),
      total,
      status: 'en attente',
      visible_client: visible, // ✅ champ ajouté
    },
  ]);

  if (error) {
    throw new Error('Erreur enregistrement commande: ' + error.message);
  }
};
