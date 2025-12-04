import React from 'react';
import { FileText, Download, X } from 'lucide-react';
import './Documents.scss';

interface Document {
    id: number;
    name: string;
    type: string;
    size: string;
    client: string;
    case: string;
    date: string;
    tags: string[];
}

interface DocumentPreviewProps {
    document: Document | null;
    onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document, onClose }) => {
    if (!document) return null;

    const handleDownload = () => {
        console.log('Downloading document:', document.name);
        // Simulate download - in production, this would trigger actual file download
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content document-preview" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Document Preview</h3>
                    <button onClick={onClose} className="close-button">
                        <X size={24} />
                    </button>
                </div>

                <div className="preview-body">
                    <div className="preview-placeholder">
                        <FileText size={64} />
                        <p>Preview not available in demo mode</p>
                        <span>{document.name}</span>
                    </div>

                    <div className="document-metadata">
                        <h4>Document Information</h4>
                        <div className="metadata-grid">
                            <div className="metadata-item">
                                <label>File Name:</label>
                                <span>{document.name}</span>
                            </div>
                            <div className="metadata-item">
                                <label>Type:</label>
                                <span>{document.type}</span>
                            </div>
                            <div className="metadata-item">
                                <label>Size:</label>
                                <span>{document.size}</span>
                            </div>
                            <div className="metadata-item">
                                <label>Client:</label>
                                <span>{document.client}</span>
                            </div>
                            <div className="metadata-item">
                                <label>Case:</label>
                                <span>{document.case}</span>
                            </div>
                            <div className="metadata-item">
                                <label>Upload Date:</label>
                                <span>{document.date}</span>
                            </div>
                            <div className="metadata-item">
                                <label>Tags:</label>
                                <span>{document.tags.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>Close</button>
                    <button className="btn-primary" onClick={handleDownload}>
                        <Download size={18} />
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentPreview;