import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types'; // ✅ adjust path if needed

interface ProductFormProps {
  product: Product | null;
  onSubmit: (product: Product | Omit<Product, 'id'>) => void;
  onCancel: () => void;
  categories: Category[];
  productss: Product[]; // ✅ Add this line

}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  categories,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [sizes, setSizes] = useState('');
  const [stock, setStock] = useState(0);

  // 🔁 Hydrate state on edit mode
  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price);
      setImage(product.image);
      setRating(product.rating || 0);
      setDescription(product.description || '');
      setBrand(product.brand || '');
      setStock(product.stock || 0);
      setSizes(Array.isArray(product.sizes) ? product.sizes.join(', ') : '');
    } else {
      setName('');
      setCategory(categories[0]?.name || '');
      setPrice(0);
      setImage('');
      setRating(0);
      setDescription('');
      setBrand('');
      setStock(0);
      setSizes('');
    }
  }, [product, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrUpdatedProduct: Omit<Product, 'id'> & { id?: number } = {
      name,
      category,
      price: parseFloat(price.toString()),
      image,
      rating: parseFloat(rating.toString()),
      description,
      brand,
      stock,
      sizes: sizes
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s !== ''),
    };

    if (product && product.id !== undefined) {
      newOrUpdatedProduct.id = product.id;
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
          <label htmlFor="name" className="form-label">
            Nom du Produit
          </label>
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
          <label htmlFor="category" className="form-label">
            Catégorie
          </label>
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Choisir une catégorie --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Prix (€)
          </label>
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
          <label htmlFor="image" className="form-label">
            URL de l'Image
          </label>
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
          <label htmlFor="rating" className="form-label">
            Note (0-5)
          </label>
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
          <label htmlFor="description" className="form-label">
            Description
          </label>
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
          <label htmlFor="brand" className="form-label">
            Marque
          </label>
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
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sizes" className="form-label">
            Tailles (séparées par des virgules)
          </label>
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
