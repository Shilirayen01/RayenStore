import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages & Components
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

// Admin components
import AdminLayout from './components/Administartion/AdminLayout';
import DashboardOverview from './components/Administartion/DashboardOverview';
import InventoryPage from './components/Administartion/InventoryPage';
import OrdersPage from './components/Administartion/OrdersPage';
import CustomersPage from './components/Administartion/CustomersPage';

// Supabase services
import {
  fetchProducts,
  addProduct as addProductToSupabase,
  updateProduct as updateProductInSupabase,
} from './services/productService';
import { supabase } from './config/supabaseClient';

// Auth
import { AuthProvider, useAuth } from './AuthContext';
import { getClientByAuthId } from './config/clientService';

// Types
import { Product, Category, CartItem, Client, Order } from './types/index';
import { clients as initialClientsData } from './data/clients';

const initialOrdersData: Order[] = [
  { id: 1, customerName: 'Alice Dupont', date: '2024-06-20', status: 'Completed', totalAmount: 185.5 },
  { id: 2, customerName: 'Bob Martin', date: '2024-06-19', status: 'Pending', totalAmount: 75.0 },
  { id: 3, customerName: 'Charlie Leblanc', date: '2024-06-18', status: 'Cancelled', totalAmount: 220.75 },
  { id: 4, customerName: 'Diana Roussou', date: '2024-06-17', status: 'Completed', totalAmount: 45.99 },
  { id: 5, customerName: 'Eve Richard', date: '2024-06-16', status: 'Pending', totalAmount: 310.0 },
];

export interface AdminOutletContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product | undefined>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  categories: Category[];
  clients: Client[];
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
  const [clients, setClients] = useState<Client[]>(initialClientsData);

  const [categories] = useState<Category[]>([
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
        console.error('Erreur chargement produits:', error);
      }
    };
    loadProducts();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const newProduct = await addProductToSupabase(product);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (error) {
      console.error('Erreur ajout produit:', error);
      return undefined;
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      await updateProductInSupabase(product);
      setProducts(prev => prev.map(p => (p.id === product.id ? product : p)));
    } catch (error) {
      console.error('Erreur mise à jour:', error);
    }
  };

  const deleteProduct = async (id: number): Promise<void> => {
    try {
      const { error: cartError } = await supabase.from('cart').delete().eq('product_id', id);
      if (cartError) throw cartError;

      const { error: favError } = await supabase.from('favorites').delete().eq('product_id', id);
      if (favError) throw favError;

      const { error: productError } = await supabase.from('products').delete().eq('id', id);
      if (productError) throw productError;

      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Erreur suppression:', error);
    }
  };

  const totalOrdersCount = orders.length;
  const totalInventoryCount = products.reduce((sum, product) => sum + (product.stock || 0), 0);
  const totalCustomersCount = clients.length;
  const totalRevenueAmount = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  const adminOutletContextValue: AdminOutletContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    clients,
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
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout context={adminOutletContextValue} />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
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
