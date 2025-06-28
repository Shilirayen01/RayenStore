import { supabase } from '../config/supabaseClient';
import { User } from '../types';

export async function addClient(user: User & { role?: string }): Promise<void> {
  const { error } = await supabase
    .from('clients')
    .insert([{ ...user, role: user.role ?? 'user' }]);

  if (error) {
    console.error('Error adding client:', error.message);
    throw error;
  }
}
export async function getClientByAuthId(auth_id: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('role')
    .eq('auth_id', auth_id)
    .single();

  if (error) {
    console.error("Failed to fetch client role:", error.message);
    return null;
  }

  return data?.role || 'user';
} 