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

const LineChart: React.FC<ChartProps> = ({ data }) => {
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
            // responsive: true,
            // maintainAspectRatio: false,
            //   scales: {
            //     y: {
            //       ticks: {
            //         stepSize: 1000000,
            //         callback: (value: string | number) =>
            //           typeof value === "number"
            //             ? value === 0
            //               ? "0"
            //               : value / 1000000 + "M"
            //             : value,
            //       } as TickOptions, // Asserting type for ticks as TickOptions
            //     },
            //   },
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
    <div className="h-64 xl:h-60 2xl:h-72">
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
