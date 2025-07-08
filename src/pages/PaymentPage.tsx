import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { createOrder } from '../services/orderService';
import { CartItem } from '../types';

interface PaymentPageProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ cartItems, setCartItems }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Vous devez être connecté pour effectuer un paiement.");
      return;
    }

    try {
      await createOrder(user.id, cartItems, totalPrice); // 👈 pas besoin de changer ici
      setCartItems([]); // vider le panier

      alert('✅ Paiement effectué avec succès !');
      setTimeout(() => {
        alert('📦 Votre commande sera livrée sous 48h.');
        navigate('/');
      }, 500);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Page de Paiement</h2>
      <form onSubmit={handlePayment} className="mx-auto" style={{ maxWidth: 500 }}>
        {/* Champs paiement (comme avant) */}
        {/* ... */}

        <button type="submit" className="btn btn-primary w-100 rounded-pill py-2">
          Payer maintenant ({totalPrice.toFixed(2)} €)
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
