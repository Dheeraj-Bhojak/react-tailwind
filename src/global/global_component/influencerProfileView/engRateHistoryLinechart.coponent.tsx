import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface ChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
}

// Define type for tick options
interface TickOptions {
  min?: number;
  max?: number;
  stepSize?: number;
  callback?: (value: string | number) => string;
}

const EngRateHistoryLineChart: React.FC<ChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Destroy previous instance if exists
        }
        chartInstance.current = new Chart(ctx, {
          type: "line", // Example chart type
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  drawOnChartArea: false,
                },
              },
              y: {
                ticks: {} as TickOptions,
              },
            },
            // responsive: true,
            // maintainAspectRatio: false,
          },
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="h-72 md:h-60 2xl:h-72">
      <canvas ref={chartRef} />
    </div>
  );
};

export default EngRateHistoryLineChart;
