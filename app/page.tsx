import { MarketOverview } from "@/components/market/market-overview";
import { TrendingChart } from "@/components/charts/trending-chart";
import { MarketSections } from "@/components/market/market-sections";
import { TopCoins } from "@/components/market/top-coins";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <MarketOverview />
        </div>
        <div className="md:col-span-2">
          <TrendingChart />
        </div>
      </div>
      
      <div className="mt-8">
        <MarketSections />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Cryptocurrencies</h2>
        <TopCoins />
      </div>
    </div>
  );
}