import { CoinDetailsPage } from "@/components/pages/coin-details-page";
import { getTopCoins } from "@/lib/api/coingecko";

export async function generateStaticParams() {
  const coins = await getTopCoins(100);
  return coins.map((coin) => ({
    id: coin.id,
  }));
}

export default function CoinPage({ params }: { params: { id: string } }) {
  return <CoinDetailsPage coinId={params.id} />;
}