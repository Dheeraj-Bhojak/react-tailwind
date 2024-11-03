import React, { useState } from "react";

const ReportingNavbar: React.FC = () => {
  document.addEventListener("DOMContentLoaded", function () {
    function toggleVisibility() {
      const navbar = document.getElementById("navbar");
      const campaignName = document.getElementById("campaignName");
      const container = document.getElementById("container");

      if (navbar && campaignName && container) {
        if (window.innerWidth <= 768) {
          navbar.classList.add("hidden");
          campaignName.classList.remove("hidden");
          container.classList.remove("flex");
          container.classList.add("flex-col");
        } else {
          navbar.classList.remove("hidden");
          campaignName.classList.add("hidden");
          container.classList.add("flex");
          container.classList.remove("flex-col");
        }
      }
    }

    // Initial call to set initial visibility
    toggleVisibility();

    // Event listener for screen size changes
    window.addEventListener("resize", toggleVisibility);
  });

  const [selectedLink, setSelectedLink] = useState<number>(0);

  const navLinks = [
    { text: "KPI", href: "#kpi" },
    { text: "Leaderboards", href: "#leaderboards" },
    { text: "Content", href: "#content" },
    { text: "Insights", href: "#insights" },
  ];

  const handleLinkClick = (index: number) => {
    setSelectedLink(index);
  };

  return (
    <div className="w-full items-center flex" id="container">
      <div className="w-1/2 hidden md:block" id="navbar">
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center">
            {navLinks.map((link, index) => (
              <span key={index}>
                <a
                  href={link.href}
                  className={`flex items-center text-lg 2xl:text-lg xl:text-sm font-normal xl:mx-2 2xl:mx-4 mr-28 ${
                    selectedLink === index ? "selected-link-navbar" : ""
                  }`}
                  onClick={() => handleLinkClick(index)}>
                  <span
                    className={
                      selectedLink === index ? "bold-text p-3" : "p-3"
                    }>
                    {link.text}
                  </span>
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="w-full flex justify-center md:justify-end md:w-1/2"
        id="campaignName">
        <p className="text-lg md:text-xl font-semibold">Campaign Name</p>
      </div>
    </div>
  );
};

export default ReportingNavbar;
