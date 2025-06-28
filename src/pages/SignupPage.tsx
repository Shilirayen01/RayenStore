// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addClient } from '../services/clientService';
import { useAuth } from '../AuthContext';
import { supabase } from '../config/supabaseClient';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        alert("Erreur d'inscription : " + error.message);
        return;
      }

      if (data.user) {
        await addClient({
          auth_id: data.user.id,
          email,
        });

        alert("Compte créé avec succès ! Veuillez vérifier votre email.");
        navigate('/login');
      }
    } catch (err: any) {
      alert("Erreur : " + err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
         style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '1rem' }}>
        <div className="text-center mb-4">
          <i className="bi bi-person-plus-fill" style={{ fontSize: '4rem', color: '#2575fc' }}></i>
          <h3 className="mt-2">Créer un compte</h3>
        </div>

        <form onSubmit={handleSignup}>
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

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Confirmer le mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-person-plus me-2"></i> S'inscrire
          </button>
        </form>

        <p className="mt-4 text-center">
          Déjà un compte ? <a href="/login" className="text-primary">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
