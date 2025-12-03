import React from 'react';
import type { Client } from './ClientList';
import './Clients.scss';

interface ClientCardProps {
    client: Client;
    onEdit: (client: Client) => void;
    onDelete: (id: string) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onEdit, onDelete }) => {
    return (
        <tr className="client-card">
            <td className="client-name">{client.name}</td>
            <td className="client-email">{client.email}</td>
            <td className="client-phone">{client.phone}</td>
            <td className="client-actions">
                <button
                    onClick={() => onEdit(client)}
                    className="btn-edit"
                    title="Edit client"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(client.id)}
                    className="btn-delete"
                    title="Delete client"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ClientCard;