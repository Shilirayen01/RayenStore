// src/components/Header/FavoritesButton.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  count: number;
}

const FavoritesButton: React.FC<Props> = ({ count }) => (
  <Link to="/favoris" className="btn btn-link text-decoration-none text-light position-relative" aria-label="Favoris">
    <i className="bi bi-heart"></i>
    {count > 0 && (
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {count}
      </span>
    )}
  </Link>
);

export default FavoritesButton;
