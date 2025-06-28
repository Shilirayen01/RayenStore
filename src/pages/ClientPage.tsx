import React from 'react';
import { Product, CartItem } from '../types';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useNavigate } from 'react-router-dom';

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
  const [search, setSearch] = React.useState('');
  const [cartVisible, setCartVisible] = React.useState(false);

  const navigate = useNavigate();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

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

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // MAJ toggleFavorite : on manipule des Product complets, pas juste les IDs
  const toggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
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

      <div className="container py-4">
        <h2 className="mb-4">Nos Produits</h2>

        <div className="row">
          {filtered.map(product => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100 position-relative">
                <div className="position-absolute top-0 end-0 p-2">
                  <i
                    className={`bi ${
                      favorites.some(p => p.id === product.id)
                        ? 'bi-heart-fill text-danger'
                        : 'bi-heart'
                    } fs-4`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleFavorite(product)}
                  ></i>
                </div>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">{product.brand}</p>
                  <p className="card-text">{product.description}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{product.price} €</span>
                    <span className="text-warning">
                      {'★'.repeat(Math.round(product.rating))}{' '}
                      <small className="text-muted">{product.rating.toFixed(1)}</small>
                    </span>
                  </div>
                  <button
                    className="btn btn-outline-primary w-100 mt-3"
                    onClick={() => addToCart(product)}
                  >
                    <i className="bi bi-cart-plus me-2"></i> Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted">Aucun produit ne correspond à votre recherche.</p>
          )}
        </div>

        {cartVisible && (
          <div className="cart-overlay position-fixed top-0 start-0 vw-100 vh-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center">
            <div className="cart bg-white rounded p-4" style={{ width: '400px', maxHeight: '80vh', overflowY: 'auto' }}>
              <h4>Mon Panier</h4>
              {cartItems.length === 0 ? (
                <p>Votre panier est vide.</p>
              ) : (
                <>
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.id} className="d-flex align-items-center mb-3">
                      <img src={product.image} alt={product.name} style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 10 }} />
                      <div className="flex-grow-1">
                        <h6>{product.name}</h6>
                        <div className="d-flex align-items-center">
                          <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                            className="form-control form-control-sm me-2"
                            style={{ width: '70px' }}
                          />
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                      <div className="fw-bold ms-2">{(product.price * quantity).toFixed(2)} €</div>
                    </div>
                  ))}

                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>Total :</strong>
                    <strong>{totalPrice.toFixed(2)} €</strong>
                  </div>

                  <button className="btn btn-success w-100 mt-3" onClick={() => { navigate('/Checkout'); setCartVisible(false); }}>
                    Valider mon panier
                  </button>
                </>
              )}

              <button
                className="btn btn-secondary w-100 mt-3"
                onClick={() => setCartVisible(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ClientPage;
