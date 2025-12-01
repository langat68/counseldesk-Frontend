import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    subtitle?: string;
    color?: 'blue' | 'green' | 'orange' | 'purple' | 'red';
    onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    value,
    icon,
    trend,
    subtitle,
    color = 'blue',
    onClick
}) => {
    return (
        <div
            className={`dashboard-card ${color} ${onClick ? 'clickable' : ''}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            <div className="card-header">
                <div className="card-title-section">
                    <h3 className="card-title">{title}</h3>
                    {subtitle && <p className="card-subtitle">{subtitle}</p>}
                </div>
                <div className={`card-icon-wrapper ${color}`}>
                    {icon}
                </div>
            </div>

            <div className="card-body">
                <div className="card-value">{value}</div>

                {trend && (
                    <div className={`card-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
                        {trend.isPositive ? (
                            <TrendingUp size={16} />
                        ) : (
                            <TrendingDown size={16} />
                        )}
                        <span className="trend-value">
                            {trend.isPositive ? '+' : ''}{trend.value}%
                        </span>
                        <span className="trend-label">vs last month</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardCard;