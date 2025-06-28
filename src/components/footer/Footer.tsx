import React from 'react';
import { Link } from 'react-router-dom';
import ServiceFeatureItem from './ServiceFeatureItem';
import { footerServiceFeatures, footerNavigationLinks, socialMediaLinks, CONTACT_EMAIL, CONTACT_PHONE, COMPANY_NAME } from '../../data/footerFeatures'; // Adjust path if needed

// Make sure you have Bootstrap Icons CSS linked in your project for 'bi bi-...' classes to work.

const Footer: React.FC = () => {
  return (
    // Main footer: white background, dark text, padding, and a top border for separation.
    <footer className="bg-white text-dark pt-5 pb-3 border-top">
      {/* Service Features Section: Retains a distinct background (e.g., primary color) for visual separation. */}
      <div className="bg-primary py-3 mb-4">
        <div className="container d-flex justify-content-around align-items-center flex-wrap text-center">
          {footerServiceFeatures.map((feature, index) => (
            <ServiceFeatureItem
              key={index} // Remember: a more stable key (like a unique ID) is better if features can be reordered or deleted.
              iconClass={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* About Section: Provides a brief description of the company. */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-4 fw-bold">À Propos de {COMPANY_NAME}</h5>
            <p className="text-muted">
              Votre destination unique pour des produits de qualité supérieure. Nous nous engageons à offrir une expérience d'achat exceptionnelle et un service client irréprochable.
            </p>
          </div>

          {/* Quick Links Section: Essential navigation links for the user. */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-4 fw-bold">Liens Rapides</h5>
            <ul className="list-unstyled">
              {footerNavigationLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link to={link.path} className="text-dark text-decoration-none hover-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Section: Displays contact information and social media links. */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-4 fw-bold">Contact & Suivez-nous</h5>
            {/* Re-added email contact */}
            <p className="text-muted">
              <i className="bi bi-envelope-fill me-2 text-secondary" aria-hidden="true"></i>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-dark text-decoration-none hover-link">
                {CONTACT_EMAIL}
              </a>
            </p>
            {/* Re-added phone contact */}
            <p className="text-muted">
              <i className="bi bi-phone-fill me-2 text-secondary" aria-hidden="true"></i>
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="text-dark text-decoration-none hover-link">
                {CONTACT_PHONE}
              </a>
            </p>
            <div className="d-flex mt-3">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark me-3 fs-4 hover-icon"
                  aria-label={`Suivez-nous sur ${social.icon.replace('bi bi-', '')}`}
                >
                  <i className={social.icon} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal rule for visual separation before copyright. */}
        <hr className="my-4 border-muted" />

        {/* Copyright Section: Standard copyright notice. */}
        <div className="text-center text-muted small">
          © {new Date().getFullYear()} {COMPANY_NAME}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;