import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { DoughnutController } from "chart.js";

interface ChartProps {
  maleData: number;
  femaleData: number;
  othersData: number;
}

const GenderDoughnutChart: React.FC<ChartProps> = ({
  maleData,
  femaleData,
  othersData,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"doughnut"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Destroy previous instance if exists
        }
        chartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Male", "Female", "Others"],
            datasets: [
              {
                label: "Gender Distribution",
                data: [maleData, femaleData, othersData],
                backgroundColor: ["#4267B2", "#fdc100", "#DB6261"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                formatter: (value: string) => {
                  return value + "%";
                },
              },
              legend: {
                position: "bottom",
                labels: {
                  fontSize: 24, // Adjust the font size of the labels
                },
              },
            },
            cutout: 70, // Adjust the cutout value to make the doughnut thinner
            radius: 70,
          },
          plugins: [DoughnutController],
        } as ChartConfiguration<"doughnut">);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [maleData, femaleData, othersData]);

  return (
    <div className="xl:h-60 2xl:h-72">
      <canvas ref={chartRef} />
    </div>
  );
};

export default GenderDoughnutChart;
