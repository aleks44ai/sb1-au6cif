"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getTopCoins, type Coin } from "@/lib/api/coingecko";
import { useLanguage } from "@/lib/language-context";
import { CoinList } from "@/components/market/coin-list";

export function MarketSections() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchCoins = async () => {
      const data = await getTopCoins(100);
      setCoins(data);
      setIsLoading(false);
    };

    fetchCoins();
  }, []);

  const topGainers = [...coins]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5);

  const topLosers = [...coins]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>{t('topGainers')}</CardTitle>
        </CardHeader>
        <CardContent>
          <CoinList coins={topGainers} isLoading={isLoading} />
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle>{t('topLosers')}</CardTitle>
        </CardHeader>
        <CardContent>
          <CoinList coins={topLosers} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}