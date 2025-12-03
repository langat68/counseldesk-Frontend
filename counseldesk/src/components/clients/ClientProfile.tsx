import React, { useState } from 'react';
import type { Client } from './ClientList';
import './Clients.scss';

interface ClientProfileProps {
    client: Client;
    onClose: () => void;
    onEdit: (client: Client) => void;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ client, onClose, onEdit }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'cases' | 'documents'>('overview');

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="client-profile-modal" onClick={(e) => e.stopPropagation()}>
                <div className="profile-header">
                    <div className="profile-header-content">
                        <div className="profile-avatar">
                            {client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div className="profile-info">
                            <h2>{client.name}</h2>
                            <p className="profile-email">{client.email}</p>
                            <p className="profile-phone">{client.phone}</p>
                        </div>
                    </div>
                    <div className="profile-header-actions">
                        <button onClick={() => onEdit(client)} className="btn-edit">
                            Edit Client
                        </button>
                        <button onClick={onClose} className="close-btn">&times;</button>
                    </div>
                </div>

                <div className="profile-tabs">
                    <button
                        className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'cases' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cases')}
                    >
                        Cases
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
                        onClick={() => setActiveTab('documents')}
                    >
                        Documents
                    </button>
                </div>

                <div className="profile-content">
                    {activeTab === 'overview' && (
                        <div className="overview-tab">
                            <div className="info-section">
                                <h3>Contact Information</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Full Name</label>
                                        <p>{client.name}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Email Address</label>
                                        <p>{client.email}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Phone Number</label>
                                        <p>{client.phone}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Client ID</label>
                                        <p>{client.id}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="info-section">
                                <h3>Quick Stats</h3>
                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <div className="stat-value">0</div>
                                        <div className="stat-label">Active Cases</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-value">0</div>
                                        <div className="stat-label">Documents</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-value">0</div>
                                        <div className="stat-label">Appointments</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'cases' && (
                        <div className="cases-tab">
                            <div className="empty-state">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <polyline points="14 2 14 8 20 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <h3>No Cases Yet</h3>
                                <p>This client doesn't have any cases assigned yet.</p>
                                <button className="btn-primary">Create New Case</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="documents-tab">
                            <div className="empty-state">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <polyline points="13 2 13 9 20 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <h3>No Documents Yet</h3>
                                <p>No documents have been uploaded for this client.</p>
                                <button className="btn-primary">Upload Document</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;