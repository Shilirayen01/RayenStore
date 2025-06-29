// src/components/Administration/DashboardOverview.tsx
import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Enregistre les composants nécessaires de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface DashboardOverviewProps {
    // Tu peux passer des props pour les données réelles du dashboard ici
    // Ex: totalOrders, totalInventory, totalCustomers, totalRevenue, chartData
}

const DashboardOverview: React.FC<DashboardOverviewProps> = () => {
    // --- Données de démonstration (à remplacer par tes données réelles) ---
    const demoTotalOrders = 1250;
    const demoTotalInventory = 875;
    const demoTotalCustomers = 345;
    const demoTotalRevenue = 78900;

    const demoChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenus Mensuels (€)',
                data: [1500, 2200, 1800, 2500, 3000, 2800, 3500, 3200, 4000, 3800, 4500, 5000],
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bleu
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const demoChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Revenus Annuels',
            },
        },
    };

    const demoRecentOrders = [
        { id: 1, product: 'Football Boots', quantity: 2, price: 120.00 },
        { id: 2, product: 'Team Jersey', quantity: 5, price: 50.00 },
        { id: 3, product: 'Soccer Ball', quantity: 3, price: 30.00 },
        { id: 4, product: 'Shin Guards', quantity: 1, price: 25.00 },
        { id: 5, product: 'Goalkeeper Gloves', quantity: 1, price: 45.00 },
    ];
    // --- Fin des données de démonstration ---

    return (
        <div className="dashboard-overview">
            <h2 className="mb-4">Dashboard Overview</h2>

            {/* Cartes de Statistiques */}
            <Row className="mb-4">
                <Col md={3} sm={6} className="mb-3">
                    <Card className="shadow-sm text-center">
                        <Card.Body>
                            <i className="bi bi-cart-fill text-success fs-2 mb-2"></i>
                            <Card.Title className="text-muted small text-uppercase">Total Orders</Card.Title>
                            <Card.Text className="fs-3 fw-bold">{demoTotalOrders.toLocaleString()}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-3">
                    <Card className="shadow-sm text-center">
                        <Card.Body>
                            <i className="bi bi-box-seam-fill text-info fs-2 mb-2"></i>
                            <Card.Title className="text-muted small text-uppercase">Total Products</Card.Title>
                            <Card.Text className="fs-3 fw-bold">{demoTotalInventory.toLocaleString()}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-3">
                    <Card className="shadow-sm text-center">
                        <Card.Body>
                            <i className="bi bi-people-fill text-warning fs-2 mb-2"></i>
                            <Card.Title className="text-muted small text-uppercase">Total Customers</Card.Title>
                            <Card.Text className="fs-3 fw-bold">{demoTotalCustomers.toLocaleString()}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>

            {/* Graphique de Revenus */}
            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <h5 className="card-title mb-3">Order Revenue Overview</h5>
                    <Bar data={demoChartData} options={demoChartOptions} />
                </Card.Body>
            </Card>

            {/* Tableau des Commandes Récentes */}
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
                                {demoRecentOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center text-muted">No recent orders to display.</td>
                                    </tr>
                                ) : (
                                    demoRecentOrders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.product}</td>
                                            <td>{order.quantity}</td>
                                            <td>{order.price.toFixed(2)}</td>
                                        </tr>
                                    ))
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