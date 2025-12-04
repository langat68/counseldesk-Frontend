import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [activeRoute, setActiveRoute] = useState('/dashboard');

    return (
        <div className="layout">
            <Sidebar activeRoute={activeRoute} onNavigate={setActiveRoute} />

            <div className="layout-main">
                <Topbar />
                <div className="layout-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
