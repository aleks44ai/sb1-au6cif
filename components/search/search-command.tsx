"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { type Coin } from "@/lib/api/coingecko";
import { type CMCCoin } from "@/lib/api/coinmarketcap";
import { searchCoins } from "@/lib/api/coingecko";
import { searchCoinsCMC } from "@/lib/api/coinmarketcap";
import { useLanguage } from "@/lib/language-context";
import { useDataSource } from "@/lib/data-source-context";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/format";
import { DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<Coin | CMCCoin>>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();
  const { dataSource } = useDataSource();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const search = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        if (dataSource === 'coingecko') {
          const coins = await searchCoins(query);
          setResults(coins);
        } else {
          const coins = await searchCoinsCMC(query);
          setResults(coins);
        }
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(search, 300);
    return () => clearTimeout(debounce);
  }, [query, dataSource]);

  const handleSelect = (coin: Coin | CMCCoin) => {
    setOpen(false);
    const coinId = 'quote' in coin ? coin.id : coin.id;
    router.push(`/coins/${coinId}`);
  };

  const getPrice = (coin: Coin | CMCCoin) => {
    if ('quote' in coin) {
      return coin.quote.USD.price;
    }
    return coin.current_price;
  };

  const getSymbol = (coin: Coin | CMCCoin) => {
    return coin.symbol.toUpperCase();
  };

  const getImage = (coin: Coin | CMCCoin) => {
    if ('quote' in coin) {
      return `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`;
    }
    return coin.image;
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-64 justify-start"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>{t('searchCoins')} (⌘ K)</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle>
          <VisuallyHidden>{t('searchCoins')}</VisuallyHidden>
        </DialogTitle>
        <CommandInput
          placeholder={t('searchCoins')}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            {loading ? 'Searching...' : t('noResults')}
          </CommandEmpty>
          {results.length > 0 && (
            <CommandGroup heading={t('searchResults')}>
              {results.map((coin) => (
                <CommandItem
                  key={'quote' in coin ? coin.id : coin.id}
                  value={coin.name}
                  onSelect={() => handleSelect(coin)}
                  className="cursor-pointer"
                >
                  <img
                    src={getImage(coin)}
                    alt=""
                    className="w-4 h-4 mr-2"
                  />
                  <span>{coin.name}</span>
                  <span className="ml-2 text-muted-foreground">
                    {getSymbol(coin)}
                  </span>
                  <span className="ml-auto text-muted-foreground">
                    {formatCurrency(getPrice(coin))}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}