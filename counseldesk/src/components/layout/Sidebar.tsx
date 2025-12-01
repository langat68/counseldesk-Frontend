import React, { useState } from 'react';
import {
    Home,
    Users,
    Briefcase,
    FileText,
    Calendar,
    BarChart3,
    Settings,
    ChevronLeft,
    Scale
} from 'lucide-react';

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    path: string;
    badge?: number;
}

interface SidebarProps {
    activeRoute?: string;
    onNavigate?: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeRoute = '/dashboard', onNavigate }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navItems: NavItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
        { id: 'clients', label: 'Clients', icon: <Users size={20} />, path: '/clients', badge: 12 },
        { id: 'cases', label: 'Cases', icon: <Briefcase size={20} />, path: '/cases', badge: 8 },
        { id: 'documents', label: 'Documents', icon: <FileText size={20} />, path: '/documents' },
        { id: 'calendar', label: 'Calendar', icon: <Calendar size={20} />, path: '/calendar', badge: 3 },
        { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, path: '/analytics' },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/settings' }
    ];

    const handleNavClick = (path: string) => {
        if (onNavigate) {
            onNavigate(path);
        }
    };

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="logo-section">
                    <Scale size={32} className="logo-icon" />
                    {!isCollapsed && <span className="logo-text">CounselDesk</span>}
                </div>
                <button
                    className="collapse-btn"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <ChevronLeft size={20} className={isCollapsed ? 'rotated' : ''} />
                </button>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                className={`nav-item ${activeRoute === item.path ? 'active' : ''}`}
                                onClick={() => handleNavClick(item.path)}
                                aria-label={item.label}
                                aria-current={activeRoute === item.path ? 'page' : undefined}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {!isCollapsed && (
                                    <>
                                        <span className="nav-label">{item.label}</span>
                                        {item.badge && (
                                            <span className="nav-badge">{item.badge}</span>
                                        )}
                                    </>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                {!isCollapsed && (
                    <div className="user-info">
                        <div className="user-avatar">JD</div>
                        <div className="user-details">
                            <p className="user-name">John Doe</p>
                            <p className="user-role">Attorney</p>
                        </div>
                    </div>
                )}
                {isCollapsed && (
                    <div className="user-avatar-small">JD</div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;