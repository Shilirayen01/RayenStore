// src/components/Administration/CustomersPage.tsx
import React from 'react';
import { Table, Alert, Pagination, Card, Image, Button } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';

// Définis tes types User/Client
interface User {
    id: number;
    civility?: string;
    name: string; // Nom de famille
    firstName: string;
    email: string;
    phone?: string;
    dob?: string; // Date de naissance
    receiveNewsletter?: boolean;
    photo?: string; // URL de la photo de profil
    address?: string;
}

interface AdminOutletContext {
    clients: User[]; // Assume que tes clients sont passés via le contexte
}

const CustomersPage: React.FC = () => {
    const { clients } = useOutletContext<AdminOutletContext>();

    // Données de démonstration si 'clients' n'est pas encore rempli
    const demoClients: User[] = clients.length > 0 ? clients : [
        { id: 1, civility: 'Mr.', name: 'Doe', firstName: 'John', email: 'john.doe@example.com', phone: '123-456-7890', dob: '1990-01-15', receiveNewsletter: true, photo: 'https://i.pravatar.cc/50?img=1' },
        { id: 2, civility: 'Ms.', name: 'Smith', firstName: 'Jane', email: 'jane.smith@example.com', phone: '987-654-3210', dob: '1985-03-22', receiveNewsletter: false, photo: 'https://i.pravatar.cc/50?img=2' },
        { id: 3, civility: 'Mr.', name: 'Brown', firstName: 'Peter', email: 'peter.brown@example.com', phone: '555-123-4567', dob: '1992-07-01', receiveNewsletter: true, photo: 'https://i.pravatar.cc/50?img=3' },
        { id: 4, civility: 'Ms.', name: 'Garcia', firstName: 'Maria', email: 'maria.g@example.com', phone: '111-222-3333', dob: '1988-11-10', receiveNewsletter: true, photo: 'https://i.pravatar.cc/50?img=4' },
    ];


    // Pagination
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentClients = demoClients.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(demoClients.length / itemsPerPage);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="customers-page">
            <h2 className="mb-4">Customer Management</h2>

            <Card className="shadow-sm">
                <Card.Body>
                    <h4 className="card-title mb-3">Registered Customers List</h4>
                    {demoClients.length === 0 ? (
                        <Alert variant="info" className="text-center mt-3">
                            No registered customers to display.
                        </Alert>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <Table bordered hover className="mt-3">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Photo</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Newsletter</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentClients.map(client => (
                                            <tr key={client.id}>
                                                <td>
                                                    <Image
                                                        src={client.photo || "https://i.pravatar.cc/50?img=5"}
                                                        alt={client.firstName}
                                                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                                                    />
                                                </td>
                                                <td>{client.firstName}</td>
                                                <td>{client.name}</td>
                                                <td>{client.email}</td>
                                                <td>{client.phone || '-'}</td>
                                                <td>{client.receiveNewsletter ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <Button variant="primary" size="sm" className="me-2">
                                                        <i className="bi bi-person-lines-fill"></i> Details
                                                    </Button>
                                                    {/* Ajoute d'autres actions ici */}
                                                </td>
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