"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/language-context";
import { DataSourceProvider } from "@/lib/data-source-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        <DataSourceProvider>
          {children}
        </DataSourceProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}