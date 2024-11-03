import React, { useEffect, useState } from "react";
import headerBackground from "../../../assets/img/pricingBackground.png";

import BlogComponent from "./blogCard.component";
import axios from "axios";
import Pagination from "../pagination/paginationWithNumber.component";
import Paginate from "../pagination/paginate.component";
import { useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import styles from "./blogPaginationStyle.module.scss";

interface Categories {
  [key: string]: string;
}
export const categories: Categories = {
  "All Categories": "ALL",
  "Influencer Marketing": "INFLUENCER_MARKETING",
  "YouTube Influencer Marketing": "YOUTUBE_INFLUENCER_MARKETING",
  "Instagram Influencer Marketing": "INSTAGRAM_INFLUENCER_MARKETING",
  "Influencer Discovery": "INFLUENCER_DISCOVERY",
  "Influencer Management": "INFLUENCER_MANAGEMENT",
  "Measurement & ROI": "MEASUREMENT_AND_ROI",
  "What's New at Qikgro": "NEW_AT_QIKGRO",
  "Brand Stories": "BRAND_STORIES",
};

export interface blogDataInterface {
  id: number;
  title: string;
  status: string;
  category: string;
  likes: number;
  created_at: string;
  picture: {
    id: number;
    img_name: string;
    img_url: string;
    is_active: boolean;
  };
}

interface ApiResponse {
  message: string;
  data: blogDataInterface[];
  totalPages: number;
}

const BlogsView: React.FC = () => {
  const [category, setCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(0); //Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSelectCategory = (categoryName: string) => {
    setCategory(categoryName);
  };
  const [blogs, setBlogs] = useState<ApiResponse | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const GetBlogUrl = `${
          process.env.react_app_api_url
        }users/blogs?category=${categories[category]}&page=${
          currentPage + 1
        }&search=${searchQuery}`;
        const { data } = await axios.get(GetBlogUrl);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [category, currentPage, search]);

  const handleViewBlog = (blog_id: number) => {
    navigate(`/blog/${blog_id}`);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearch((prevSearch) => !prevSearch);
    }
  };
  return (
    <div className="select-none">
      <div className="relative">
        <img
          src={headerBackground}
          alt=""
          className="md:h-72 h-64 xl:h-80 w-full object-cover text-wrap"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[#4267B2] text-center sm:p-4 max-w-full md:max-w-lg xl:max-w-2xl">
            <p className="text-xs md:text-sm xl:text-base font-thin">
              7-DAY FREE TRIAL ON ALL PLANS
            </p>
            <p className="text-3xl md:text-4xl xl:text-5xl mt-2 font-medium">
              Choose Your Plan
            </p>
            <p className="mt-4 text-base xl:text-lg sm:mx-5 font-medium">
              Finally, a solution that lets you pay for what you need, when you
              need it.
            </p>
          </div>
        </div>
      </div>
      <div className="md:container mx-auto mt-[16px] xl:mt-[36px]">
        <div className="flex flex-col md:flex-row gap-3 mx-[20px] xl:mx-0">
          <div className="md:w-3/12">
            <div className="flex flex-col items-center sm:items-start">
              <input
                type="search"
                placeholder="Search articles"
                className="p-2 sm:p-1 border-1 border-gray-300 rounded-md max-w-full w-full sm:w-auto custom-input text-sm"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="hidden md:block mt-4">
              <p className="text-lg font-medium">Categories</p>
              <div className="mt-3">
                {Object.keys(categories).map((categoryName, index) => (
                  <p
                    className="cursor-pointer mt-2 text-sm"
                    key={index}
                    onClick={() => handleSelectCategory(categoryName)}>
                    {categoryName}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="md:w-9/12">
            <p className="text-xl md:text-4xl font-medium">All Articles</p>
            {blogs ? (
              blogs.data.length > 0 ? (
                <div>
                  <Paginate
                    pageCount={blogs.totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                  <div className=" mx-auto mt-4 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {blogs.data.map((blog) => (
                        <div
                          key={blog.id}
                          onClick={() => handleViewBlog(blog.id)}>
                          <BlogComponent blog={blog} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[40vh]">
                  <p className="text-center text-lg text-gray-600">No Data</p>
                </div>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsView;
