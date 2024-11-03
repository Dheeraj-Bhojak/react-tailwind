// TooltipComponent.tsx

import React from "react";
import { Info } from "react-feather";

interface TooltipComponentProps {
  tooltipId: string;
  tooltipText: string;
  tooltipMessage: string;
}

const TooltipComponent: React.FC<TooltipComponentProps> = ({
  tooltipId,
  tooltipMessage,
  tooltipText,
}) => {
  const showTooltip = () => {
    const tooltipElement = document.getElementById(tooltipId);
    if (tooltipElement) tooltipElement.classList.remove("hidden");
  };

  const hideTooltip = () => {
    const tooltipElement = document.getElementById(tooltipId);
    if (tooltipElement) tooltipElement.classList.add("hidden");
  };

  return (
    <div
      tabIndex={0}
      role="link"
      aria-label={`tooltip ${tooltipId}`}
      className="focus:outline-none focus:ring-gray-300  rounded-full focus:ring-offset-2   relative mt-20 md:mt-0 cursor-pointer"
      onMouseOver={showTooltip}
      onFocus={showTooltip}
      onMouseOut={hideTooltip}>
      <div className="ml-2 mt-1 text-gray-400 ">
        <p>{tooltipText}</p>
      </div>
      <div
        id={tooltipId}
        role="tooltip"
        className="z-20 -mt-7 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow bg-white p-2 rounded hidden">
        {/* <svg
          className="absolute left-0 -ml-2 bottom-0 top-0 h-full"
          width="9px"
          height="16px"
          viewBox="0 0 9 16"
          xmlns="http://www.w3.org/2000/svg">
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd">
            <g
              id="Tooltips-"
              transform="translate(-874.000000, -1029.000000)"
              fill="#FFFFFF">
              <g
                id="Group-3-Copy-16"
                transform="translate(850.000000, 975.000000)">
                <g id="Group-2" transform="translate(24.000000, 0.000000)">
                  <polygon
                    id="Triangle"
                    transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) "
                    points="4.5 57.5 12.5 66.5 -3.5 66.5"></polygon>
                </g>
              </g>
            </g>
          </g>
        </svg> */}
        <p className="text-sm font-bold text-gray-800 pb-1">{tooltipMessage}</p>
        {/* <p className="text-xs leading-4 text-gray-600 pb-3">
          Reach out to more prospects at the right moment.
        </p> */}
      </div>
    </div>
  );
};

export default TooltipComponent;
