// src/services/clientService.ts
import { supabase } from '../config/supabaseClient';

interface MinimalUser {
  auth_id: string;
  email: string;
}

export async function addClient(user: MinimalUser): Promise<void> {
  const { error } = await supabase.from('clients').insert([
    {
      id: user.auth_id,    
      auth_id: user.auth_id,
      email: user.email,
    },
  ]);

  if (error) {
    console.error('Erreur ajout client:', error.message);
    throw new Error('Erreur ajout client: ' + error.message);
  }
}
