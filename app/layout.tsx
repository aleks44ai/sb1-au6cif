import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Navigation } from '@/components/navigation';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'CoinHub DYOR - Cryptocurrency Research Platform',
  description: 'Advanced cryptocurrency analytics and research platform - Do Your Own Research',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}