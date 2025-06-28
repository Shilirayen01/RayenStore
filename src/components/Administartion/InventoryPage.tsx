// src/components/Administration/InventoryPage.tsx
import React from 'react';
import { Table, Button, Modal, Image, Alert, Pagination, Card } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom'; // Pour récupérer le contexte de l'Outlet

// Définis tes types, ou utilise des types génériques si tu ne les as pas encore
interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    rating?: number; // Optionnel
    stock?: number; // Optionnel
    brand?: string; // Optionnel
}

// Le contexte qui sera passé de AdminLayout
interface AdminOutletContext {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (id: number) => void;
    categories: any[]; // Remplace 'any' par ton type Category
}

const InventoryPage: React.FC = () => {
    // Récupère les données et fonctions du contexte de l'Outlet
    const { products, addProduct, updateProduct, deleteProduct, categories } = useOutletContext<AdminOutletContext>();

    // Logique de state pour le formulaire et la suppression (comme tu avais)
    const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
    const [showProductForm, setShowProductForm] = React.useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = React.useState<boolean>(false);
    const [productIdToDelete, setProductIdToDelete] = React.useState<number | null>(null);

    // Pagination (à adapter avec tes données)
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

    return (
        <div className="inventory-page">
            <h2 className="mb-4">Product Inventory</h2>

            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <h4 className="card-title mb-3">
                        <i className="bi bi-box-seam me-2"></i>Manage Products
                    </h4>
                    <Button
                        variant="primary"
                        className="mb-3"
                        onClick={() => {
                            setEditingProduct(null);
                            setShowProductForm(true);
                        }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>Add New Product
                    </Button>

                    {/* Intégration de ton ProductForm (assure-toi qu'il gère bien les props onSubmit et onCancel) */}
                    {showProductForm && (
                        <div className="mt-4 p-3 border rounded bg-light">
                            {/* Remplace ProductForm par ton composant réel */}
                            {/* <ProductForm
                                product={editingProduct}
                                onSubmit={handleFormSubmit}
                                onCancel={handleCancelEdit}
                                categories={categories}
                            /> */}
                            <Alert variant="warning">
                                **ProductForm Placeholder:** Intègre ici ton `ProductForm` existant.
                                Il doit accepter `product`, `onSubmit`, `onCancel`, et `categories`.
                                <Button variant="secondary" className="ms-3" onClick={handleCancelEdit}>Close Form</Button>
                            </Alert>
                        </div>
                    )}

                    <hr className="my-4" />

                    <h5>Product List ({products.length} total)</h5>

                    {products.length === 0 ? (
                        <Alert variant="info" className="text-center mt-3">
                            No products to display.
                        </Alert>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <Table striped bordered hover className="mt-3">
                                    <thead className="table-primary">
                                        <tr>
                                            <th>Thumbnail</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Category</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentProducts.map(product => (
                                            <tr key={product.id}>
                                                <td>
                                                    <Image
                                                        src={product.image || "https://via.placeholder.com/50"}
                                                        alt={product.name}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                            e.currentTarget.src = "https://via.placeholder.com/50?text=No+Img"; // Fallback image
                                                        }}
                                                    />
                                                </td>
                                                <td>{product.name}</td>
                                                <td>${product.price ? product.price.toFixed(2) : 'N/A'}</td>
                                                <td>{product.category}</td>
                                                <td>
                                                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(product)}>
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Button>
                                                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(product.id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <Pagination className="justify-content-center mt-3">
                                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                                {[...Array(totalPages)].map((_, index) => (
                                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                            </Pagination>
                        </>
                    )}
                </Card.Body>
            </Card>

            {/* Modal de confirmation de suppression */}
            <Modal show={showConfirmModal} onHide={cancelDelete} centered>
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Confirmation de Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>Annuler</Button>
                    <Button variant="danger" onClick={confirmDelete}>Supprimer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InventoryPage;