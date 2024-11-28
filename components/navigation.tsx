"use client";

import Link from "next/link";
import { Moon, Sun, Menu, Globe2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { SearchCommand } from "@/components/search/search-command";
import { DataSourceSwitch } from "@/components/data-source-switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const { setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="font-bold text-2xl mr-6">
          CoinHub DYOR
        </Link>
        
        <div className="flex items-center space-x-4 flex-1">
          <Link href="/">
            <Button variant="ghost" className="text-sm">
              {t('dashboard')}
            </Button>
          </Link>
          <Link href="/trends">
            <Button variant="ghost" className="text-sm">
              {t('trends')}
            </Button>
          </Link>
          <Link href="/gainers">
            <Button variant="ghost" className="text-sm">
              {t('topGainers')}
            </Button>
          </Link>
          <Link href="/losers">
            <Button variant="ghost" className="text-sm">
              {t('topLosers')}
            </Button>
          </Link>
          <Link href="/analysis">
            <Button variant="ghost" className="text-sm">
              {t('analysis')}
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <SearchCommand />
          
          <DataSourceSwitch />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe2 className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ru')}>
                Русский
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                {t('theme.light')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                {t('theme.dark')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                {t('theme.system')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}