// src/config/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Change process.env.REACT_APP_... to import.meta.env.VITE_...
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Optional: Add a check to ensure variables are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Please check your .env file.");
  // You might want to throw an error or handle this more gracefully
  // For example, throw new Error("Supabase credentials are not configured.");
}

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);