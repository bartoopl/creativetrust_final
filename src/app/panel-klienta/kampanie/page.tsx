"use client";

import React, { useEffect, useState } from 'react';
import CampaignsList from '@/components/ads/CampaignsList';
import CampaignSummary from '@/components/ads/CampaignSummary';
import CampaignMetricsChart from '@/components/ads/CampaignMetricsChart';

interface Campaign {
  _id: string;
  name: string;
  platform: 'google_ads' | 'meta_ads';
  status: 'active' | 'paused' | 'ended';
  startDate: string;
  endDate?: string;
  budget?: number;
  currency: string;
  lastUpdated: string;
  metrics?: any;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allMetrics, setAllMetrics] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  // Fetch campaigns data
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/client/ads/campaigns');
        
        if (!response.ok) {
          throw new Error('Nie udało się pobrać danych kampanii');
        }
        
        const data = await response.json();
        setCampaigns(data.campaigns || []);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Fetch metrics for all campaigns
  useEffect(() => {
    const fetchAllMetrics = async () => {
      if (campaigns.length === 0) return;
      
      try {
        const response = await fetch(
          `/api/client/ads/metrics?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
        );
        
        if (!response.ok) {
          throw new Error('Nie udało się pobrać danych statystycznych');
        }
        
        const data = await response.json();
        
        // Process metrics data
        let combinedMetrics: any[] = [];
        if (data.metrics && Array.isArray(data.metrics)) {
          data.metrics.forEach((campaign: any) => {
            if (campaign.metrics && Array.isArray(campaign.metrics)) {
              combinedMetrics = combinedMetrics.concat(campaign.metrics);
            }
          });
        }
        
        // Combine metrics by date across all campaigns
        const metricsByDate: {[key: string]: any} = {};
        combinedMetrics.forEach(metric => {
          if (!metricsByDate[metric.date]) {
            metricsByDate[metric.date] = {
              date: metric.date,
              impressions: 0,
              clicks: 0,
              ctr: 0,
              averageCpc: 0,
              cost: 0,
              conversions: 0,
              conversionValue: 0,
              costPerConversion: 0,
              roas: 0,
            };
          }
          
          // Add metrics
          metricsByDate[metric.date].impressions += metric.impressions || 0;
          metricsByDate[metric.date].clicks += metric.clicks || 0;
          metricsByDate[metric.date].cost += metric.cost || 0;
          metricsByDate[metric.date].conversions += metric.conversions || 0;
          metricsByDate[metric.date].conversionValue += metric.conversionValue || 0;
        });
        
        // Calculate derived metrics
        Object.keys(metricsByDate).forEach(date => {
          const m = metricsByDate[date];
          m.ctr = m.impressions > 0 ? (m.clicks / m.impressions) * 100 : 0;
          m.averageCpc = m.clicks > 0 ? m.cost / m.clicks : 0;
          m.costPerConversion = m.conversions > 0 ? m.cost / m.conversions : 0;
          m.roas = m.cost > 0 ? m.conversionValue / m.cost : 0;
        });
        
        // Convert to array and sort by date
        const metricsArray = Object.values(metricsByDate).sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        setAllMetrics(metricsArray);
      } catch (err) {
        console.error('Error fetching metrics:', err);
      }
    };

    fetchAllMetrics();
  }, [campaigns, dateRange]);

  // Handle date range change
  const handleDateRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const days = parseInt(event.target.value);
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(new Date().setDate(new Date().getDate() - days)).toISOString().split('T')[0];
    
    setDateRange({ startDate, endDate });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
        <p className="font-medium">Wystąpił błąd</p>
        <p>{error}</p>
        <button
          className="mt-2 text-sm underline"
          onClick={() => window.location.reload()}
        >
          Odśwież stronę
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium">Kampanie reklamowe</h1>
        
        <div>
          <select
            value={dateRange.endDate.split('T')[0] === new Date().toISOString().split('T')[0] ? 
              (new Date(dateRange.endDate).getTime() - new Date(dateRange.startDate).getTime()) / (1000 * 60 * 60 * 24) : 
              'custom'
            }
            onChange={handleDateRangeChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="7">Ostatnie 7 dni</option>
            <option value="30">Ostatnie 30 dni</option>
            <option value="90">Ostatnie 90 dni</option>
          </select>
        </div>
      </div>

      {campaigns.length > 0 ? (
        <>
          <CampaignSummary metrics={allMetrics} />
          
          <CampaignMetricsChart data={allMetrics} />
          
          <CampaignsList campaigns={campaigns} />
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="py-8 text-center">
            <h3 className="text-lg font-medium mb-2">Brak kampanii reklamowych</h3>
            <p className="text-gray-500">
              Nie masz jeszcze przypisanych kampanii reklamowych.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Skontaktuj się z nami, aby dowiedzieć się więcej o naszych usługach marketingowych.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}