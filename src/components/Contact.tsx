// src/pages/ContactPage.tsx
import React from 'react';
import { CONTACT_EMAIL, CONTACT_PHONE, COMPANY_NAME } from '../config/appConfig';

const Contact: React.FC = () => {
  return (
    <div className="container py-5 min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-5 text-center" style={{ maxWidth: '600px' }}>
        <i className="bi bi-headset display-1 text-primary mb-4"></i>
        <h1 className="mb-3 fw-bold text-primary">Contactez-nous</h1>
        <p className="lead mb-4">
          N'hésitez pas à nous envoyer un message pour toute question, suggestion ou demande de renseignement.
          Notre équipe est là pour vous aider !
        </p>
        <div className="mb-3">
          <p className="mb-1">
            <i className="bi bi-envelope-fill me-2 text-secondary"></i>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-decoration-none text-dark">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mb-0">
            <i className="bi bi-phone-fill me-2 text-secondary"></i>
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="text-decoration-none text-dark">
              {CONTACT_PHONE}
            </a>
          </p>
        </div>
        <p className="text-muted small">
          Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    </div>
  );
};

export default Contact;