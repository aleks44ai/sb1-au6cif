"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, DollarSign } from "lucide-react";
import { StatsCard } from "@/components/market/stats-card";
import { formatCurrency } from "@/lib/utils/format";

export function MarketOverview() {
  const [marketData, setMarketData] = useState({
    totalMarketCap: 0,
    volume24h: 0,
    btcDominance: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMarketData({
        totalMarketCap: 2.1e12,
        volume24h: 98.5e9,
        btcDominance: 47.2,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-4">
      <StatsCard
        title="Total Market Cap"
        value={formatCurrency(marketData.totalMarketCap, { notation: 'compact' })}
        icon={DollarSign}
        isLoading={isLoading}
      />
      <StatsCard
        title="24h Volume"
        value={formatCurrency(marketData.volume24h, { notation: 'compact' })}
        icon={ArrowUp}
        isLoading={isLoading}
      />
      <StatsCard
        title="BTC Dominance"
        value={`${marketData.btcDominance.toFixed(1)}%`}
        icon={ArrowDown}
        isLoading={isLoading}
      />
    </div>
  );
}