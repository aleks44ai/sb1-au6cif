"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getCoinHistory } from "@/lib/api/coingecko";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CoinDetailChartProps {
  coinId: string;
  days: string;
}

export function CoinDetailChart({ coinId, days }: CoinDetailChartProps) {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoinHistory(coinId, days);
      
      const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        if (days === "0.0417") { // 1 hour
          return date.toLocaleTimeString();
        } else if (days === "1") { // 1 day
          return date.toLocaleTimeString();
        } else {
          return date.toLocaleDateString();
        }
      };
      
      setChartData({
        labels: data.prices.map((price) => formatDate(price[0])),
        datasets: [
          {
            label: "Price (USD)",
            data: data.prices.map((price) => price[1]),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    };

    fetchData();
  }, [coinId, days]);

  if (!chartData) return <div>Loading chart...</div>;

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      }}
    />
  );
}