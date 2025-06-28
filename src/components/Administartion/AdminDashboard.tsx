// src/components/Administration/AdminDashboard.tsx
import React, { useState } from 'react';
import { Product, Category, User } from '../../types';
import { clients } from '../../data/clients';
import ProductForm from '../ProductForm';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminDashboardProps {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  categories: Category[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  categories,
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setProductIdToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (productIdToDelete !== null) {
      deleteProduct(productIdToDelete);
    }
    setShowConfirmModal(false);
    setProductIdToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setProductIdToDelete(null);
  };

  const handleFormSubmit = (product: Product | Omit<Product, 'id'>) => {
    if ('id' in product && product.id !== undefined) {
      updateProduct(product as Product);
    } else {
      addProduct(product as Omit<Product, 'id'>);
    }
    setEditingProduct(null);
    setShowProductForm(false);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setShowProductForm(false);
  };

  const filteredProducts = filteredCategory
    ? products.filter(p => p.category.toLowerCase() === filteredCategory.toLowerCase())
    : products;

  return (
    <div className="d-flex">
      <AdminSidebar onFilterCategory={setFilteredCategory} />

      <div className="container py-5" style={{ marginLeft: '250px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-primary">
            <i className="bi bi-person-gear me-2"></i>Tableau de Bord Administrateur
          </h1>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Déconnexion
          </button>
        </div>

        {/* GESTION DES PRODUITS */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="card-title mb-3">
              <i className="bi bi-box-seam me-2"></i>Gestion des Produits
            </h4>
            <button
              className="btn btn-primary mb-3"
              onClick={() => {
                setEditingProduct(null);
                setShowProductForm(true);
              }}
            >
              <i className="bi bi-plus-circle me-2"></i>Ajouter un Nouveau Produit
            </button>

            {showProductForm && (
              <ProductForm
                product={editingProduct}
                onSubmit={handleFormSubmit}
                onCancel={handleCancelEdit}
                categories={categories}
              />
            )}

            <hr className="my-4" />

            <h5>
              <i className="bi bi-list-ul me-2"></i>
              Liste des Produits{' '}
              {filteredCategory && (
                <span className="badge bg-primary ms-2 text-capitalize">
                  {filteredCategory}
                </span>
              )}
            </h5>

            {filteredProducts.length === 0 ? (
              <div className="alert alert-info text-center mt-3" role="alert">
                Aucun produit à afficher.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover mt-3">
                  <thead className="table-primary">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Nom</th>
                      <th>Catégorie</th>
                      <th>Prix</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                            }}
                            onError={(e) => {
                              e.currentTarget.src = "https://placehold.co/50x50/CCCCCC/FFFFFF?text=No+Img";
                            }}
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.price.toFixed(2)}€</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(product)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteClick(product.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* AFFICHAGE DES CLIENTS */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title mb-3">
              <i className="bi bi-people me-2"></i>Clients inscrits
            </h4>

            {clients.length === 0 ? (
              <div className="alert alert-info">Aucun client inscrit.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Civilité</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Date de naissance</th>
                      <th>Newsletter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => (
                      <tr key={index}>
                        <td>{client.civility}</td>
                        <td>{client.name}</td>
                        <td>{client.firstName}</td>
                        <td>{client.dob || '-'}</td>
                        <td>{client.receiveNewsletter ? 'Oui' : 'Non'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* MODAL DE CONFIRMATION */}
        {showConfirmModal && (
          <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title">Confirmation de Suppression</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={cancelDelete}></button>
                </div>
                <div className="modal-body">
                  Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Annuler</button>
                  <button type="button" className="btn btn-danger" onClick={confirmDelete}>Supprimer</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
