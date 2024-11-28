"use client";

import { useEffect, useState } from "react";
import { getTopCoins, type Coin } from "@/lib/api/coingecko";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSkeleton } from "@/components/market/loading-skeleton";
import { formatCurrency, formatPercentage } from "@/lib/utils/format";

export function LosersPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      const data = await getTopCoins(100);
      const losers = [...data]
        .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
        .slice(0, 20);
      setCoins(losers);
      setIsLoading(false);
    };

    fetchCoins();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Top Losers</h1>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coins.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-6 h-6 mr-2"
                    />
                    {coin.name}
                  </div>
                </TableCell>
                <TableCell>{formatCurrency(coin.current_price)}</TableCell>
                <TableCell className="text-red-600">
                  {formatPercentage(coin.price_change_percentage_24h)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(coin.market_cap, { notation: 'compact' })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}