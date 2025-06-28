// src/components/Administration/AdminSidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Importe NavLink

const AdminSidebar: React.FC = () => {
    return (
        <div
            className="bg-dark text-white position-fixed h-100 p-4" // Couleur sombre pour un look admin
            style={{
                width: '250px',
                top: 0,
                left: 0,
                overflowY: 'auto',
                boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
                zIndex: 1000 // Assure que la sidebar est au-dessus du contenu
            }}
        >
            <h4 className="mb-4">
                <i className="bi bi-speedometer2 me-2"></i>Admin Panel
            </h4>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    {/* NavLink pour le Dashboard Overview */}
                    <NavLink
                        to="/admin" // Route parente, affichera l'index du Outlet
                        end // 'end' pour matcher la route exacte /admin
                        className={({ isActive }) => "nav-link text-white" + (isActive ? " active fw-bold bg-secondary rounded" : "")}
                    >
                        <i className="bi bi-grid-1x2-fill me-2"></i>Dashboard Overview
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    {/* NavLink pour la page Inventory */}
                    <NavLink
                        to="/admin/inventory"
                        className={({ isActive }) => "nav-link text-white" + (isActive ? " active fw-bold bg-secondary rounded" : "")}
                    >
                        <i className="bi bi-box-seam-fill me-2"></i>Inventory
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    {/* NavLink pour la page Orders */}
                    <NavLink
                        to="/admin/orders"
                        className={({ isActive }) => "nav-link text-white" + (isActive ? " active fw-bold bg-secondary rounded" : "")}
                    >
                        <i className="bi bi-receipt-cutoff me-2"></i>Orders
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    {/* NavLink pour la page Customers */}
                    <NavLink
                        to="/admin/customers"
                        className={({ isActive }) => "nav-link text-white" + (isActive ? " active fw-bold bg-secondary rounded" : "")}
                    >
                        <i className="bi bi-people-fill me-2"></i>Customers
                    </NavLink>
                </li>
                {/* Tu peux ajouter d'autres liens ici si tu as d'autres sections (ex: Settings) */}

                <li className="nav-item mt-4">
                    <NavLink to="/" className="nav-link text-white">
                        <i className="bi bi-arrow-left me-2"></i>Retour au Site
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;