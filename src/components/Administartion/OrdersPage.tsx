import React, { useEffect, useState } from 'react';
import { Table, Alert, Pagination, Card, Button, Form, Collapse } from 'react-bootstrap';
import { supabase } from '../../config/supabaseClient';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  user_id: string;
  customerName: string;
  created_at: string;
  status: 'en attente' | 'livrée' | 'annulée';
  total: number;
  items: OrderItem[];
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          user_id,
          total,
          status,
          created_at,
          items
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const ordersWithName: Order[] = (data || []).map((order: any) => ({
        id: order.id,
        user_id: order.user_id,
        customerName: order.user_id.slice(0, 8) + '...', // ✅ affichage propre
        created_at: order.created_at,
        status: order.status,
        total: order.total,
        items: order.items || [],
      }));

      setOrders(ordersWithName);
    } catch (err: any) {
      setError('Erreur lors du chargement des commandes : ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'livrée':
        return <span className="badge bg-success">Livrée</span>;
      case 'en attente':
        return <span className="badge bg-warning text-dark">En attente</span>;
      case 'annulée':
        return <span className="badge bg-danger">Annulée</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err: any) {
      alert('Erreur lors de la mise à jour du statut : ' + err.message);
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="orders-page">
      <h2 className="mb-4">Gestion des commandes</h2>

      <Card className="shadow-sm">
        <Card.Body>
          <h4 className="card-title mb-3">Liste des commandes</h4>

          {loading && <Alert variant="info" className="text-center">Chargement en cours...</Alert>}
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}

          {!loading && orders.length === 0 && (
            <Alert variant="info" className="text-center">Aucune commande à afficher.</Alert>
          )}

          {!loading && orders.length > 0 && (
            <>
              <div className="table-responsive">
                <Table striped bordered hover className="mt-3">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Client</th>
                      <th>Date</th>
                      <th>Statut</th>
                      <th>Total (€)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map(order => (
                      <React.Fragment key={order.id}>
                        <tr>
                          <td>{order.id.slice(0, 8)}</td>
                          <td>{order.customerName}</td>
                          <td>{new Date(order.created_at).toLocaleDateString()}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              {getStatusBadge(order.status)}
                              <Form.Select
                                size="sm"
                                value={order.status}
                                onChange={e =>
                                  handleStatusChange(order.id, e.target.value as Order['status'])
                                }
                              >
                                <option value="en attente">En attente</option>
                                <option value="livrée">Livrée</option>
                                <option value="annulée">Annulée</option>
                              </Form.Select>
                            </div>
                          </td>
                          <td>{order.total.toFixed(2)}</td>
                          <td>
                            <Button
                              variant="info"
                              size="sm"
                              className="me-2"
                              onClick={() => toggleRow(order.id)}
                            >
                              <i className="bi bi-eye"></i> Voir
                            </Button>
                          </td>
                        </tr>

                        {/* Détail des produits */}
                        <tr>
                          <td colSpan={6} className="p-0 border-0">
                            <Collapse in={expandedRows.includes(order.id)}>
                              <div className="p-3 bg-light">
                                <h6 className="mb-3">Produits commandés :</h6>
                                <Table size="sm" bordered>
                                  <thead>
                                    <tr>
                                      <th>Produit</th>
                                      <th>Quantité</th>
                                      <th>Prix (€)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {order.items.map((item, idx) => (
                                      <tr key={idx}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price.toFixed(2)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </div>
                            </Collapse>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </div>

              <Pagination className="justify-content-center mt-3">
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, idx) => (
                  <Pagination.Item
                    key={idx + 1}
                    active={currentPage === idx + 1}
                    onClick={() => paginate(idx + 1)}
                  >
                    {idx + 1}
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
