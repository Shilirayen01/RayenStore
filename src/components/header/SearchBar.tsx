// src/components/Header/SearchBar.tsx
import React from 'react';

interface Props {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, onSearchChange }) => (
  <div className="input-group mx-4" style={{ width: '350px' }}>
    <span className="input-group-text">
      <i className="bi bi-search"></i>
    </span>
    <input
      type="text"
      className="form-control"
      placeholder="Rechercher un produit..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
