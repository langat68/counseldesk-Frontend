import React, { useState, useEffect } from 'react';
import './Calendar.scss';

interface Appointment {
    id: string;
    title: string;
    clientId: string;
    clientName: string;
    start: Date;
    end: Date;
    location: 'office' | 'court' | 'virtual' | 'other';
    notes: string;
    type: 'client-meeting';
}

interface Client {
    id: string;
    name: string;
}

// Mock clients data
const mockClients: Client[] = [
    { id: 'c1', name: 'John Smith' },
    { id: 'c2', name: 'Sarah Johnson' },
    { id: 'c3', name: 'Robert Davis' },
    { id: 'c4', name: 'Emily Wilson' },
    { id: 'c5', name: 'Michael Brown' },
    { id: 'c6', name: 'Jennifer Martinez' },
    { id: 'c7', name: 'David Anderson' },
    { id: 'c8', name: 'Lisa Taylor' }
];

interface AppointmentFormProps {
    appointment?: Appointment | null;
    initialSlot?: { start: Date; end: Date } | null;
    onSubmit: (appointment: Omit<Appointment, 'id'>) => void;
    onDelete?: (id: string) => void;
    onClose: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
    appointment,
    initialSlot,
    onSubmit,
    onDelete,
    onClose
}) => {
    const [formData, setFormData] = useState({
        title: '',
        clientId: '',
        clientName: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        location: 'office' as 'office' | 'court' | 'virtual' | 'other',
        notes: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [clients] = useState<Client[]>(mockClients);

    // Initialize form with existing appointment or selected slot
    useEffect(() => {
        if (appointment) {
            const start = new Date(appointment.start);
            const end = new Date(appointment.end);

            setFormData({
                title: appointment.title,
                clientId: appointment.clientId,
                clientName: appointment.clientName,
                startDate: formatDateForInput(start),
                startTime: formatTimeForInput(start),
                endDate: formatDateForInput(end),
                endTime: formatTimeForInput(end),
                location: appointment.location,
                notes: appointment.notes
            });
        } else if (initialSlot) {
            const start = new Date(initialSlot.start);
            const end = new Date(initialSlot.end);

            setFormData({
                title: '',
                clientId: '',
                clientName: '',
                startDate: formatDateForInput(start),
                startTime: formatTimeForInput(start),
                endDate: formatDateForInput(end),
                endTime: formatTimeForInput(end),
                location: 'office',
                notes: ''
            });
        }
    }, [appointment, initialSlot]);

    const formatDateForInput = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatTimeForInput = (date: Date): string => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const clientId = e.target.value;
        const selectedClient = clients.find((c) => c.id === clientId);

        setFormData((prev) => ({
            ...prev,
            clientId,
            clientName: selectedClient?.name || ''
        }));

        if (errors.clientId) {
            setErrors((prev) => ({ ...prev, clientId: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.clientId) {
            newErrors.clientId = 'Please select a client';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (!formData.startTime) {
            newErrors.startTime = 'Start time is required';
        }

        if (!formData.endDate) {
            newErrors.endDate = 'End date is required';
        }

        if (!formData.endTime) {
            newErrors.endTime = 'End time is required';
        }

        // Validate end time is after start time
        if (formData.startDate && formData.startTime && formData.endDate && formData.endTime) {
            const start = new Date(`${formData.startDate}T${formData.startTime}`);
            const end = new Date(`${formData.endDate}T${formData.endTime}`);

            if (end <= start) {
                newErrors.endTime = 'End time must be after start time';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const start = new Date(`${formData.startDate}T${formData.startTime}`);
        const end = new Date(`${formData.endDate}T${formData.endTime}`);

        const appointmentData: Omit<Appointment, 'id'> = {
            title: formData.title.trim(),
            clientId: formData.clientId,
            clientName: formData.clientName,
            start,
            end,
            location: formData.location,
            notes: formData.notes.trim(),
            type: 'client-meeting'
        };

        onSubmit(appointmentData);
    };

    const handleDeleteClick = () => {
        if (appointment && onDelete) {
            if (window.confirm('Are you sure you want to delete this appointment?')) {
                onDelete(appointment.id);
            }
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content appointment-form" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{appointment ? 'Edit Appointment' : 'New Appointment'}</h2>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">
                            Title <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={errors.title ? 'error' : ''}
                            placeholder="e.g., Initial Consultation - Smith Case"
                        />
                        {errors.title && <span className="error-message">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="clientId">
                            Client <span className="required">*</span>
                        </label>
                        <select
                            id="clientId"
                            name="clientId"
                            value={formData.clientId}
                            onChange={handleClientChange}
                            className={errors.clientId ? 'error' : ''}
                        >
                            <option value="">Select a client...</option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.name}
                                </option>
                            ))}
                        </select>
                        {errors.clientId && <span className="error-message">{errors.clientId}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="startDate">
                                Start Date <span className="required">*</span>
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className={errors.startDate ? 'error' : ''}
                            />
                            {errors.startDate && <span className="error-message">{errors.startDate}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="startTime">
                                Start Time <span className="required">*</span>
                            </label>
                            <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleInputChange}
                                className={errors.startTime ? 'error' : ''}
                            />
                            {errors.startTime && <span className="error-message">{errors.startTime}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="endDate">
                                End Date <span className="required">*</span>
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                className={errors.endDate ? 'error' : ''}
                            />
                            {errors.endDate && <span className="error-message">{errors.endDate}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="endTime">
                                End Time <span className="required">*</span>
                            </label>
                            <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleInputChange}
                                className={errors.endTime ? 'error' : ''}
                            />
                            {errors.endTime && <span className="error-message">{errors.endTime}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <select
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                        >
                            <option value="office">Office</option>
                            <option value="court">Court</option>
                            <option value="virtual">Virtual</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Add any additional notes or details..."
                        />
                    </div>

                    <div className="form-actions">
                        <div>
                            {appointment && onDelete && (
                                <button
                                    type="button"
                                    className="btn-danger"
                                    onClick={handleDeleteClick}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                        <div className="form-actions-right">
                            <button type="button" className="btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary">
                                {appointment ? 'Update' : 'Create'} Appointment
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AppointmentForm;