// src/pages/LoginPage.tsx
// This file remains unchanged as it focuses solely on authentication login.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin');
    } catch (error: any) {
      alert('Erreur de connexion : ' + error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
         style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '1rem' }}>
        <div className="text-center mb-4">
          <i className="bi bi-person-circle" style={{ fontSize: '4rem', color: '#2575fc' }}></i>
          <h3 className="mt-2">Connexion</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Adresse e-mail</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-box-arrow-in-right me-2"></i> Se connecter
          </button>
        </form>
        <p className="mt-4 text-center">
          Pas de compte ? <a href="/signUp" className="text-primary">S'inscrire</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;