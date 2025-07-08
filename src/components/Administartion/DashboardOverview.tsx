import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { supabase } from '../../config/supabaseClient';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


type MonthlyRevenueItem = {
  month: number;
  total: number;
};

interface Order {
  id: string;
  total: number;
  created_at: string;
  items: { name: string; quantity: number; price: number }[];
}

const DashboardOverview: React.FC = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>(new Array(12).fill(0));
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const [{ data: products }, { data: clients }, { data: orders, error: ordersError }] = await Promise.all([
        supabase.from('products').select('id'),
        supabase.from('clients').select('id'),
        supabase.from('orders').select('id, total'),
      ]);

      if (products) setTotalProducts(products.length);
      if (clients) setTotalCustomers(clients.length);

      if (orders && !ordersError) {
        setTotalOrders(orders.length);
        const revenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
        setTotalRevenue(revenue);
      } else {
        console.error('Erreur chargement commandes :', ordersError);
      }

      // Revenus mensuels
      const { data, error } = await supabase.rpc('monthly_revenue');
      if (!error && data) {
        const revenueData = data as MonthlyRevenueItem[];
        const monthly = new Array(12).fill(0);
        revenueData.forEach(({ month, total }) => {
          monthly[month - 1] = total;
        });
        setMonthlyRevenue(monthly);
      } else {
        console.error('Erreur revenus mensuels :', error);
      }

      // Commandes récentes
      const { data: recent, error: recentError } = await supabase
        .from('orders')
        .select('id, created_at, total, items')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!recentError && recent) {
        const formatted: Order[] = recent.map((order: any) => ({
          id: order.id,
          total: order.total,
          created_at: order.created_at,
          items: order.items || [],
        }));
        setRecentOrders(formatted);
      } else {
        console.error('Erreur commandes récentes :', recentError);
      }
    };

    fetchDashboardStats();
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenus Mensuels (€)',
        data: monthlyRevenue,
        backgroundColor: [
          '#4dc9f6', '#f67019', '#f53794', '#537bc4',
          '#acc236', '#166a8f', '#00a950', '#58595b',
          '#8549ba', '#e6194b', '#3cb44b', '#ffe119'
        ],
        
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Revenus Annuels' },
    },
  };

  return (
    <div className="dashboard-overview">
      <h2 className="mb-4">Dashboard Overview</h2>

      <Row className="mb-4">
        <Col md={3} sm={6} className="mb-3">
          <Card className="shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-cart-fill text-success fs-2 mb-2"></i>
              <Card.Title className="text-muted small text-uppercase">Total Orders</Card.Title>
              <Card.Text className="fs-3 fw-bold">{totalOrders.toLocaleString()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-currency-euro text-primary fs-2 mb-2"></i>
              <Card.Title className="text-muted small text-uppercase">Total Revenue</Card.Title>
              <Card.Text className="fs-3 fw-bold">{totalRevenue.toLocaleString()} €</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-box-seam-fill text-info fs-2 mb-2"></i>
              <Card.Title className="text-muted small text-uppercase">Total Products</Card.Title>
              <Card.Text className="fs-3 fw-bold">{totalProducts.toLocaleString()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-people-fill text-warning fs-2 mb-2"></i>
              <Card.Title className="text-muted small text-uppercase">Total Customers</Card.Title>
              <Card.Text className="fs-3 fw-bold">{totalCustomers.toLocaleString()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h5 className="card-title mb-3">Order Revenue Overview</h5>
          <Bar data={chartData} options={chartOptions} />
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="card-title mb-3">Recent Orders</h5>
          <div className="table-responsive">
            <Table striped hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price (€)</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-muted">No recent orders to display.</td>
                  </tr>
                ) : (
                  recentOrders.flatMap(order =>
                    order.items.map((item, idx) => (
                      <tr key={`${order.id}-${idx}`}>
                        <td>{order.id.slice(0, 8)}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price.toFixed(2)}</td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardOverview;
