import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { useAuth } from '../AuthContext';
import { Spinner, Alert, Card, Badge, Row, Col } from 'react-bootstrap';
import { BsBoxSeam, BsCalendar3, BsCurrencyEuro, BsHourglassSplit, BsCheckCircle, BsXCircle } from 'react-icons/bs';

interface Order {
  id: string;
  user_id: string;
  items: any[];
  total: number;
  status: string;
  created_at: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .eq('visible_client', true)
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
        console.error('Erreur chargement commandes :', error);
      } else {
        setOrders(data || []);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge bg="warning" text="dark"><BsHourglassSplit className="me-1" />En attente</Badge>;
      case 'completed':
        return <Badge bg="success"><BsCheckCircle className="me-1" />Livrée</Badge>;
      case 'cancelled':
        return <Badge bg="danger"><BsXCircle className="me-1" />Annulée</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (!user) return <Alert variant="warning">Veuillez vous connecter pour voir vos commandes.</Alert>;
  if (loading) return <div className="text-center my-5"><Spinner animation="border" variant="primary" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">📦 Mes Commandes</h2>

      {orders.length === 0 ? (
        <Alert variant="info" className="text-center">Vous n'avez encore passé aucune commande.</Alert>
      ) : (
        orders.map(order => (
          <Card key={order.id} className="mb-3 shadow-sm border-0 rounded-3">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <Card.Title className="mb-2">
                    <BsBoxSeam className="me-2" />
                    Commande <strong>#{order.id.slice(0, 8)}</strong>
                  </Card.Title>
                  <p className="mb-1">
                    <BsCalendar3 className="me-2" />
                    <strong>Date :</strong> {new Date(order.created_at).toLocaleDateString()}
                  </p>
                  <p className="mb-1">
                    <BsCurrencyEuro className="me-2" />
                    <strong>Total :</strong> {order.total.toFixed(2)} €
                  </p>
                  <p className="mb-0">
                    <strong>Statut :</strong> {getStatusBadge(order.status)}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
