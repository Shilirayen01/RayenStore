// src/components/ProductForm.tsx
import React, { useState } from 'react';
import { Product, Category } from '../types'; // Assurez-vous que le chemin est correct pour votre types.ts

interface ProductFormProps {
  product: Product | null;
  onSubmit: (product: Product | Omit<Product, 'id'>) => void;
  onCancel: () => void;
  categories: Category[]; // Pour la liste déroulante des catégories
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel, categories }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [category, setCategory] = useState(product ? product.category : categories[0]?.id || '');
  const [price, setPrice] = useState(product ? product.price : 0);
  const [image, setImage] = useState(product ? product.image : '');
  const [rating, setRating] = useState(product ? product.rating : 0);
  const [description, setDescription] = useState(product ? product.description : '');
  const [brand, setBrand] = useState(product ? product.brand : '');
  const [sizes, setSizes] = useState(product?.sizes ? product.sizes.join(', ') : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrUpdatedProduct: Omit<Product, 'id'> & { id?: number } = {
      name,
      category,
      price: parseFloat(price.toString()), // Assurer que le prix est un nombre
      image,
      rating: parseFloat(rating.toString()), // Assurer que le rating est un nombre
      description,
      brand,
      sizes: sizes.split(',').map(s => s.trim()).filter(s => s !== ''),
    };

    if (product && product.id !== undefined) {
      newOrUpdatedProduct.id = product.id; // Garder l'ID pour la mise à jour
    }

    onSubmit(newOrUpdatedProduct as Product | Omit<Product, 'id'>);
  };

  return (
    <div className="card bg-light p-4 mb-4 border">
      <h5 className="card-title mb-3">
        {product ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nom du Produit</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Catégorie</label>
         <select
  className="form-select"
  id="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)} // ← string
>
  <option value="">-- Choisir une catégorie --</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.name}> {/* ← name est une string */}
      {cat.name}
    </option>
  ))}
</select>




        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Prix (€)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">URL de l'Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Ex: https://placehold.co/400x300"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Note (0-5)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className="form-control"
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Marque</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sizes" className="form-label">Tailles (séparées par des virgules)</label>
          <input
            type="text"
            className="form-control"
            id="sizes"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            placeholder="Ex: S, M, L, XL ou 38, 39, 40"
          />
        </div>
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
            Annuler
          </button>
          <button type="submit" className="btn btn-primary">
            {product ? 'Modifier' : 'Ajouter'} le Produit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;