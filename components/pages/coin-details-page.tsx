"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CoinDetailChart } from "@/components/coin-detail-chart";
import { Button } from "@/components/ui/button";
import { type Coin } from "@/lib/api/coingecko";
import { formatCurrency, formatPercentage } from "@/lib/utils/format";

const timeRanges = [
  { label: "1H", value: "0.0417" },
  { label: "1D", value: "1" },
  { label: "1W", value: "7" },
  { label: "1M", value: "30" },
  { label: "1Y", value: "365" },
  { label: "ALL", value: "max" },
];

interface CoinDetailsPageProps {
  coinId: string;
}

export function CoinDetailsPage({ coinId }: CoinDetailsPageProps) {
  const [selectedRange, setSelectedRange] = useState("7");
  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
        );
        const data = await response.json();
        setCoin({
          id: data.id,
          name: data.name,
          symbol: data.symbol,
          image: data.image.small,
          current_price: data.market_data.current_price.usd,
          market_cap: data.market_data.market_cap.usd,
          price_change_percentage_24h: data.market_data.price_change_percentage_24h,
        });
      } catch (error) {
        console.error("Error fetching coin details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [coinId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!coin) {
    return <div>Coin not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <img src={coin.image} alt={coin.name} className="w-12 h-12" />
        <div>
          <h1 className="text-3xl font-bold">{coin.name}</h1>
          <p className="text-muted-foreground">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(coin.current_price)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>24h Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              coin.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-600"
            }`}>
              {formatPercentage(coin.price_change_percentage_24h)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(coin.market_cap, { notation: 'compact' })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price Chart</CardTitle>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={selectedRange === range.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <CoinDetailChart coinId={coinId} days={selectedRange} />
        </CardContent>
      </Card>
    </div>
  );
}