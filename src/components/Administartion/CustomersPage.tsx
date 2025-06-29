// src/components/Administration/CustomersPage.tsx
import React, { useEffect, useState } from 'react';
import { Table, Alert, Pagination, Card, Image, Button } from 'react-bootstrap';
import { supabase } from '../../config/supabaseClient';

interface User {
  id: number;
  civility?: string;
  name: string;
  firstName: string;
  email: string;
  phone?: string;
  dob?: string;
  receiveNewsletter?: boolean;
  photo?: string;
  address?: string;
}

const CustomersPage: React.FC = () => {
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase.from('clients').select('*');
        if (error) throw error;
        setClients(data || []);
      } catch (err: any) {
        console.error('Erreur lors du chargement des clients:', err.message);
        setError('Erreur lors du chargement des clients.');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = clients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="customers-page">
      <h2 className="mb-4">Customer Management</h2>

      <Card className="shadow-sm">
        <Card.Body>
          <h4 className="card-title mb-3">Registered Customers List</h4>
          {loading ? (
            <Alert variant="info" className="text-center mt-3">
              Chargement des clients en cours...
            </Alert>
          ) : error ? (
            <Alert variant="danger" className="text-center mt-3">
              {error}
            </Alert>
          ) : clients.length === 0 ? (
            <Alert variant="info" className="text-center mt-3">
              No registered customers to display.
            </Alert>
          ) : (
            <>
              <div className="table-responsive">
                <Table bordered hover className="mt-3">
                  <thead className="table-light">
                    <tr>
                      <th>Email</th>
                      <th>Newsletter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentClients.map(client => (
                      <tr key={client.id}>
                        
                         
                        <td>{client.email}</td>
                        <td>{client.receiveNewsletter ? 'Yes' : 'No'}</td>
                       
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Pagination className="justify-content-center mt-3">
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
              </Pagination>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CustomersPage;
