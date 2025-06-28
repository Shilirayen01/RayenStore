// src/services/clientService.ts
import { supabase } from '../config/supabaseClient';
import { User } from '../types';

export async function addClient(client: User): Promise<void> {
  const { error } = await supabase.from('clients').insert([client]);
  if (error) throw error;
}
