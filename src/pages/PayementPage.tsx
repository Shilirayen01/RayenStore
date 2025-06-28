import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const PaymentPage: React.FC = () => {
  return (
    <>
      <Header cartItems={[]} onCartToggle={() => {}} searchTerm="" onSearchChange={() => {}} />
      <div className="container py-5">
        <h2>Page de paiement</h2>
        <p>Cette fonctionnalité sera bientôt disponible.</p>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
