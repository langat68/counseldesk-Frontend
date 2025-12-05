import React from 'react';
import { UserPlus, FileUp, CalendarPlus, FileText } from 'lucide-react';
import './QuickActions.scss';

interface QuickAction {
    label: string;
    icon: React.ElementType;
    onClick: () => void;
}

interface QuickActionsProps {
    onNewClient: () => void;
    onUploadDocument: () => void;
    onNewAppointment: () => void;
    onNewNote: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
    onNewClient,
    onUploadDocument,
    onNewAppointment,
    onNewNote,
}) => {
    const actions: QuickAction[] = [
        { label: 'New Client', icon: UserPlus, onClick: onNewClient },
        { label: 'Upload Document', icon: FileUp, onClick: onUploadDocument },
        { label: 'Schedule', icon: CalendarPlus, onClick: onNewAppointment },
        { label: 'Add Note', icon: FileText, onClick: onNewNote },
    ];

    return (
        <div className="quick-actions animate-slide-up">
            <div className="quick-actions-header">
                <h3 className="quick-actions-title">Quick Actions</h3>
            </div>
            <div className="quick-actions-grid">
                {actions.map((action) => (
                    <button
                        key={action.label}
                        className="quick-action-btn"
                        onClick={action.onClick}
                    >
                        <action.icon className="quick-action-icon" />
                        <span className="quick-action-label">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
