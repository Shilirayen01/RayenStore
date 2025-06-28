// src/services/clientService.ts
import { supabase } from '../config/supabaseClient';
import { Client } from '../types'; // Import your custom Client type

export async function addClient(client: Client): Promise<void> {
  const { error } = await supabase.from('clients').insert([client]);
  if (error) {
    console.error('Error adding client:', error.message); // Log the error for debugging
    throw error;
  }
}