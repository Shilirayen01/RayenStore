// src/components/Header/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../types';
import SearchBar from './SearchBar';
import CartButton from './CartButton';
import FavoritesButton from './FavoritesButton';

interface HeaderProps {
  cartItems: CartItem[];
  onCartToggle: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  favoritesCount: number;
}

const Header: React.FC<HeaderProps> = ({
  cartItems,
  onCartToggle,
  searchTerm,
  onSearchChange,
  favoritesCount,
}) => {
  return (
    <header className="shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <h1 className="navbar-brand fw-bold mb-0 d-flex align-items-center">
              <i className="bi bi-shop me-2 fs-2"></i>
              <span className="fs-3">RayenStore</span>
            </h1>
            <small className="text-white-50 ms-1" style={{ fontSize: '0.85rem' }}>
              Votre passion, notre mission.
            </small>
          </div>

          <div className="flex-grow-1 mx-4">
            <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link to="/aide" className="btn btn-outline-light btn-sm">
              Aide
            </Link>

            <FavoritesButton count={favoritesCount} />

            <CartButton cartItems={cartItems} onClick={onCartToggle} />
            <li className="nav-item">
            <Link to="/mes-commandes" className="btn btn-outline-light btn-sm">
            <i className="bi bi-box-seam me-1"></i> Mes commandes
            </Link>

</li>


            <Link to="/login" className="btn btn-light btn-sm">
              <i className="bi bi-box-arrow-in-right me-1"></i>Se Connecter
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
