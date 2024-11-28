"use client";

import { Database, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataSource } from "@/lib/data-source-context";

export function DataSourceSwitch() {
  const { dataSource, setDataSource } = useDataSource();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {dataSource === 'coingecko' ? (
            <Database className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <LineChart className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setDataSource('coingecko')}>
          CoinGecko
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDataSource('coinmarketcap')}>
          CoinMarketCap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}