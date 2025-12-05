import React from 'react';
import { LucideIcon } from 'lucide-react';
import './StatCard.scss';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
    iconClassName?: string;
    delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    trend,
    className = '',
    iconClassName = '',
    delay = 0,
}) => {
    return (
        <div
            className={`stat-card ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="stat-card-content">
                <div className="stat-card-main">
                    <div className="stat-card-info">
                        <p className="stat-card-title">{title}</p>
                        <p className="stat-card-value">{value}</p>
                        {trend && (
                            <p className={`stat-card-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
                                {trend.isPositive ? '+' : ''}
                                {trend.value}% from last month
                            </p>
                        )}
                    </div>
                    <div className={`stat-card-icon ${iconClassName}`}>
                        <Icon className={`icon ${iconClassName ? 'inherit-color' : 'default-color'}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};
