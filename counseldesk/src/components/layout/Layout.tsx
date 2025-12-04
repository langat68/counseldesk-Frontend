import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.scss';

const Layout: React.FC = () => {
    const [activeRoute, setActiveRoute] = useState('/dashboard');

    return (
        <div className="layout">
            <Sidebar activeRoute={activeRoute} onNavigate={setActiveRoute} />

            <div className="layout-main">
                <Topbar />
                <div className="layout-content">
                    <Outlet /> {/* Nested routes will render here */}
                </div>
            </div>
        </div>
    );
};

export default Layout;
