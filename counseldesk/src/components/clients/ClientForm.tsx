import React, { useState, useEffect } from 'react';
import type { Client } from './ClientList';
import './Clients.scss';

interface ClientFormProps {
    client: Client | null;
    onSubmit: (clientData: Omit<Client, 'id'>) => void;
    onCancel: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (client) {
            setFormData({
                name: client.name,
                email: client.email,
                phone: client.phone
            });
        }
    }, [client]);

    const validateForm = (): boolean => {
        const newErrors = {
            name: '',
            email: '',
            phone: ''
        };

        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(formData);
            setFormData({ name: '', email: '', phone: '' });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{client ? 'Edit Client' : 'Add New Client'}</h2>
                    <button onClick={onCancel} className="close-btn">&times;</button>
                </div>

                <div className="client-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            className={errors.name ? 'input-error' : ''}
                            placeholder="Enter client's full name"
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            className={errors.email ? 'input-error' : ''}
                            placeholder="client@example.com"
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            className={errors.phone ? 'input-error' : ''}
                            placeholder="(555) 123-4567"
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="button" onClick={handleSubmit} className="btn-primary">
                            {client ? 'Update Client' : 'Add Client'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientForm;