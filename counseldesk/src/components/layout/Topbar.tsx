import React, { useState } from 'react';
import {
    Search,
    Bell,
    Moon,
    Sun,
    User,
    LogOut,
    Settings,
    HelpCircle
} from 'lucide-react';

interface TopbarProps {
    onThemeToggle?: () => void;
    isDarkMode?: boolean;
    userName?: string;
    userRole?: string;
}

const Topbar: React.FC<TopbarProps> = ({
    onThemeToggle,
    isDarkMode = false,
    userName = 'fidel kipsang',
    userRole = 'Attorney'
}) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const notifications = [
        { id: 1, text: 'Court hearing tomorrow at 10:00 AM', time: '2 hours ago', unread: true },
        { id: 2, text: 'New document uploaded by Sarah Johnson', time: '5 hours ago', unread: true },
        { id: 3, text: 'Case #4521 status updated to "In Progress"', time: '1 day ago', unread: false }
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    const handleSearch = () => {
        console.log('Searching for:', searchQuery);
        // Implement search functionality
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <header className="topbar">
            <div className="topbar-content">
                {/* Search Bar */}
                <div className="search-container">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search clients, cases, documents..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        aria-label="Search"
                    />
                    <kbd className="search-kbd">Ctrl K</kbd>
                </div>

                {/* Right Section */}
                <div className="topbar-actions">
                    {/* Theme Toggle */}
                    <button
                        className="action-btn"
                        onClick={onThemeToggle}
                        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Help */}
                    <button className="action-btn" aria-label="Help">
                        <HelpCircle size={20} />
                    </button>

                    {/* Notifications */}
                    <div className="notification-container">
                        <button
                            className="action-btn notification-btn"
                            onClick={() => setShowNotifications(!showNotifications)}
                            aria-label={`Notifications (${unreadCount} unread)`}
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className="notification-badge">{unreadCount}</span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="notification-dropdown">
                                <div className="dropdown-header">
                                    <h3>Notifications</h3>
                                    <button className="mark-read-btn">Mark all as read</button>
                                </div>
                                <ul className="notification-list">
                                    {notifications.map((notif) => (
                                        <li
                                            key={notif.id}
                                            className={`notification-item ${notif.unread ? 'unread' : ''}`}
                                        >
                                            <p className="notification-text">{notif.text}</p>
                                            <span className="notification-time">{notif.time}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="dropdown-footer">
                                    <button className="view-all-btn">View all notifications</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Menu */}
                    <div className="user-menu-container">
                        <button
                            className="user-menu-btn"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            aria-label="User menu"
                            aria-expanded={showUserMenu}
                        >
                            <div className="user-avatar-top">JD</div>
                            <div className="user-info-top">
                                <span className="user-name-top">{userName}</span>
                                <span className="user-role-top">{userRole}</span>
                            </div>
                        </button>

                        {showUserMenu && (
                            <div className="user-dropdown">
                                <div className="user-dropdown-header">
                                    <div className="user-avatar-large">JD</div>
                                    <div>
                                        <p className="user-dropdown-name">{userName}</p>
                                        <p className="user-dropdown-email">counseldeck@lawfirm.com</p>
                                    </div>
                                </div>
                                <ul className="user-menu-list">
                                    <li>
                                        <button className="user-menu-item">
                                            <User size={16} />
                                            <span>Profile</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="user-menu-item">
                                            <Settings size={16} />
                                            <span>Settings</span>
                                        </button>
                                    </li>
                                    <li className="divider" />
                                    <li>
                                        <button className="user-menu-item logout">
                                            <LogOut size={16} />
                                            <span>Log out</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;