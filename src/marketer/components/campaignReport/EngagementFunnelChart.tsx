import React from "react";
import { FunnelChart } from "react-funnel-pipeline";
import "react-funnel-pipeline/dist/index.css";

interface DataItem {
  name: string;
  value: number;
}

interface EngagementFunnelChartProps {
  data: DataItem[];
}

const EngagementFunnelChart: React.FC<EngagementFunnelChartProps> = ({
  data,
}) => {
  const funnelChartStyle: React.CSSProperties = {};

  return (
    <div>
      <FunnelChart data={data} chartHeight={500} chartWidth={300} />
    </div>
  );
};

export default EngagementFunnelChart;
