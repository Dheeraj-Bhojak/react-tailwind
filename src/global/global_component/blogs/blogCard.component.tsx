import React, { useEffect, useState } from "react";
import blogImg from "../../../assets/img/blogImage.jpg";
import { useNavigate } from "react-router-dom";
import { blogDataInterface, categories } from "./blogsView.component";

interface BlogComponentInterface {
  blog: blogDataInterface;
}

export const categoryColors: { [key: string]: string } = {
  ALL: "#A3D8FF",
  INFLUENCER_MARKETING: "#C5FF95",
  YOUTUBE_INFLUENCER_MARKETING: "#E9C874",
  INSTAGRAM_INFLUENCER_MARKETING: "#E4405F",
  INFLUENCER_DISCOVERY: "#E9C874 ",
  INFLUENCER_MANAGEMENT: "#FFB1B1",
  MEASUREMENT_AND_ROI: "#9AC8CD",
  NEW_AT_QIKGRO: "#8B93FF",
  BRAND_STORIES: "#FFBD33",
};

const BlogComponent: React.FC<BlogComponentInterface> = ({ blog }) => {
  const bgColor = categoryColors[blog.category] || "#FF5733"; // Default color if category not found

  const handleClick = () => {
    console.log("Data");
  };

  const getDisplayCategory = (responseString: string) => {
    const reverseCategories = Object.fromEntries(
      Object.entries(categories).map(([key, value]) => [value, key])
    );
    return reverseCategories[responseString] || "Unknown Category";
  };

  return (
    <div onClick={handleClick}>
      <img src={blogImg} alt="" className="w-[100vw] h-auto  rounded-md" />
      <p className="whitespace-break-spaces font-medium mt-2 text-lg select-none">
        {blog.title}
      </p>
      <div
        className={`inline-block py-2 px-3 rounded-md mt-3 select-none`}
        style={{ backgroundColor: bgColor }}>
        <p className="text-sm">{getDisplayCategory(blog.category)}</p>
      </div>
    </div>
  );
};

export default BlogComponent;
