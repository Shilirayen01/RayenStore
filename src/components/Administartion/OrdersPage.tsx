// src/components/Administration/OrdersPage.tsx
import React from 'react';
import { Table, Alert, Pagination, Card, Button } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';

// Définis tes types, ou utilise des types génériques si tu ne les as pas encore
interface Order {
    id: number;
    customerName: string;
    date: string;
    status: 'Pending' | 'Completed' | 'Cancelled';
    totalAmount: number;
}

interface AdminOutletContext {
    orders: Order[]; // Assume que tes commandes sont passées via le contexte
}

const OrdersPage: React.FC = () => {
    const { orders } = useOutletContext<AdminOutletContext>();

    // Données de démonstration si 'orders' n'est pas encore rempli
    const demoOrders: Order[] = orders.length > 0 ? orders : [
        { id: 1, customerName: 'Alice Dupont', date: '2024-06-20', status: 'Completed', totalAmount: 185.50 },
        { id: 2, customerName: 'Bob Martin', date: '2024-06-19', status: 'Pending', totalAmount: 75.00 },
        { id: 3, customerName: 'Charlie Leblanc', date: '2024-06-18', status: 'Cancelled', totalAmount: 220.75 },
        { id: 4, customerName: 'Diana Roussou', date: '2024-06-17', status: 'Completed', totalAmount: 45.99 },
        { id: 5, customerName: 'Eve Richard', date: '2024-06-16', status: 'Pending', totalAmount: 310.00 },
    ];

    // Pagination
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = demoOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(demoOrders.length / itemsPerPage);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const getStatusBadge = (status: Order['status']) => {
        switch (status) {
            case 'Completed': return <span className="badge bg-success">Completed</span>;
            case 'Pending': return <span className="badge bg-warning text-dark">Pending</span>;
            case 'Cancelled': return <span className="badge bg-danger">Cancelled</span>;
            default: return <span className="badge bg-secondary">{status}</span>;
        }
    };

    return (
        <div className="orders-page">
            <h2 className="mb-4">Order Management</h2>

            <Card className="shadow-sm">
                <Card.Body>
                    <h4 className="card-title mb-3">Order List</h4>
                    {demoOrders.length === 0 ? (
                        <Alert variant="info" className="text-center mt-3">
                            No orders to display.
                        </Alert>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <Table striped bordered hover className="mt-3">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Total Amount (€)</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentOrders.map(order => (
                                            <tr key={order.id}>
                                                <td>#{order.id}</td>
                                                <td>{order.customerName}</td>
                                                <td>{order.date}</td>
                                                <td>{getStatusBadge(order.status)}</td>
                                                <td>{order.totalAmount.toFixed(2)}</td>
                                                <td>
                                                    <Button variant="info" size="sm" className="me-2">
                                                        <i className="bi bi-eye"></i> View
                                                    </Button>
                                                    {/* Tu peux ajouter des boutons d'action ici */}
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
        </div>
    );
};

export default OrdersPage;