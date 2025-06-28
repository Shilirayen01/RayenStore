// src/components/Administartion/AdminLayout.tsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar'; // Ton composant de sidebar
import { useAuth } from '../../AuthContext'; // Garde ton contexte d'authentification

// Importe l'interface AdminOutletContextType depuis App.tsx pour la cohérence des types
// ou déplacez cette interface dans un fichier partagé comme src/types/index.ts si elle est utilisée par plusieurs composants.
// Pour l'instant, je vais la définir ici localement pour l'exemple, mais l'idéal est de l'importer.
import { AdminOutletContextType } from '../../App'; // Assure-toi que ce chemin est correct

interface AdminLayoutProps {
    // La prop 'context' est maintenant explicitement définie ici
    context: AdminOutletContextType;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ context }) => { // Accepte la prop 'context'
    const { logout } = useAuth(); // Utilise ton hook de déconnexion
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirige vers la page d'accueil après déconnexion
    };

    return (
        <div className="d-flex">
            {/* Sidebar fixe à gauche */}
            <AdminSidebar />

            {/* Contenu principal du dashboard, avec un décalage à gauche pour la sidebar */}
            <div className="flex-grow-1 p-3" style={{ marginLeft: '250px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    {/* Titre de page générique, car le titre spécifique sera dans les composants enfants */}
                    <h1 className="text-primary d-none d-md-block">
                        <i className="bi bi-speedometer2 me-2"></i>Dashboard Administration
                    </h1>
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Déconnexion
                    </button>
                </div>
                {/* L'Outlet rendra le composant de route enfant actif ici */}
                {/* Il propage également le 'context' aux composants enfants */}
                <Outlet context={context} />
            </div>
        </div>
    );
};

export default AdminLayout;
