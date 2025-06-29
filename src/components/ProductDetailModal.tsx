// ✅ src/components/ProductDetailModal.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  addToCart: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, addToCart }) => {
  if (!product) {
    return null;
  }

  // Utilise un état local pour l'image actuellement affichée
  // Initialise avec l'image principale du produit
  const [currentImage, setCurrentImage] = useState(product.image);

  // Met à jour l'image actuelle si le produit change (par exemple, si vous rouvrez la modal pour un autre produit)
  useEffect(() => {
    setCurrentImage(product.image);
  }, [product]);

  // Utilise le tableau 'images' du produit, sinon juste l'image principale
  const galleryImages = product.Images && product.Images.length > 0
    ? product.Images
    : [product.image]; // Si pas d'autres images, la galerie ne contient que l'image principale

  return (
    <div
      className="modal-full-screen d-flex justify-content-center align-items-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 1060,
        overflowY: 'auto',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="modal-content-wrapper bg-white rounded-xl shadow-lg p-5"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '1200px',
          maxHeight: '95vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* En-tête : Nom du produit et bouton de fermeture */}
        <div className="modal-header border-bottom-0 pb-3 d-flex justify-content-between align-items-start">
          <h2 className="modal-title display-6 fw-bold text-dark">{product.name}</h2>
          <button type="button" className="btn-close fs-4" onClick={onClose} aria-label="Close"></button>
        </div>

        {/* Corps de la modal : Image et détails */}
        <div className="modal-body flex-grow-1 p-0">
          <div className="row g-5 h-100">
            {/* Section Images du Produit */}
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
              {/* Image principale affichée */}
              <img
                src={currentImage}
                alt={product.name}
                className="img-fluid rounded-lg shadow-sm mb-4"
                style={{ maxHeight: '500px', objectFit: 'contain', width: '100%' }}
              />

              {/* Galerie de miniatures si plus d'une image est disponible */}
              {galleryImages.length > 1 && (
                <div className="d-flex justify-content-center flex-wrap">
                  {galleryImages.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className={`img-thumbnail me-2 mb-2 ${imgSrc === currentImage ? 'border border-primary' : 'border border-light'}`}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        borderRadius: '0.5rem',
                        transition: 'border 0.2s ease-in-out'
                      }}
                      onClick={() => setCurrentImage(imgSrc)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Section Détails du Produit */}
            <div className="col-md-6 d-flex flex-column justify-content-between">
              <div>
                <p className="text-muted fs-5 mb-2">{product.brand}</p>
                <p className="text-dark fs-5 mb-4 lh-lg">{product.description}</p>

                <div className="d-flex align-items-center mb-4">
                  <span className="fw-bold fs-1 text-primary me-5">{product.price.toFixed(2)} €</span>
                  <span className="text-warning fs-3">
                    {'★'.repeat(Math.round(product.rating))}
                    <small className="text-muted ms-2 fs-5">
                      ({product.rating.toFixed(1)} / 5)
                    </small>
                  </span>
                </div>
              </div>

              {/* Bouton Ajouter au Panier */}
              <button
                className="btn btn-primary w-100 py-3 rounded-pill fs-4 mt-auto"
                onClick={() => {
                  addToCart(product);
                  // onClose(); // Décidez si vous voulez fermer la modal après l'ajout au panier
                }}
              >
                <i className="bi bi-cart-plus me-2"></i> Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;