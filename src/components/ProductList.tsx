// src/components/ProductList.tsx
import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (products.length === 0) {
    return <p className="text-center">Aucun produit disponible.</p>;
  }

  return (
    <div className="row">
      {products.map(product => (
        <div key={product.id} className="col-md-4 mb-4">
          <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/400x300";
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="text-muted">{product.price.toFixed(2)} €</p>
                <p><strong>Catégorie :</strong> {product.category}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
