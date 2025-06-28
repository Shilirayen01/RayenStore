import React from 'react';

// Re-export the provided constants here if they were not already globally available
// In a real project, these would typically be imported from a separate constants file.
const footerServiceFeatures = [
  {
    icon: "bi bi-arrow-counterclockwise",
    title: "Satisfait ou remboursé",
    description: "14 jours pour changer d'avis",
  },
  {
    icon: "bi bi-stopwatch",
    title: "Livraison rapide",
    description: "Domicile ou point relais",
  },
  {
    icon: "bi bi-truck",
    title: "Livraison gratuite dès 99€",
    description: "", // No second line for this one
  },
  {
    icon: "bi bi-shield-check",
    title: "Paiement en ligne sécurisé",
    description: "",
  },
];

const footerNavigationLinks = [
  { name: "À Propos", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Politique de Confidentialité", path: "/privacy" },
];

const socialMediaLinks = [
  { icon: "bi bi-facebook", url: "https://facebook.com/rayenstore" },
  { icon: "bi bi-instagram", url: "https://instagram.com/rayenstore" },
  { icon: "bi bi-twitter", url: "https://twitter.com/rayenstore" },
  { icon: "bi bi-linkedin", url: "https://linkedin.com/company/rayenstore" },
];

const CONTACT_EMAIL = 'contact@rayenstore.com';
const CONTACT_PHONE = '+216 54 814 636';
const COMPANY_NAME = 'RayenStore';

// Assurez-vous que les CDN de Bootstrap 5 et Bootstrap Icons sont liés dans votre index.html
// Exemple dans <head> de public/index.html :
/*
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
*/
// Exemple avant </body> de public/index.html :
/*
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" xintegrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
*/


const AboutPage = () => {
  return (
    <div className="container-fluid bg-light text-dark py-5" style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div className="container py-5">
        {/* Page Title */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary mb-3 p-2 rounded">
            À Propos de <span className="text-info">{COMPANY_NAME}</span>
          </h1>
          <p className="lead text-secondary">
            Bienvenue chez {COMPANY_NAME} ! Nous sommes ravis de vous accueillir et de partager notre histoire avec vous.
          </p>
        </div>

        {/* Our Commitment Section */}
        <section className="bg-white shadow-lg rounded-3 p-4 p-md-5 mb-5 hover-effect">
          <h2 className="display-5 fw-bold text-dark mb-4 text-center">
            Notre Engagement
          </h2>
          <p className="fs-5 text-secondary text-center mb-5">
            Chez {COMPANY_NAME}, notre mission est de vous offrir une expérience d'achat en ligne exceptionnelle. Nous nous engageons à vous proposer des produits de qualité supérieure, un service client irréprochable et une satisfaction garantie.
          </p>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {footerServiceFeatures.map((feature, index) => (
              <div key={index} className="col">
                <div className="d-flex flex-column align-items-center text-center p-4 bg-primary-subtle rounded-3 shadow-sm border border-primary hover-feature-card">
                  <div className="text-primary fs-1 mb-3">
                    <i className={feature.icon}></i>
                  </div>
                  <h3 className="h5 fw-semibold text-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-secondary small">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story Section */}
        <section className="bg-white shadow-lg rounded-3 p-4 p-md-5 mb-5 hover-effect">
          <h2 className="display-5 fw-bold text-dark mb-4 text-center">
            Notre Histoire
          </h2>
          <p className="fs-5 text-secondary text-justify mb-3">
            Fondée en [Année de fondation], {COMPANY_NAME} est née de la passion de [décrire la passion, ex: "proposer des articles uniques et tendance qui simplifient le quotidien et apportent de la joie"].
          </p>
          <p className="fs-5 text-secondary text-justify">
            Depuis nos débuts, nous nous efforçons de [décrire l'objectif, ex: "sélectionner minutieusement chaque produit, en privilégiant la qualité, l'innovation et le design. Nous croyons que chaque achat doit être une expérience agréable et sans tracas, et nous travaillons sans relâche pour dépasser vos attentes."]. Notre équipe est dédiée à [décrire l'engagement de l'équipe, ex: "vous offrir le meilleur service client possible, en vous accompagnant à chaque étape de votre parcours d'achat"].
          </p>
        </section>

        {/* Contact Us Section */}
        <section className="bg-white shadow-lg rounded-3 p-4 p-md-5 hover-effect">
          <h2 className="display-5 fw-bold text-dark mb-4 text-center">
            Contactez-Nous
          </h2>
          <p className="fs-5 text-secondary text-center mb-4">
            Nous sommes toujours à votre écoute ! Si vous avez des questions, des commentaires ou si vous souhaitez simplement en savoir plus, n'hésitez pas à nous contacter :
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn btn-primary btn-lg rounded-pill px-4 py-2 fw-semibold shadow-sm hover-btn"
            >
              <i className="bi bi-envelope-fill fs-4 me-2"></i> {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="btn btn-success btn-lg rounded-pill px-4 py-2 fw-semibold shadow-sm hover-btn"
            >
              <i className="bi bi-phone-fill fs-4 me-2"></i> {CONTACT_PHONE}
            </a>
          </div>

          <p className="fs-5 text-secondary text-center mb-4">
            Vous pouvez également nous suivre sur les réseaux sociaux pour découvrir nos dernières nouveautés, promotions et actualités :
          </p>

          <div className="d-flex justify-content-center gap-4">
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover-social-icon"
                aria-label={link.icon.replace('bi bi-', '')}
              >
                <i className={`${link.icon} fs-1`}></i>
              </a>
            ))}
          </div>
        </section>

        {/* Footer / Copyright - Optional, but good practice */}
        <footer className="text-center mt-5 text-secondary small">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. Tous droits réservés.</p>
        </footer>
      </div>
      {/* Custom CSS for hover effects not directly available in Bootstrap */}
      <style >{`
        .hover-effect:hover {
          transform: scale(1.02);
          transition: transform 0.3s ease-in-out;
        }
        .hover-feature-card:hover {
          transform: scale(1.05);
          background-color: var(--bs-primary-bg-subtle-hover, #e0f2f7); /* A slightly darker shade for hover */
          transition: all 0.3s ease-in-out;
        }
        .hover-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .hover-social-icon:hover {
          color: var(--bs-primary) !important; /* Bootstrap primary color */
          transform: scale(1.25);
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;