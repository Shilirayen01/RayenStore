// src/services/clientService.ts
import { supabase } from '../config/supabaseClient';
import { User } from '../types';

export async function addClient(user: User): Promise<void> {
  const { error } = await supabase.from('clients').insert([user]);
  if (error) {
    console.error('Error adding client:', error.message); 
    throw error;
  }
}