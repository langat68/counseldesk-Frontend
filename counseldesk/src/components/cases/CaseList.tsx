import React, { useState, useEffect } from 'react';
import './Cases.scss';

// Type Definitions
interface Case {
    id: string;
    caseNumber: string;
    title: string;
    clientId: string;
    clientName: string;
    caseType: string;
    status: 'open' | 'pending' | 'closed' | 'on-hold';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    assignedLawyer: string;
    openedDate: string;
    nextHearing?: string;
    description: string;
}

interface CaseListProps {
    onSelectCase?: (caseId: string) => void;
}

const CaseList: React.FC<CaseListProps> = ({ onSelectCase }) => {
    const [cases, setCases] = useState<Case[]>([]);
    const [filteredCases, setFilteredCases] = useState<Case[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status'>('date');

    // Load cases from localStorage
    useEffect(() => {
        const storedCases = localStorage.getItem('cases');
        if (storedCases) {
            const parsedCases = JSON.parse(storedCases);
            setCases(parsedCases);
            setFilteredCases(parsedCases);
        }
    }, []);

    // Filter and search logic
    useEffect(() => {
        let filtered = [...cases];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(c =>
                c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.clientName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(c => c.status === statusFilter);
        }

        // Priority filter
        if (priorityFilter !== 'all') {
            filtered = filtered.filter(c => c.priority === priorityFilter);
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.openedDate).getTime() - new Date(a.openedDate).getTime();
            } else if (sortBy === 'priority') {
                const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            } else {
                return a.status.localeCompare(b.status);
            }
        });

        setFilteredCases(filtered);
    }, [cases, searchTerm, statusFilter, priorityFilter, sortBy]);

    const getStatusColor = (status: string) => {
        const colors = {
            open: 'status-open',
            pending: 'status-pending',
            closed: 'status-closed',
            'on-hold': 'status-on-hold'
        };
        return colors[status as keyof typeof colors] || '';
    };

    const getPriorityColor = (priority: string) => {
        const colors = {
            urgent: 'priority-urgent',
            high: 'priority-high',
            medium: 'priority-medium',
            low: 'priority-low'
        };
        return colors[priority as keyof typeof colors] || '';
    };

    return (
        <div className="case-list-container">
            <div className="case-list-header">
                <h2>Cases</h2>
                <button className="btn-primary">+ New Case</button>
            </div>

            {/* Search and Filters */}
            <div className="case-filters">
                <input
                    type="text"
                    placeholder="Search cases, clients, or case numbers..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="filter-group">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Status</option>
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="on-hold">On Hold</option>
                        <option value="closed">Closed</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Priority</option>
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'status')}
                        className="filter-select"
                    >
                        <option value="date">Sort by Date</option>
                        <option value="priority">Sort by Priority</option>
                        <option value="status">Sort by Status</option>
                    </select>
                </div>
            </div>

            {/* Case Count */}
            <div className="case-count">
                Showing {filteredCases.length} of {cases.length} cases
            </div>

            {/* Cases List */}
            <div className="cases-grid">
                {filteredCases.length === 0 ? (
                    <div className="empty-state">
                        <p>No cases found</p>
                        <button className="btn-secondary">Create your first case</button>
                    </div>
                ) : (
                    filteredCases.map(caseItem => (
                        <div
                            key={caseItem.id}
                            className="case-card"
                            onClick={() => onSelectCase?.(caseItem.id)}
                        >
                            <div className="case-card-header">
                                <div>
                                    <h3>{caseItem.title}</h3>
                                    <span className="case-number">#{caseItem.caseNumber}</span>
                                </div>
                                <span className={`priority-badge ${getPriorityColor(caseItem.priority)}`}>
                                    {caseItem.priority}
                                </span>
                            </div>

                            <div className="case-card-body">
                                <div className="case-info">
                                    <span className="label">Client:</span>
                                    <span className="value">{caseItem.clientName}</span>
                                </div>
                                <div className="case-info">
                                    <span className="label">Type:</span>
                                    <span className="value">{caseItem.caseType}</span>
                                </div>
                                <div className="case-info">
                                    <span className="label">Lawyer:</span>
                                    <span className="value">{caseItem.assignedLawyer}</span>
                                </div>
                                <div className="case-info">
                                    <span className="label">Opened:</span>
                                    <span className="value">{new Date(caseItem.openedDate).toLocaleDateString()}</span>
                                </div>
                                {caseItem.nextHearing && (
                                    <div className="case-info">
                                        <span className="label">Next Hearing:</span>
                                        <span className="value">{new Date(caseItem.nextHearing).toLocaleDateString()}</span>
                                    </div>
                                )}
                            </div>

                            <div className="case-card-footer">
                                <span className={`status-badge ${getStatusColor(caseItem.status)}`}>
                                    {caseItem.status}
                                </span>
                                <button className="btn-link">View Details →</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CaseList;