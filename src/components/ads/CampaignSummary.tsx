"use client";

import React from 'react';

interface CampaignMetrics {
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

interface CampaignSummaryProps {
  metrics: CampaignMetrics[];
}

const CampaignSummary: React.FC<CampaignSummaryProps> = ({ metrics }) => {
  // Jeśli brak metryk, zwróć pusty komunikat
  if (!metrics || metrics.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4">Podsumowanie kampanii</h3>
        <div className="py-4 text-center text-gray-500">
          Brak danych do wyświetlenia. Statystyki są aktualizowane codziennie.
        </div>
      </div>
    );
  }

  // Obliczanie sumarycznych wartości z wszystkich dni
  const summary = metrics.reduce(
    (acc, curr) => {
      return {
        impressions: acc.impressions + (curr.impressions || 0),
        clicks: acc.clicks + (curr.clicks || 0),
        cost: acc.cost + (curr.cost || 0),
        conversions: acc.conversions + (curr.conversions || 0),
        conversionValue: acc.conversionValue + (curr.conversionValue || 0),
      };
    },
    {
      impressions: 0,
      clicks: 0,
      cost: 0,
      conversions: 0,
      conversionValue: 0,
    }
  );

  // Obliczanie średnich wartości
  const avgCtr = summary.impressions > 0 ? (summary.clicks / summary.impressions) * 100 : 0;
  const avgCpc = summary.clicks > 0 ? summary.cost / summary.clicks : 0;
  const costPerConversion = summary.conversions > 0 ? summary.cost / summary.conversions : 0;
  const roas = summary.cost > 0 ? summary.conversionValue / summary.cost : 0;

  // Formatowanie liczb
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pl-PL').format(Math.round(num * 100) / 100);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium mb-6">Podsumowanie kampanii</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Wyświetlenia</div>
          <div className="text-2xl font-medium">{formatNumber(summary.impressions)}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Kliknięcia</div>
          <div className="text-2xl font-medium">{formatNumber(summary.clicks)}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">CTR</div>
          <div className="text-2xl font-medium">{formatNumber(avgCtr)}%</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Średni CPC</div>
          <div className="text-2xl font-medium">{formatNumber(avgCpc)} zł</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Koszt całkowity</div>
          <div className="text-2xl font-medium">{formatNumber(summary.cost)} zł</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Konwersje</div>
          <div className="text-2xl font-medium">{formatNumber(summary.conversions)}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Koszt/konwersja</div>
          <div className="text-2xl font-medium">{formatNumber(costPerConversion)} zł</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">ROAS</div>
          <div className="text-2xl font-medium">{formatNumber(roas)}x</div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSummary;