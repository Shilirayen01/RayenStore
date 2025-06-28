// src/data/clients.ts
import { Client } from '../types';

export const clients: Client[] = [
  {
    id: 'some-uuid-1',
    name: 'Doe',
    firstName: 'John',
    dob: 1990, // Example year
    receiveNewsletter: true,
    civility: 'Mr.' // If your Client type includes civility
  },
  {
    id: 'some-uuid-2',
    name: 'Smith',
    firstName: 'Jane',
    dob: null,
    receiveNewsletter: false,
    civility: 'Ms.'
  },
  // ... more client data
];