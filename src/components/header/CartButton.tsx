// src/components/Header/CartButton.tsx
import React from 'react';
import { CartItem } from '../../types';

interface Props {
  cartItems: CartItem[];
  onClick: () => void;
}

const CartButton: React.FC<Props> = ({ cartItems, onClick }) => {
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button className="btn btn-outline-light position-relative" onClick={onClick} aria-label="Panier">
      <i className="bi bi-cart3"></i>
      {itemCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;
