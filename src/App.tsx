// src/App.tsx
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Removed useOutletContext as it's used by children

// Tes composants existants
import ClientPage from './pages/ClientPage';
import Contact from './components/Contact';
import LoginPage from './pages/LoginPage';
import ProductDetail from './pages/ProductDetail';
import HelpPage from './pages/HelpPage';
import SignupPage from './pages/SignupPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductList from './components/ProductList';
import FavorisPage from './pages/FavorisPage';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/about';

// Tes imports Supabase pour les produits
import { fetchProducts, addProduct as addProductToSupabase, updateProduct as updateProductInSupabase, deleteProduct as deleteProductFromSupabase } from './services/productService';

// Ton contexte d'authentification
import { AuthProvider, useAuth } from './AuthContext';

// Les nouveaux composants du panneau d'administration AVEC LE CHEMIN CORRIGÉ
import AdminLayout from './components/Administartion/AdminLayout';
import DashboardOverview from './components/Administartion/DashboardOverview';
import InventoryPage from './components/Administartion/InventoryPage';
import OrdersPage from './components/Administartion/OrdersPage';
import CustomersPage from './components/Administartion/CustomersPage';

// Importe les données clients (NOTE: Assure-toi que les données dans ce fichier sont de type Client[])
// Tu auras besoin d'un fichier src/data/clients.ts ou .json qui exporte un tableau de 'Client'.
// Par exemple: export const clients: Client[] = [{ id: 'some-uuid', name: 'John', ... }];
import { clients as initialClientsData } from './data/clients';

// IMPORTE TOUS TES TYPES DEPUIS TON FICHIER types/index.ts
// Assure-toi que toutes ces interfaces sont bien exportées depuis src/types/index.ts
import { Product, Category, CartItem, Client, Order } from './types/index'; // Chemin corrigé pour src/types/index.ts et import de Order
import { getClientByAuthId } from './config/clientService';

// Données de commandes de démonstration (à remplacer par tes vraies données si tu as un service de commandes)
const initialOrdersData: Order[] = [
  { id: 1, customerName: 'Alice Dupont', date: '2024-06-20', status: 'Completed', totalAmount: 185.50 },
  { id: 2, customerName: 'Bob Martin', date: '2024-06-19', status: 'Pending', totalAmount: 75.00 },
  { id: 3, customerName: 'Charlie Leblanc', date: '2024-06-18', status: 'Cancelled', totalAmount: 220.75 },
  { id: 4, customerName: 'Diana Roussou', date: '2024-06-17', status: 'Completed', totalAmount: 45.99 },
  { id: 5, customerName: 'Eve Richard', date: '2024-06-16', status: 'Pending', totalAmount: 310.00 },
];

// Définit l'interface du contexte qui sera passé via Outlet
export interface AdminOutletContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product | undefined>; // Updated to reflect async nature and return type
  updateProduct: (product: Product) => Promise<void>; // Updated to reflect async nature
  deleteProduct: (id: number) => Promise<void>; // Updated to reflect async nature
  categories: Category[];
  clients: Client[]; // FIX: Changed from User[] to Client[]
  orders: Order[];
  totalOrders: number;
  totalInventory: number;
  totalCustomers: number;
  totalRevenue: number;
}


function AppContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrdersData);
  const [clients, setClients] = useState<Client[]>(initialClientsData); // FIX: Changed from User[] to Client[]

  const [categories, setCategories] = useState<Category[]>([
    { id: 'crampons', name: 'Crampons', icon: 'bi-award' },
    { id: 'tenues', name: 'Tenues', icon: 'bi-person' },
    { id: 'ballons', name: 'Ballons', icon: 'bi-circle' },
  ]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetched = await fetchProducts();
        setProducts(fetched);
      } catch (error) {
        console.error("Erreur chargement produits:", error);
      }
    };
    loadProducts();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const newProduct = await addProductToSupabase(product);
      setProducts(prev => [...prev, newProduct]);
      return newProduct; // Return the new product
    } catch (error) {
      console.error("Erreur ajout produit:", error);
      return undefined;
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      await updateProductInSupabase(product);
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    } catch (error) {
      console.error("Erreur mise à jour:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await deleteProductFromSupabase(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  // Calcul des statistiques pour le Dashboard Overview
  const totalOrdersCount = orders.length;
  const totalInventoryCount = products.reduce((sum, product) => sum + (product.stock || 0), 0);
  const totalCustomersCount = clients.length;
  const totalRevenueAmount = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Valeurs du contexte de l'Outlet pour les pages du dashboard
  const adminOutletContextValue: AdminOutletContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    clients, // Now of type Client[]
    orders,
    totalOrders: totalOrdersCount,
    totalInventory: totalInventoryCount,
    totalCustomers: totalCustomersCount,
    totalRevenue: totalRevenueAmount,
  };


  return (
    <Routes>
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/"
        element={
          <ClientPage
            products={products}
            favorites={favorites}
            setFavorites={setFavorites}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        }
      />
      <Route path="/productList" element={<ProductList products={products} />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/aide" element={<HelpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/product/:id" element={<ProductDetail products={products} />} />
      <Route
        path="/favoris"
        element={
          <FavorisPage
            favorites={favorites}
            setFavorites={setFavorites}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        }
      />
      {/* Route parente pour le panneau d'administration */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            {/* AdminLayout reçoit les fonctions et données via son Outlet context */}
            {/* IMPORTANT: AdminLayout.tsx must render <Outlet context={props.context} /> */}
            <AdminLayout context={adminOutletContextValue} />
          </PrivateRoute>
        }
      >
        {/* Les routes enfants du dashboard, elles utiliseront useOutletContext pour accéder aux données */}
        <Route index element={<DashboardOverview />} /> {/* Route par défaut pour /admin */}
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="customers" element={<CustomersPage />} />
      </Route>
    </Routes>
  );
}

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (user?.id) {
        const userRole = await getClientByAuthId(user.id);
        setRole(userRole);
      }
      setCheckingRole(false);
    };

    fetchRole();
  }, [user]);

  if (loading || checkingRole) return <p>Chargement...</p>;

  return user && role === 'admin' ? children : <Navigate to="/login" replace />;
};


function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;