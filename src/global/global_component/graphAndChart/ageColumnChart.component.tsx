import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

interface ChartProps {
  horizontalAgeData: number[]; // Array containing the percentage of users in each age group
}

const AgeColumnChart: React.FC<ChartProps> = ({ horizontalAgeData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"bar"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Destroy previous instance if exists
        }
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "<13",
              "13-17",
              "18-24",
              "25-34",
              "35-44",
              "45-54",
              "55-64",
              "65+",
            ],
            datasets: [
              {
                label: "Age Distribution",
                data: horizontalAgeData,
                backgroundColor: ["#4267B2"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: "y",
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10,
                  },
                  callback: (value) => `${value}`,
                  stepSize: 20,
                },
              },
              y: {
                ticks: {
                  stepSize: 1,
                  font: {
                    size: 10,
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            layout: {
              padding: {
                top: 20, // Adjust top padding to increase the height
              },
            },
          },
        } as ChartConfiguration<"bar">);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [horizontalAgeData]);

  return (
    <div className="h-72 md:h-60 2xl:h-72">
      <canvas ref={chartRef} />
    </div>
  );
};

export default AgeColumnChart;
