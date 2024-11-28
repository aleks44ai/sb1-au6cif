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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

export function TrendingChart() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoinHistory("bitcoin", "7");
      
      const labels = data.prices.map((price) => 
        new Date(price[0]).toLocaleDateString()
      );
      
      setChartData({
        labels,
        datasets: [
          {
            label: "Bitcoin Price (USD)",
            data: data.prices.map((price) => price[1]),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  if (!chartData) return <div>Loading chart...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bitcoin Price Trend</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}