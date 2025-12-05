import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import './CaseChart.scss';

interface CaseChartProps {
    data: {
        active: number;
        pending: number;
        closed: number;
        onHold: number;
    };
}

const COLORS = {
    Active: 'hsl(142, 76%, 36%)',
    Pending: 'hsl(38, 92%, 50%)',
    Closed: 'hsl(215, 20%, 55%)',
    'On Hold': 'hsl(199, 89%, 48%)',
};

export const CaseChart: React.FC<CaseChartProps> = ({ data }) => {
    const chartData = [
        { name: 'Active', value: data.active },
        { name: 'Pending', value: data.pending },
        { name: 'Closed', value: data.closed },
        { name: 'On Hold', value: data.onHold },
    ].filter((item) => item.value > 0);

    return (
        <div className="case-chart animate-slide-up">
            <div className="case-chart-header">
                <h3 className="case-chart-title">Cases by Status</h3>
            </div>
            <div className="case-chart-content">
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="value"
                                strokeWidth={0}
                            >
                                {chartData.map((entry) => (
                                    <Cell
                                        key={entry.name}
                                        fill={COLORS[entry.name as keyof typeof COLORS]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(222, 47%, 14%)',
                                    border: '1px solid hsl(217, 33%, 22%)',
                                    borderRadius: '8px',
                                    color: 'hsl(210, 40%, 98%)',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Custom Legend */}
                <div className="case-chart-legend">
                    {chartData.map((entry) => (
                        <div key={entry.name} className="legend-item">
                            <span
                                className="legend-color"
                                style={{ backgroundColor: COLORS[entry.name as keyof typeof COLORS] }}
                            />
                            <span className="legend-text">{entry.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
