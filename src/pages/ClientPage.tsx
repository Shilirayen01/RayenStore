// ✅ src/pages/ClientPage.tsx
import React, { useEffect, useState } from 'react';
import { Product, CartItem } from '../types';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoritesService';
import {
  getCart,
  addToCart as addToCartService,
  updateCartItem,
  removeFromCart as removeFromCartService
} from '../services/cartService';

// Import the ProductDetailModal component
import ProductDetailModal from '../components/ProductDetailModal';

// ✅ Props attendues depuis App.tsx
interface ClientPageProps {
  products: Product[];
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ClientPage: React.FC<ClientPageProps> = ({
  products,
  favorites,
  setFavorites,
  cartItems,
  setCartItems,
}) => {
  const [search, setSearch] = useState('');
  const [cartVisible, setCartVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // State to manage the selected product for the detail modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        try {
          const favs = await getFavorites(user.id);
          setFavorites(favs);
        } catch (err) {
          console.error('Erreur lors du chargement des favoris :', err);
        }
      }
    };

    const loadCart = async () => {
      if (user) {
        try {
          const items = await getCart(user.id);
          setCartItems(items);
        } catch (err) {
          console.error('Erreur lors du chargement du panier :', err);
        }
      }
    };

    loadFavorites();
    loadCart();
  }, [user]);

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = async (product: Product) => {
    if (!user) return;

    const existing = cartItems.find(item => item.product.id === product.id);
    const newQuantity = existing ? existing.quantity + 1 : 1;

    try {
      await addToCartService(user.id, product.id, newQuantity);
      setCartItems(prev =>
        existing
          ? prev.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: newQuantity }
                : item
            )
          : [...prev, { product, quantity: 1 }]
      );
      // Optional: Close the modal after adding to cart
      // setSelectedProduct(null);
    } catch (error) {
      console.error('Erreur ajout panier :', error);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!user) return;

    try {
      await removeFromCartService(user.id, productId);
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } catch (error) {
      console.error('Erreur suppression panier :', error);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!user || quantity < 1) return;

    try {
      await updateCartItem(user.id, productId, quantity);
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Erreur maj quantite :', error);
    }
  };

  const toggleFavorite = async (product: Product) => {
    if (!user) return;

    const isFav = favorites.some(p => p.id === product.id);

    try {
      if (isFav) {
        await removeFavorite(user.id, product.id);
        setFavorites(prev => prev.filter(p => p.id !== product.id));
      } else {
        await addFavorite(user.id, product.id);
        setFavorites(prev => [...prev, product]);
      }
    } catch (error) {
      console.error('Erreur favoris :', error);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Header
        cartItems={cartItems}
        onCartToggle={() => setCartVisible(!cartVisible)}
        searchTerm={search}
        onSearchChange={setSearch}
        favoritesCount={favorites.length}
      />

      <div className="container py-5">
        <h2 className="mb-4 text-center">Nos Produits</h2>

        {loading ? (
          <p className="text-center">Chargement des produits...</p>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <div className="row justify-content-center">
            {filtered.map(product => (
              <div className="col-md-6 col-lg-4 mb-4" key={product.id}>
                <div className="card h-100 shadow-sm border-0 rounded-lg overflow-hidden">
                  <div className="position-absolute top-0 end-0 p-3">
                    <i
                      className={`bi ${
                        favorites.some(p => p.id === product.id)
                          ? 'bi-heart-fill text-danger'
                          : 'bi-heart'
                      } fs-3`}
                      style={{ cursor: 'pointer' }}
                      // FIX: Wrap the async function call in an anonymous function
                      onClick={() => toggleFavorite(product)}
                    ></i>
                  </div>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: '220px', objectFit: 'cover' }}
                    // Clic sur l'image désactivé pour ouvrir la modal
                  />
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title text-truncate mb-1">{product.name}</h5>
                    <p className="card-text text-muted mb-2 small">{product.brand}</p>
                    <p className="card-text flex-grow-1 text-secondary" style={{ fontSize: '0.9rem' }}>{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="fw-bold fs-5 text-primary">{product.price.toFixed(2)} €</span>
                      <span className="text-warning">
                        {'★'.repeat(Math.round(product.rating))}{' '}
                        <small className="text-muted">
                          {product.rating.toFixed(1)}
                        </small>
                      </span>
                    </div>
                    {/* Bouton "Ajouter au panier" existant */}
                    <button
                      className="btn btn-primary w-100 mt-3 py-2 rounded-pill"
                      onClick={() => addToCart(product)}
                    >
                      <i className="bi bi-cart-plus me-2"></i> Ajouter au panier
                    </button>
                    {/* Nouveau bouton "Voir les détails" */}
                    <button
                      className="btn btn-outline-secondary w-100 mt-2 py-2 rounded-pill"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <i className="bi bi-info-circle me-2"></i> Voir les détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-muted text-center mt-4">
                Aucun produit ne correspond à votre recherche.
              </p>
            )}
          </div>
        )}

        {cartVisible && (
          <div className="cart-overlay position-fixed top-0 start-0 vw-100 vh-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
            <div
              className="cart bg-white rounded-lg p-4 shadow-lg"
              style={{ width: '450px', maxHeight: '80vh', overflowY: 'auto' }}
            >
              <h4 className="mb-4 border-bottom pb-2">Mon Panier</h4>
              {cartItems.length === 0 ? (
                <p className="text-center text-muted">Votre panier est vide.</p>
              ) : (
                <>
                  {cartItems.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="d-flex align-items-center mb-3 p-2 border rounded"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: 70,
                          height: 70,
                          objectFit: 'cover',
                          marginRight: 15,
                          borderRadius: '8px'
                        }}
                      />
                      <div className="flex-grow-1">
                        <h6>{product.name}</h6>
                        <div className="d-flex align-items-center">
                          <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) =>
                              updateQuantity(product.id, Number(e.target.value))
                            }
                            className="form-control form-control-sm me-2"
                            style={{ width: '60px' }}
                          />
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                      <div className="fw-bold ms-2 text-end">
                        {(product.price * quantity).toFixed(2)} €
                      </div>
                    </div>
                  ))}

                  <hr className="my-3" />
                  <div className="d-flex justify-content-between align-items-center fs-5 mb-3">
                    <strong>Total :</strong>
                    <strong>{totalPrice.toFixed(2)} €</strong>
                  </div>

                  <button
                    className="btn btn-success w-100 mt-2 py-2 rounded-pill"
                    onClick={() => {
                      navigate('/payment');
                      setCartVisible(false);
                    }}
                    
                  >
                    Valider mon panier
                  </button>
                </>
              )}

              <button
                className="btn btn-light w-100 mt-3 py-2 rounded-pill border"
                onClick={() => setCartVisible(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            addToCart={addToCart}
          />
        )}
      </div>

      <Footer />
    </>
  );
};

export default ClientPage;