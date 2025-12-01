import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.scss';
import AppointmentForm from './AppointmentForm';

const localizer = momentLocalizer(moment);

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

// Mock appointment data
const mockAppointments: Appointment[] = [
    {
        id: '1',
        title: 'Initial Consultation - Smith Case',
        clientId: 'c1',
        clientName: 'John Smith',
        start: new Date(2024, 11, 15, 10, 0),
        end: new Date(2024, 11, 15, 11, 0),
        location: 'office',
        notes: 'Discuss contract dispute details',
        type: 'client-meeting'
    },
    {
        id: '2',
        title: 'Court Hearing - Johnson v. ABC Corp',
        clientId: 'c2',
        clientName: 'Sarah Johnson',
        start: new Date(2024, 11, 18, 14, 0),
        end: new Date(2024, 11, 18, 16, 0),
        location: 'court',
        notes: 'Preliminary hearing at District Court',
        type: 'client-meeting'
    },
    {
        id: '3',
        title: 'Virtual Meeting - Estate Planning',
        clientId: 'c3',
        clientName: 'Robert Davis',
        start: new Date(2024, 11, 20, 9, 0),
        end: new Date(2024, 11, 20, 10, 30),
        location: 'virtual',
        notes: 'Review will and trust documents',
        type: 'client-meeting'
    }
];

const CalendarView: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
    const [view, setView] = useState<View>('month');
    const [date, setDate] = useState(new Date());
    const [showForm, setShowForm] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);

    // Handle event selection (click on existing event)
    const handleSelectEvent = useCallback((event: Appointment) => {
        setSelectedAppointment(event);
        setSelectedSlot(null);
        setShowForm(true);
    }, []);

    // Handle slot selection (click on empty calendar slot)
    const handleSelectSlot = useCallback((slotInfo: { start: Date; end: Date }) => {
        setSelectedSlot(slotInfo);
        setSelectedAppointment(null);
        setShowForm(true);
    }, []);

    // Handle drag-and-drop event reschedule
    const handleEventDrop = useCallback(
        ({ event, start, end }: { event: Appointment; start: Date; end: Date }) => {
            const updatedAppointments = appointments.map((apt) =>
                apt.id === event.id ? { ...apt, start, end } : apt
            );
            setAppointments(updatedAppointments);
            // TODO: Send update to backend API
            console.log('Event rescheduled:', event.id, start, end);
        },
        [appointments]
    );

    // Handle event resize
    const handleEventResize = useCallback(
        ({ event, start, end }: { event: Appointment; start: Date; end: Date }) => {
            const updatedAppointments = appointments.map((apt) =>
                apt.id === event.id ? { ...apt, start, end } : apt
            );
            setAppointments(updatedAppointments);
            // TODO: Send update to backend API
            console.log('Event resized:', event.id, start, end);
        },
        [appointments]
    );

    // Handle form submission (create or update)
    const handleFormSubmit = (appointmentData: Omit<Appointment, 'id'>) => {
        if (selectedAppointment) {
            // Update existing appointment
            const updatedAppointments = appointments.map((apt) =>
                apt.id === selectedAppointment.id
                    ? { ...appointmentData, id: selectedAppointment.id }
                    : apt
            );
            setAppointments(updatedAppointments);
            // TODO: Send PUT request to backend
            console.log('Appointment updated:', selectedAppointment.id);
        } else {
            // Create new appointment
            const newAppointment: Appointment = {
                ...appointmentData,
                id: `apt_${Date.now()}` // Generate temporary ID
            };
            setAppointments([...appointments, newAppointment]);
            // TODO: Send POST request to backend
            console.log('Appointment created:', newAppointment);
        }
        handleCloseForm();
    };

    // Handle appointment deletion
    const handleDelete = (id: string) => {
        const updatedAppointments = appointments.filter((apt) => apt.id !== id);
        setAppointments(updatedAppointments);
        // TODO: Send DELETE request to backend
        console.log('Appointment deleted:', id);
        handleCloseForm();
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedAppointment(null);
        setSelectedSlot(null);
    };

    // Custom event styling based on location
    const eventStyleGetter = (event: Appointment) => {
        let backgroundColor = '#3174ad';

        switch (event.location) {
            case 'office':
                backgroundColor = '#2563eb'; // Blue
                break;
            case 'court':
                backgroundColor = '#dc2626'; // Red
                break;
            case 'virtual':
                backgroundColor = '#16a34a'; // Green
                break;
            case 'other':
                backgroundColor = '#9333ea'; // Purple
                break;
        }

        return {
            style: {
                backgroundColor,
                borderRadius: '5px',
                opacity: 0.9,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h1>Calendar & Appointments</h1>
                <button
                    className="btn-primary"
                    onClick={() => {
                        setSelectedSlot({ start: new Date(), end: new Date() });
                        setSelectedAppointment(null);
                        setShowForm(true);
                    }}
                >
                    + New Appointment
                </button>
            </div>

            <div className="calendar-legend">
                <span className="legend-item">
                    <span className="legend-dot office"></span> Office
                </span>
                <span className="legend-item">
                    <span className="legend-dot court"></span> Court
                </span>
                <span className="legend-item">
                    <span className="legend-dot virtual"></span> Virtual
                </span>
                <span className="legend-item">
                    <span className="legend-dot other"></span> Other
                </span>
            </div>

            <Calendar
                localizer={localizer}
                events={appointments}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 250px)' }}
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                onEventDrop={handleEventDrop}
                onEventResize={handleEventResize}
                selectable
                resizable
                draggableAccessor={() => true}
                eventPropGetter={eventStyleGetter}
                views={['month', 'week', 'day', 'agenda']}
                popup
                step={30}
                showMultiDayTimes
            />

            {showForm && (
                <AppointmentForm
                    appointment={selectedAppointment}
                    initialSlot={selectedSlot}
                    onSubmit={handleFormSubmit}
                    onDelete={selectedAppointment ? handleDelete : undefined}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
};

export default CalendarView;
