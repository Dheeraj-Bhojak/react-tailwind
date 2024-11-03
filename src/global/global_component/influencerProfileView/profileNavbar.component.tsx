import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [selectedLink, setSelectedLink] = useState<number>(0);

  const navLinks = [
    { text: "Overview", href: "#overview" },
    { text: "Audience", href: "#audience" },
    { text: "Content", href: "#content" },
    { text: "Engagement", href: "#engagement" },
    { text: "Brand Collab", href: "#brand-collab" },
    { text: "Industry Comparison", href: "#industry-comparison" },
  ];

  const handleLinkClick = (index: number) => {
    setSelectedLink(index);
  };
  return (
    <div className="desktop-only ">
      <div className="flex flex-col w-full px-4 border-t-2 border-gray-400 overflow-x-scroll">
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
                  className={selectedLink === index ? "bold-text p-3" : "p-3"}>
                  {link.text}
                </span>
              </a>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
