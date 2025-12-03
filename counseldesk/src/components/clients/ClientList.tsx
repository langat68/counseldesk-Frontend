import React, { useState } from 'react';
import ClientCard from './ClientCard';
import ClientForm from './ClientForm';
import './Clients.scss';

export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
}

const ClientList: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([
        { id: '1', name: 'John Anderson', email: 'john.anderson@email.com', phone: '(555) 123-4567' },
        { id: '2', name: 'Sarah Mitchell', email: 'sarah.mitchell@email.com', phone: '(555) 234-5678' },
        { id: '3', name: 'Michael Chen', email: 'michael.chen@email.com', phone: '(555) 345-6789' },
        { id: '4', name: 'Emily Rodriguez', email: 'emily.rodriguez@email.com', phone: '(555) 456-7890' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    );

    const handleAddClient = (clientData: Omit<Client, 'id'>) => {
        const newClient: Client = {
            ...clientData,
            id: Date.now().toString()
        };
        setClients([...clients, newClient]);
        setIsModalOpen(false);
    };

    const handleEditClient = (clientData: Omit<Client, 'id'>) => {
        if (editingClient) {
            setClients(clients.map(client =>
                client.id === editingClient.id ? { ...clientData, id: editingClient.id } : client
            ));
            setEditingClient(null);
            setIsModalOpen(false);
        }
    };

    const handleDeleteClient = (id: string) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            setClients(clients.filter(client => client.id !== id));
        }
    };

    const openEditModal = (client: Client) => {
        setEditingClient(client);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setEditingClient(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingClient(null);
    };

    return (
        <div className="client-list-container">
            <div className="client-list-header">
                <h1>Client Management</h1>
                <div className="header-actions">
                    <input
                        type="text"
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button onClick={openAddModal} className="btn-primary">
                        + Add Client
                    </button>
                </div>
            </div>

            <div className="client-table-wrapper">
                <table className="client-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="no-results">
                                    {searchTerm ? 'No clients found matching your search.' : 'No clients yet. Add your first client!'}
                                </td>
                            </tr>
                        ) : (
                            filteredClients.map(client => (
                                <ClientCard
                                    key={client.id}
                                    client={client}
                                    onEdit={openEditModal}
                                    onDelete={handleDeleteClient}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <ClientForm
                    client={editingClient}
                    onSubmit={editingClient ? handleEditClient : handleAddClient}
                    onCancel={closeModal}
                />
            )}
        </div>
    );
};

export default ClientList;