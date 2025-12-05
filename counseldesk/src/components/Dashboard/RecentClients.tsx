import React from 'react';
import { Client } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './RecentClients.scss';

interface RecentClientsProps {
    clients: Client[];
}

const statusColors: Record<string, string> = {
    Active: 'status-active',
    Pending: 'status-pending',
    Closed: 'status-closed',
    'On Hold': 'status-warning',
};

export const RecentClients: React.FC<RecentClientsProps> = ({ clients }) => {
    const recentClients = clients
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .slice(0, 5);

    const getInitials = (name: string) =>
        name
            .split(' ')
            .map((n) => n[0])
            .join('');

    return (
        <div className="recent-clients">
            <div className="recent-clients-header">
                <h3 className="recent-clients-title">Recent Clients</h3>
                <Link to="/clients" className="recent-clients-link">
                    View all <ArrowRight className="arrow-icon" />
                </Link>
            </div>
            <div className="recent-clients-list">
                {recentClients.map((client) => (
                    <div key={client.id} className="client-item">
                        <div className="client-info">
                            <div className="avatar">
                                <span className="avatar-fallback">{getInitials(client.name)}</span>
                            </div>
                            <div className="client-text">
                                <p className="client-name">{client.name}</p>
                                <p className="client-meta">
                                    {client.caseType} • Updated {formatDistanceToNow(client.updatedAt, { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                        <span className={`client-status ${statusColors[client.status]}`}>
                            {client.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
