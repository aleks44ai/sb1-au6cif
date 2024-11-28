"use client";

import { useEffect, useState } from "react";
import { getTopCoins, type Coin } from "@/lib/api/coingecko";
import { Card } from "@/components/ui/card";
import { TrendingChart } from "@/components/trending-chart";
import { MarketSections } from "@/components/market-sections";

export function TrendsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Market Trends</h1>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <TrendingChart />
        </Card>

        <MarketSections />
      </div>
    </div>
  );
}