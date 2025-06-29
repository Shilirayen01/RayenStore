// src/pages/FavorisPage.tsx
import React, { useEffect, useState } from 'react';
import { Product, CartItem } from '../types';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getFavorites, removeFavorite } from '../services/favoritesService';

interface FavorisPageProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
}

const FavorisPage: React.FC<FavorisPageProps> = ({
  favorites,
  setFavorites,
  cartItems,
  setCartItems,
}) => {
  const navigate = useNavigate();
  const [showCartModal, setShowCartModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const favs = await getFavorites(user.id);
          setFavorites(favs);
        } catch (err) {
          console.error('Erreur lors du chargement des favoris :', err);
        }
      }
    };
    fetchFavorites();
  }, [user, setFavorites]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFavorite = async (productId: number) => {
    if (!user) return;
    try {
      await removeFavorite(user.id, productId);
      setFavorites(prev => prev.filter(product => product.id !== productId));
    } catch (err) {
      console.error('Erreur lors de la suppression du favori :', err);
    }
  };

  const onCartToggle = () => {
    setShowCartModal(prev => !prev);
  };

  return (
    <>
      <Header
        cartItems={cartItems}
        onCartToggle={onCartToggle}
        searchTerm=""
        onSearchChange={() => {}}
        favoritesCount={favorites.length}
      />

      <div
        className={`modal fade ${showCartModal ? 'show d-block' : ''}`}
        tabIndex={-1}
        role="dialog"
        aria-hidden={!showCartModal}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Panier</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onCartToggle}></button>
            </div>
            <div className="modal-body">
              {cartItems.length === 0 ? (
                <p>Votre panier est vide.</p>
              ) : (
                <ul className="list-group">
                  {cartItems.map(item => (
                    <li key={item.product.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {item.product.name}
                      <span className="badge bg-primary rounded-pill">{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCartToggle}>Fermer</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <h2>Mes Produits Favoris</h2>
        {favorites.length === 0 ? (
          <p className="text-muted">Aucun produit en favori pour le moment.</p>
        ) : (
          <div className="row">
            {favorites.map(product => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="fw-bold">{product.price} €</p>
                    <button
                      className="btn btn-outline-primary mt-auto mb-2"
                      onClick={() => addToCart(product)}
                    >
                      <i className="bi bi-cart-plus me-2"></i> Ajouter au panier
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleRemoveFavorite(product.id)}
                    >
                      <i className="bi bi-trash me-2"></i> Supprimer des favoris
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default FavorisPage;
