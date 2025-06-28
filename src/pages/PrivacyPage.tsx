import React from 'react';

// Il est bon de centraliser ces constantes, mais pour cet exemple,
// je les redéfinis ici pour que le composant soit autonome.
const COMPANY_NAME = 'RayenStore';
const CONTACT_EMAIL = 'contact@rayenstore.com';


const PrivacyPage: React.FC = () => {
  return (
    <div className="container-fluid bg-light text-dark py-5" style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      <div className="container py-5">
        {/* Page Title */}
        <h1 className="display-4 fw-bold mb-4 border-bottom border-secondary pb-3 text-uppercase text-center text-md-start">
          Politique de Confidentialité
        </h1>

        <p className="lead text-secondary mb-5 text-center text-md-start">
          Chez <strong className="text-dark">{COMPANY_NAME}</strong>, la protection de vos données est notre priorité. Découvrez comment nous collectons, utilisons et sécurisons vos informations personnelles.
        </p>

        {/* Content Sections */}
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            <div className="bg-white rounded-4 p-4 shadow-sm hover-card-effect-light">
              <h3 className="h4 fw-semibold mb-3 text-primary-light">1. Données collectées</h3>
              <ul className="list-unstyled text-dark">
                <li><i className="bi bi-dot me-2"></i> Nom, prénom, email, téléphone</li>
                <li><i className="bi bi-dot me-2"></i> Adresse de livraison/facturation</li>
                <li><i className="bi bi-dot me-2"></i> Historique d’achats</li>
              </ul>
            </div>
          </div>

          <div className="col">
            <div className="bg-white rounded-4 p-4 shadow-sm hover-card-effect-light">
              <h3 className="h4 fw-semibold mb-3 text-primary-light">2. Utilisation des données</h3>
              <ul className="list-unstyled text-dark">
                <li><i className="bi bi-dot me-2"></i> Traitement des commandes</li>
                <li><i className="bi bi-dot me-2"></i> Assistance client</li>
                <li><i className="bi bi-dot me-2"></i> Personnalisation de l'expérience</li>
                <li><i className="bi bi-dot me-2"></i> Recommandations ciblées</li>
              </ul>
            </div>
          </div>

          <div className="col">
            <div className="bg-white rounded-4 p-4 shadow-sm hover-card-effect-light">
              <h3 className="h4 fw-semibold mb-3 text-primary-light">3. Partage des données</h3>
              <p className="text-dark">
                Vos données sont partagées uniquement avec nos partenaires de confiance pour la livraison et le paiement.
              </p>
            </div>
          </div>

          <div className="col">
            <div className="bg-white rounded-4 p-4 shadow-sm hover-card-effect-light">
              <h3 className="h4 fw-semibold mb-3 text-primary-light">4. Vos droits</h3>
              <p className="text-dark">
                Vous pouvez demander l'accès, la correction ou la suppression de vos données à :{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-info-light text-decoration-underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>

          <div className="col">
            <div className="bg-white rounded-4 p-4 shadow-sm hover-card-effect-light">
              <h3 className="h4 fw-semibold mb-3 text-primary-light">5. Cookies</h3>
              <p className="text-dark">
                Nous utilisons des cookies pour améliorer votre navigation. Vous pouvez les gérer depuis votre navigateur.
              </p>
            </div>
          </div>

          <div className="col">
            <div className="bg-white rounded-4 p-4 shadow-sm hover-card-effect-light">
              <h3 className="h4 fw-semibold mb-3 text-primary-light">6. Sécurité</h3>
              <p className="text-dark">
                Vos données sont hébergées sur des serveurs sécurisés, protégées contre tout accès non autorisé.
              </p>
            </div>
          </div>
        </div>

        <p className="text-end text-muted small mt-5">
          Dernière mise à jour : Juin 2025
        </p>
      </div>

      {/* Custom CSS for modern light theme and hover effects */}
      <style >{`
        .bg-light {
          background-color: #f8f9fa !important; /* Lighter background for the page */
        }
        .text-dark {
          color: #212529 !important; /* Standard dark text */
        }
        .text-secondary {
          color: #6c757d !important; /* Slightly lighter dark for general text */
        }
        .text-muted {
          color: #6c757d !important; /* Greyish for meta-info */
        }

        /* Custom colors for headings and links on light background */
        .text-primary-light {
          color: #007bff !important; /* Standard Bootstrap blue for primary elements */
        }
        .text-info-light {
          color: #17a2b8 !important; /* Standard Bootstrap cyan for info links */
        }

        /* Custom hover effect for cards */
        .hover-card-effect-light {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
          border: 1px solid #dee2e6; /* Light grey border for distinction */
        }
        .hover-card-effect-light:hover {
          transform: translateY(-5px); /* Lift effect */
          box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.1) !important; /* Stronger shadow */
          border-color: #007bff; /* Primary color border on hover */
        }
      `}</style>
    </div>
  );
};

export default PrivacyPage;