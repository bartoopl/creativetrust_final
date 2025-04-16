"use client";

import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface MetricsData {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  averageCpc: number;
  cost: number;
  conversions: number;
  conversionValue: number;
  costPerConversion: number;
  roas: number;
}

interface CampaignMetricsChartProps {
  data: MetricsData[];
}

const CampaignMetricsChart: React.FC<CampaignMetricsChartProps> = ({ data }) => {
  const [metricType, setMetricType] = useState<string>('clicks');
  
  // Format date for display
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('pl-PL')
  }));
  
  // Default metrics to show in chart
  const metrics = [
    { key: 'clicks', name: 'Kliknięcia', color: '#2563eb' },
    { key: 'impressions', name: 'Wyświetlenia', color: '#10b981' },
    { key: 'conversions', name: 'Konwersje', color: '#f59e0b' },
    { key: 'cost', name: 'Koszt (PLN)', color: '#ef4444' },
    { key: 'ctr', name: 'CTR (%)', color: '#8b5cf6' },
    { key: 'roas', name: 'ROAS', color: '#ec4899' },
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Statystyki kampanii</h3>
        <div className="flex">
          <select
            value={metricType}
            onChange={(e) => setMetricType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            {metrics.map((metric) => (
              <option key={metric.key} value={metric.key}>
                {metric.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="formattedDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            {metricType === 'clicks' && (
              <Line type="monotone" dataKey="clicks" name="Kliknięcia" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 8 }} />
            )}
            {metricType === 'impressions' && (
              <Line type="monotone" dataKey="impressions" name="Wyświetlenia" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
            )}
            {metricType === 'conversions' && (
              <Line type="monotone" dataKey="conversions" name="Konwersje" stroke="#f59e0b" strokeWidth={2} activeDot={{ r: 8 }} />
            )}
            {metricType === 'cost' && (
              <Line type="monotone" dataKey="cost" name="Koszt (PLN)" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 8 }} />
            )}
            {metricType === 'ctr' && (
              <Line type="monotone" dataKey="ctr" name="CTR (%)" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
            )}
            {metricType === 'roas' && (
              <Line type="monotone" dataKey="roas" name="ROAS" stroke="#ec4899" strokeWidth={2} activeDot={{ r: 8 }} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {formattedData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Brak danych do wyświetlenia w wybranym okresie.
        </div>
      )}
    </div>
  );
};

export default CampaignMetricsChart;