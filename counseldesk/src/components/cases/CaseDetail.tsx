import React, { useState } from 'react';
import { Case } from './CaseList';
import CaseNotes from './CaseNotes';
import CaseNoteEditor from './CaseNoteEditor';
import './Cases.scss';

interface CaseDetailProps {
    caseData: Case;
    onClose: () => void;
    onAddNote: (caseId: string, note: string) => void;
    onStatusChange: (caseId: string, status: 'Open' | 'Closed') => void;
}

const CaseDetail: React.FC<CaseDetailProps> = ({
    caseData,
    onClose,
    onAddNote,
    onStatusChange
}) => {
    const [isAddingNote, setIsAddingNote] = useState(false);

    const handleAddNote = (note: string) => {
        onAddNote(caseData.id, note);
        setIsAddingNote(false);
    };

    const handleStatusToggle = () => {
        const newStatus = caseData.status === 'Open' ? 'Closed' : 'Open';
        onStatusChange(caseData.id, newStatus);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="case-detail-modal" onClick={(e) => e.stopPropagation()}>
                <div className="case-detail-header">
                    <div>
                        <h2>{caseData.title}</h2>
                        <p className="case-client-name">Client: {caseData.clientName}</p>
                    </div>
                    <div className="header-actions">
                        <button
                            onClick={handleStatusToggle}
                            className={`btn-status ${caseData.status.toLowerCase()}`}
                        >
                            {caseData.status}
                        </button>
                        <button onClick={onClose} className="close-btn">&times;</button>
                    </div>
                </div>

                <div className="case-detail-content">
                    <div className="case-info-section">
                        <h3>Case Information</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Case ID</label>
                                <p>{caseData.id}</p>
                            </div>
                            <div className="info-item">
                                <label>Status</label>
                                <p>
                                    <span className={`status-badge status-${caseData.status.toLowerCase()}`}>
                                        {caseData.status}
                                    </span>
                                </p>
                            </div>
                            <div className="info-item">
                                <label>Created Date</label>
                                <p>{caseData.createdDate}</p>
                            </div>
                            <div className="info-item">
                                <label>Client Name</label>
                                <p>{caseData.clientName}</p>
                            </div>
                        </div>
                        <div className="case-description">
                            <label>Description</label>
                            <p>{caseData.description}</p>
                        </div>
                    </div>

                    <div className="case-notes-section">
                        <div className="notes-header">
                            <h3>Case Notes ({caseData.notes.length})</h3>
                            <button
                                onClick={() => setIsAddingNote(true)}
                                className="btn-primary"
                            >
                                + Add Note
                            </button>
                        </div>

                        {isAddingNote && (
                            <CaseNoteEditor
                                onSave={handleAddNote}
                                onCancel={() => setIsAddingNote(false)}
                            />
                        )}

                        <CaseNotes notes={caseData.notes} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseDetail;