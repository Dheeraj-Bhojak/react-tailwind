import React, { useState, useEffect } from "react";

interface ToastProps {
  message: string | string[];
  theme: string;
}

const ToastNotification: React.FC<ToastProps> = ({ message, theme }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const animateProgress = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / 5000, 1); // 5000 milliseconds is the total duration
      setProgress(progress * 100);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame((newTimestamp) =>
          animateProgress(newTimestamp, startTime)
        );
      } else {
        setIsVisible(false);
      }
    };

    if (theme) {
      const startTime = performance.now();
      animationFrameId = requestAnimationFrame((timestamp) =>
        animateProgress(timestamp, startTime)
      );
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [theme]);

  const getThemeStyles = () => {
    switch (theme) {
      case "success":
        return {
          background: "bg-[#8ac926]",
          icon: "fa-check-circle fa-beat",
          title: "Success",
        };
      case "error":
        return {
          background: "bg-[#ff595e]",
          icon: "fa-times-circle fa-beat",
          title: "Error",
        };
      case "warning":
        return {
          background: "bg-[#ffca3a]",
          icon: "fa-solid fa-triangle-exclamation fa-beat",
          title: "Warning",
        };
      default:
        return { background: "", icon: "", title: "" };
    }
  };

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          className={`justify-between lg:w-1/4 md:w-1/2 w-10/12 fixed bottom-5 z-40 right-5 py-2 px-4 rounded-md shadow-md ${
            getThemeStyles().background
          }`}>
          <div className="relative">
            <button
              className="absolute -top-2 right-0 m-2 focus:outline-none"
              onClick={handleCloseClick}>
              <i className="fa-regular fa-x text-black"></i>
            </button>
            <div className="flex">
              <i
                className={`fa-solid ${
                  getThemeStyles().icon
                } text-black mt-1 mr-2 h-4`}></i>
              <div className="text-black font-bold mr-2">
                {getThemeStyles().title}
              </div>
            </div>
            <hr className="border-gray-800 " />
            <p className="min-h-[4rem]">{message}</p>
          </div>

          <div className="w-full mt-1">
            <div
              className="h-0.5 bg-white rounded"
              style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToastNotification;
