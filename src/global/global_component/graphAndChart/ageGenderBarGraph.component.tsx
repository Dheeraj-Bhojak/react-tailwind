import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface ChartProps {
  ageData: string[];
  maleData: number[];
  femaleData: number[];
  othersData: number[];
}

const AgeGenderBarGraph: React.FC<ChartProps> = ({
  ageData,
  maleData,
  femaleData,
  othersData,
}) => {
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
          type: "bar",
          data: {
            labels: ageData.map((age, index) => `${age}`),
            datasets: [
              {
                label: "Male",
                data: maleData,
                backgroundColor: "#4267B2",
                barThickness: 15, // Adjust the width of the bars for Male
              },
              {
                label: "Female",
                data: femaleData,
                backgroundColor: "#fdc100",
                barThickness: 15, // Adjust the width of the bars for Female
              },
              {
                label: "others",
                data: othersData,
                backgroundColor: "#DB6261",
                barThickness: 15, // Adjust the width of the bars for Female
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                  fontSize: 20, // Adjust the font size of x-axis labels
                } as any, // Explicitly cast ticks configuration to 'any' type
              },
              grid: {
                display: false, // Remove vertical grid lines
              },
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (
                    value: string | number,
                    index: number,
                    ticks: any[]
                  ) => {
                    if (typeof value === "number") {
                      return value.toString() + "%";
                    }
                    return value;
                  },
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [ageData, maleData, femaleData]);

  return (
    <div className="h-96 xl:h-60 2xl:h-72">
      <canvas ref={chartRef} />
    </div>
  );
};

export default AgeGenderBarGraph;
