"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import CampaignMetricsChart from '@/components/ads/CampaignMetricsChart';
import CampaignSummary from '@/components/ads/CampaignSummary';

export default function CampaignDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;
  
  const [campaign, setCampaign] = useState<any>(null);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pl-PL');
  };

  // Fetch campaign data
  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        setLoading(true);
        
        // Get campaign details from campaigns endpoint
        const campaignsResponse = await fetch('/api/client/ads/campaigns');
        
        if (!campaignsResponse.ok) {
          throw new Error('Nie udało się pobrać danych kampanii');
        }
        
        const campaignsData = await campaignsResponse.json();
        const foundCampaign = campaignsData.campaigns.find((c: any) => c._id === campaignId);
        
        if (!foundCampaign) {
          throw new Error('Nie znaleziono kampanii');
        }
        
        setCampaign(foundCampaign);
        
        // Fetch metrics for this campaign
        const metricsResponse = await fetch(
          `/api/client/ads/metrics?campaignId=${campaignId}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
        );
        
        if (!metricsResponse.ok) {
          throw new Error('Nie udało się pobrać danych statystycznych');
        }
        
        const metricsData = await metricsResponse.json();
        setMetrics(metricsData.metrics || []);
      } catch (err) {
        console.error('Error fetching campaign data:', err);
        setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchCampaignData();
    }
  }, [campaignId, dateRange]);

  // Handle date range change
  const handleDateRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const days = parseInt(event.target.value);
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(new Date().setDate(new Date().getDate() - days)).toISOString().split('T')[0];
    
    setDateRange({ startDate, endDate });
  };

  // Status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">Aktywna</span>;
      case 'paused':
        return <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">Wstrzymana</span>;
      case 'ended':
        return <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800">Zakończona</span>;
      default:
        return <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">{status}</span>;
    }
  };

  // Platform badge
  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'google_ads':
        return <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">Google Ads</span>;
      case 'meta_ads':
        return <span className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800">Meta Ads</span>;
      default:
        return <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800">{platform}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
        <p className="font-medium">Wystąpił błąd</p>
        <p>{error || 'Nie znaleziono kampanii'}</p>
        <div className="mt-4">
          <Link
            href="/panel-klienta/kampanie"
            className="text-sm text-red-800 hover:text-red-900 underline"
          >
            Wróć do listy kampanii
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="mr-4 text-gray-500 hover:text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-3xl font-medium">{campaign.name}</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">Platforma</div>
              <div>{getPlatformBadge(campaign.platform)}</div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">Status</div>
              <div>{getStatusBadge(campaign.status)}</div>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">Data rozpoczęcia</div>
              <div className="text-lg">{formatDate(campaign.startDate)}</div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">Data zakończenia</div>
              <div className="text-lg">{formatDate(campaign.endDate)}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Ostatnia aktualizacja danych: {formatDate(campaign.lastUpdated)}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Statystyki kampanii</h2>
        
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

      <CampaignSummary metrics={metrics} />
      
      <CampaignMetricsChart data={metrics} />
    </div>
  );
}