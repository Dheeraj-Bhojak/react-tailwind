import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

interface IndustryGaugeProps {
  value: number;
}

const IndustryGauge: React.FC<IndustryGaugeProps> = ({ value }) => {
  return (
    <div className="w-60 h-40 md:w-64 md:h-40">
      <ReactSpeedometer
        fluidWidth={true}
        width={500} // set desired width
        height={300}
        ringWidth={20}
        minValue={0}
        maxValue={100}
        value={value} // set your desired value here
        needleColor="red" // customize needle color
      />
    </div>
  );
};

export default IndustryGauge;
