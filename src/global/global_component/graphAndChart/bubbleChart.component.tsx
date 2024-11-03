import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

interface ChartProps {
  bubbleData: { x: number; y: number; r: number }[]; // Array containing the bubble data
}

const BubbleChart: React.FC<ChartProps> = ({ bubbleData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"bubble"> | null>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Destroy previous instance if exists
        }
        chartInstance.current = new Chart(ctx, {
          type: "bubble",
          data: {
            datasets: [
              {
                label: "Bubble Chart",
                data: bubbleData,
                backgroundColor: "#FDC100",
                borderColor: "transparent",
              },
            ],
          },
          options: {
            scales: {
              xAxis: {
                type: "linear",
                position: "bottom",
              },
              yAxis: {
                type: "linear",
                position: "left",
                ticks: {
                  suggestedMin: 0, // Adjust the minimum value to fit your data
                  suggestedMax: 100, // Adjust the maximum value to fit your data
                  maxTicksLimit: 10, // Adjust the maximum number of ticks
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context: any) {
                    const label = context.dataset.label || "";
                    if (context.parsed.y !== null) {
                      return (
                        label +
                        ": (Comments: " +
                        context.parsed.x +
                        ", Like: " +
                        context.parsed.y +
                        ")"
                      );
                    }
                    return null;
                  },
                },
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          },
        } as ChartConfiguration<"bubble">);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [bubbleData]);

  return (
    <div className="h-72 md:h-60 2xl:h-72">
      <canvas ref={chartRef} />
    </div>
  ); // Decrease the height here
};

export default BubbleChart;
