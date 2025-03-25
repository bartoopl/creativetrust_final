"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AutomationChart = () => {
    const data = [
        {
            name: 'Konwersja',
            standardowy: 4.2,
            zAutomatyzowany: 7.8,
        },
        {
            name: 'Średnia wartość zamówienia',
            standardowy: 3.7,
            zAutomatyzowany: 6.3,
        },
        {
            name: 'Retencja klientów',
            standardowy: 3.5,
            zAutomatyzowany: 7.2,
        },
        {
            name: 'Cross-selling',
            standardowy: 2.8,
            zAutomatyzowany: 5.9,
        },
        {
            name: 'Zadowolenie klientów',
            standardowy: 3.9,
            zAutomatyzowany: 6.7,
        },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-medium mb-6 text-center">
                Porównanie wyników kampanii marketingowych
            </h3>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip
                            formatter={(value) => [`${value}/10`, '']}
                            labelFormatter={(name) => `${name} (w skali 0-10)`}
                        />
                        <Legend />
                        <Bar name="Tradycyjny marketing" dataKey="standardowy" fill="#f3f4f6" radius={[4, 4, 0, 0]} />
                        <Bar name="Z Marketing Automation" dataKey="zAutomatyzowany" fill="#000000" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-6 text-sm text-gray-500 text-center">
                Źródło: Badania własne na podstawie danych z 125 firm korzystających z Sales Manago
            </div>
        </div>
    );
};

export default AutomationChart;