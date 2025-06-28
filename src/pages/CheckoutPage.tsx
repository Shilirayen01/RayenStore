// src/pages/CheckoutPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: '#f0f9ff' }}
    >
      <div
        className="card shadow-lg p-5 w-75"
        style={{ borderRadius: '20px', backgroundColor: '#ffffff' }}
      >
        <div className="row">
          {/* Connexion */}
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-start border-end pe-4">
            <h2 className="mb-3 fw-bold" style={{ color: '#1e3a8a' }}>
              Connectez-vous
            </h2>
            <p className="mb-4" style={{ color: '#1e3a8a' }}>
              Vous avez déjà un compte ? Connectez-vous pour finaliser votre commande.
            </p>
            <button
              className="btn btn-lg w-100"
              onClick={handleSignInClick}
              style={{
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                transition: '0.3s',
              }}
            >
              Se connecter
            </button>
          </div>

          {/* Créer un compte */}
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-start ps-4 mt-4 mt-md-0">
            <h2 className="mb-3 fw-bold" style={{ color: '#1e3a8a' }}>
              Créer un compte
            </h2>
            <p className="mb-4" style={{ color: '#1e3a8a' }}>
              Créez votre compte pour une expérience de commande plus rapide et personnalisée.
            </p>
            <button
              className="btn btn-lg w-100"
              onClick={() => navigate('/signup')}
              style={{
                backgroundColor: '#e0f2fe',
                color: '#1e3a8a',
                border: '1px solid #3b82f6',
                transition: '0.3s',
              }}
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
