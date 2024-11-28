"use client";

import { useState } from "react";
import { type Coin } from "@/lib/api/coingecko";
import { formatPercentage } from "@/lib/utils/format";
import { LoadingSkeleton } from "./loading-skeleton";
import { Button } from "@/components/ui/button";
import { CoinChartDialog } from "@/components/coin-chart-dialog";

interface CoinListProps {
  coins: Coin[];
  isLoading?: boolean;
}

export function CoinList({ coins, isLoading }: CoinListProps) {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      {coins.map((coin) => (
        <div key={coin.id} className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="flex items-center p-0 hover:bg-transparent"
            onClick={() => setSelectedCoin(coin)}
          >
            <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
            <span className="font-medium">{coin.name}</span>
          </Button>
          <span
            className={
              coin.price_change_percentage_24h > 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }
          >
            {formatPercentage(coin.price_change_percentage_24h)}
          </span>
        </div>
      ))}

      {selectedCoin && (
        <CoinChartDialog
          coin={selectedCoin}
          open={!!selectedCoin}
          onOpenChange={(open) => !open && setSelectedCoin(null)}
        />
      )}
    </div>
  );
}