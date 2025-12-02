import React, { useState } from 'react';
import { FileText, Download, Trash2, Search, Filter, Eye } from 'lucide-react';
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

interface DocumentListProps {
    onPreview: (document: Document) => void;
    onDelete: (id: number) => void;
}

// Mock Data
const mockDocuments: Document[] = [
    { id: 1, name: 'Contract_Agreement.pdf', type: 'PDF', size: '2.4 MB', client: 'Johnson & Associates', case: 'Corporate Merger', date: '2024-11-15', tags: ['contract', 'corporate'] },
    { id: 2, name: 'Legal_Brief_2024.pdf', type: 'PDF', size: '1.8 MB', client: 'Smith Legal Group', case: 'Patent Dispute', date: '2024-11-10', tags: ['brief', 'litigation'] },
    { id: 3, name: 'NDA_Template.docx', type: 'DOCX', size: '156 KB', client: 'Tech Innovations Inc', case: 'Trade Secrets', date: '2024-11-08', tags: ['nda', 'template'] },
    { id: 4, name: 'Court_Filing_Notice.pdf', type: 'PDF', size: '890 KB', client: 'Martinez Family Trust', case: 'Estate Planning', date: '2024-11-05', tags: ['court', 'filing'] },
    { id: 5, name: 'Deposition_Transcript.pdf', type: 'PDF', size: '3.2 MB', client: 'Riverside Construction', case: 'Labor Dispute', date: '2024-10-28', tags: ['deposition', 'transcript'] },
    { id: 6, name: 'Settlement_Proposal.pdf', type: 'PDF', size: '1.1 MB', client: 'Global Retail Corp', case: 'Contract Breach', date: '2024-10-22', tags: ['settlement', 'proposal'] },
    { id: 7, name: 'Evidence_Photos.zip', type: 'ZIP', size: '15.7 MB', client: 'Anderson vs. State', case: 'Criminal Defense', date: '2024-10-18', tags: ['evidence', 'photos'] },
    { id: 8, name: 'Witness_Statement.pdf', type: 'PDF', size: '645 KB', client: 'Liberty Insurance Co', case: 'Personal Injury', date: '2024-10-12', tags: ['witness', 'statement'] },
];

const DocumentList: React.FC<DocumentListProps> = ({ onPreview, onDelete }) => {
    const [documents, setDocuments] = useState<Document[]>(mockDocuments);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || doc.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const handleDelete = (id: number) => {
        setDocuments(documents.filter(doc => doc.id !== id));
        onDelete(id);
    };

    return (
        <div className="document-list">
            <div className="document-list-header">
                <h2>Documents</h2>
                <div className="document-controls">
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-box">
                        <Filter size={18} />
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <option value="all">All Types</option>
                            <option value="PDF">PDF</option>
                            <option value="DOCX">DOCX</option>
                            <option value="ZIP">ZIP</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="document-table-container">
                <table className="document-table">
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Type</th>
                            <th>Client</th>
                            <th>Case</th>
                            <th>Size</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDocuments.map(doc => (
                            <tr key={doc.id}>
                                <td>
                                    <div className="doc-name">
                                        <FileText size={18} />
                                        <span>{doc.name}</span>
                                    </div>
                                </td>
                                <td><span className="doc-type">{doc.type}</span></td>
                                <td>{doc.client}</td>
                                <td>{doc.case}</td>
                                <td>{doc.size}</td>
                                <td>{doc.date}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => onPreview(doc)} className="btn-icon" title="Preview">
                                            <Eye size={16} />
                                        </button>
                                        <button className="btn-icon" title="Download">
                                            <Download size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(doc.id)} className="btn-icon btn-danger" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredDocuments.length === 0 && (
                <div className="no-documents">
                    <FileText size={48} />
                    <p>No documents found</p>
                </div>
            )}
        </div>
    );
};

export default DocumentList;