"use client";

import { useEffect, useState } from "react";
import { getTopCoins, type Coin } from "@/lib/api/coingecko";
import { Card } from "@/components/ui/card";
import { CoinChartDialog } from "@/components/coin-chart-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPercentage } from "@/lib/utils/format";

export function TopCoins() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      const data = await getTopCoins(20);
      setCoins(data);
      setLoading(false);
    };

    fetchCoins();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
                <Button
                  variant="ghost"
                  className="flex items-center p-0 hover:bg-transparent"
                  onClick={() => setSelectedCoin(coin)}
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 mr-2"
                  />
                  {coin.name}
                </Button>
              </TableCell>
              <TableCell>{formatCurrency(coin.current_price)}</TableCell>
              <TableCell
                className={
                  coin.price_change_percentage_24h > 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {formatPercentage(coin.price_change_percentage_24h)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(coin.market_cap, { notation: 'compact' })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedCoin && (
        <CoinChartDialog
          coin={selectedCoin}
          open={!!selectedCoin}
          onOpenChange={(open) => !open && setSelectedCoin(null)}
        />
      )}
    </Card>
  );
}