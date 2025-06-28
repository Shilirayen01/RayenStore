// src/types/index.ts

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  brand: string;
  sizes?: string[]; // Les tailles sont optionnelles
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

// Renamed and adjusted to match your Supabase 'clients' table structure
export interface Client {
  id: string;
  name: string;
  firstName: string;
  dob: number | null; // Assuming 'dob' is int4 and nullable. Adjust if it's 'Date' or 'string' for a different format.
  receiveNewsletter: boolean;
  civility: string;
}

export interface User {
  auth_id: string;
  email: string;
}
export interface FavoriteWithProduct {
  product_id: number;
  user_id: string;
  products: Product;
}


// NEW: Order interface, moved here as planned
export interface Order {
  id: number; // Assuming number for order ID, adjust to string if using UUIDs
  customerName: string;
  date: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  totalAmount: number;
  // Add other order properties as needed
}