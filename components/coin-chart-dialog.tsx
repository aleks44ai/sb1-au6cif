"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CoinDetailChart } from "@/components/coin-detail-chart";
import { type Coin } from "@/lib/api/coingecko";

interface CoinChartDialogProps {
  coin: Coin;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeRanges = [
  { label: "1H", value: "0.0417" },
  { label: "1D", value: "1" },
  { label: "1W", value: "7" },
  { label: "1M", value: "30" },
  { label: "1Y", value: "365" },
  { label: "ALL", value: "max" },
];

export function CoinChartDialog({ coin, open, onOpenChange }: CoinChartDialogProps) {
  const [selectedRange, setSelectedRange] = useState("7");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img src={coin.image} alt="" className="w-6 h-6" />
            {coin.name} Price Chart
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-2 mb-4">
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

        <CoinDetailChart coinId={coin.id} days={selectedRange} />
      </DialogContent>
    </Dialog>
  );
}