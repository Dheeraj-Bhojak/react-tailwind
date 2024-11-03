import React from "react";
import { useParams } from "react-router-dom";

interface CampaignStep {
  id: number;
  title: string;
  status: string;
  route: string;
}

interface CampaignWizardProps {
  steps: CampaignStep[];
}

const CampaignStepper: React.FC<CampaignWizardProps> = ({ steps }) => {
  const page = useParams();
  return (
    <>
      <div className="step-progressbar-wrap ">
        <ul className="arrow-step-wrap">
          {steps.map((step, indx) => {
            return (
              <li
                className={`step px-4 border-l-[#0076cb] sm:text-[8px] inline-block ${
                  step.status === "completed"
                    ? "bg-green-200"
                    : "bg-[#e5e5e5e5]"
                } ${`${page["*"]}` === step.route ? "bg-ri-orange" : ""}`}
                key={indx}>
                <i
                  className={`fa-solid fa-circle-check px-[1px] ${
                    step.status === "completed"
                      ? "text-green-600"
                      : "text-[#777777]"
                  }`}></i>
                {step.title}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default CampaignStepper;
