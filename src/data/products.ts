// src/data/products.ts
import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'all', name: 'Tous les produits', icon: 'bi-grid' },
  { id: 'crampons', name: 'Crampons', icon: 'bi-award' },
  { id: 'tenues', name: 'Tenues', icon: 'bi-person' },
  { id: 'ballons', name: 'Ballons', icon: 'bi-circle' }
];

export const products: Product[] = [
  // Crampons
  {
    id: 1,
    name: "Nike Mercurial Superfly 9",
    category: "crampons",
    price: 289.99,
    image: "/th.jpg",
    rating: 4.8,
    description: "Crampons professionnels ultra-légers pour vitesse maximale",
    brand: "Nike",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"]
  },
  {
    id: 2,
    name: "Adidas X Speedflow.1",
    category: "crampons",
    price: 259.99,
    image: "/adidas.jpg",
    rating: 4.7,
    description: "Performance maximale sur terrain sec",
    brand: "Adidas",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"]
  },
  {
    id: 3,
    name: "Puma Future Z 1.1",
    category: "crampons",
    price: 199.99,
    image: "/puma.jpg",
    rating: 4.6,
    description: "Agilité et contrôle parfait du ballon",
    brand: "Puma",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"]
  },

  // Tenues
  {
    id: 4,
    name: "Maillot PSG Domicile 2024",
    category: "tenues",
    price: 89.99,
    image: "/psg.jpg",
    rating: 4.9,
    description: "Maillot officiel Paris Saint-Germain",
    brand: "Nike",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 5,
    name: "Maillot Real Madrid Extérieur",
    category: "tenues",
    price: 85.99,
    image: "/realMadrid.jpg",
    rating: 4.8,
    description: "Maillot officiel Real Madrid",
    brand: "Adidas",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 6,
    name: "Short d'entraînement Nike",
    category: "tenues",
    price: 39.99,
    image: "/shortNikepg.jpg",
    rating: 4.5,
    description: "Short technique respirant",
    brand: "Nike",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },

  // Ballons
  {
    id: 7,
    name: "Ballon Champions League",
    category: "ballons",
    price: 149.99,
    image: "/ballonCh.jpg",
    rating: 5.0,
    description: "Ballon officiel UEFA Champions League",
    brand: "Adidas"
  },
  {
    id: 8,
    name: "Nike Premier League Strike",
    category: "ballons",
    price: 29.99,
    image: "/PLBallon.jpg",
    rating: 4.4,
    description: "Ballon d'entraînement professionnel",
    brand: "Nike"
  },
  {
    id: 9,
    name: "Ballon Ligue 1 Officiel",
    category: "ballons",
    price: 79.99,
    image: "/L1Ballon.jpg",
    rating: 4.6,
    description: "Ballon officiel du championnat français",
    brand: "Uhlsport"
  }
];