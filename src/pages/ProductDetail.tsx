import React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';

interface ProductDetailProps {
  products: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products }) => {
  const { id } = useParams();
  const product: Product | undefined = products.find(p => p.id.toString() === id);

  if (!product) {
    return <p className="text-center">Produit non trouvé.</p>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded mb-3"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x400";
            }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.brand}</p>
          <p>{product.description}</p>
          <p className="fw-bold fs-4">{product.price.toFixed(2)} €</p>
          {product.sizes && (
            <div className="mb-3">
              <strong>Tailles disponibles :</strong>
              <ul className="list-inline mt-2">
                {product.sizes.map(size => (
                  <li key={size} className="list-inline-item border p-2 rounded">{size}</li>
                ))}
              </ul>
            </div>
          )}
          <button className="btn btn-danger">Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
