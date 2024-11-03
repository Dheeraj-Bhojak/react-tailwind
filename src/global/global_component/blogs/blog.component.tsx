import React, { useEffect, useState } from "react";
import blogImg from "../../../assets/img/blogImage.jpg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { categoryColors } from "./blogCard.component";

interface blog {
  id: 2;
  content: string;
  title: string;
  status: string;
  category: string;
  likes: 0;
  created_at: string;
  picture: {
    id: 63;
    img_name: string;
    img_url: string;
    is_active: false;
  };
}

interface blogDataInterface {
  message: string;
  blog: blog;
}

const Blog = () => {
  const { id } = useParams();
  const profileId = parseInt(id ?? "0", 10);
  const [blogData, setBlogData] = useState<blog | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<blogDataInterface>(
          `${process.env.REACT_APP_API_URL}users/blog/${profileId}`
        );
        setBlogData(data.blog);
      } catch (error) {
        console.log(`error ${error}`);
      }
    };
    fetchData();
  }, [id]);

  // Function to add classNames to every list element in the HTML string
  const addClassNamesToElements = (
    html: string,
    elements: { tagName: string; classNames: string }[]
  ): string => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    elements.forEach(({ tagName, classNames }) => {
      const elements = wrapper.querySelectorAll(tagName);
      elements.forEach((element) => {
        element.classList.add(...classNames.split(" "));
      });
    });
    return wrapper.innerHTML;
  };

  const modificationElement = [
    { tagName: "h1", classNames: "text-[34px]" },
    { tagName: "h2", classNames: "text-[30px]" },
    { tagName: "h3", classNames: "text-[24px]" },
    { tagName: "h4", classNames: "text-[20px]" },
    { tagName: "h5", classNames: "text-[18px]" },
    { tagName: "h6", classNames: "text-[16px]" },
    { tagName: "ul", classNames: "list-disc list-inside" },
    { tagName: "ol", classNames: "list-decimal list-inside" },
  ];

  const dateView = (dateString: string) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    };
    return date.toLocaleDateString("en-IN", options);
  };

  return (
    <>
      {blogData && (
        <div>
          <div className="bg-[#4267B2] h-80 2xl:h-96 flex items-center justify-center">
            <div className="my-0 mx-auto md:px-0 md:container">
              <div className="gap-3 flex flex-col md:flex-row items-center justify-center">
                <div className="">
                  {blogData.picture && blogData.picture.img_url && (
                    <img
                      src={blogData.picture.img_url}
                      alt={blogData.picture.img_name}
                      className="h-auto rounded-md w-96"
                    />
                  )}
                </div>
                <div className="w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12">
                  <p className="text-white text-lg md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                    {blogData.title}
                  </p>
                  <div
                    className={`inline-block py-2 px-3 rounded-md mt-3 select-none`}
                    style={{
                      backgroundColor: categoryColors[blogData.category],
                    }}>
                    <p className="text-sm">{blogData.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-0 mx-auto md:px-0 md:container">
            <div className="w-full items-center pb-20 min-h-screen">
              <div
                className="w-6/12 flex m-auto items-start py-5 gap-20"
                id="blogContent">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="whitespace-nowrap text-right font-medium text-[#B1B1B1]">
                      Posted By
                    </p>
                    <p className="whitespace-nowrap text-right">Qikgro</p>
                  </div>
                  <div>
                    <p className="whitespace-nowrap text-right font-medium text-[#B1B1B1]">
                      Posted On
                    </p>
                    <p className="whitespace-nowrap text-right">
                      {dateView(blogData.created_at)}
                    </p>
                  </div>
                </div>
                {blogData.content ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: addClassNamesToElements(
                        blogData.content,
                        modificationElement
                      ),
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {!blogData && (
        <div className="text-center">
          <p className="text-xl mt-8">
            This page is only available on desktop.
          </p>
        </div>
      )}
    </>
  );
};

export default Blog;
