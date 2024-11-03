import { useState } from "react";
import { Link } from "react-router-dom";
import box_arrow from "../../../../assets/icons/box_arrow.png";

interface Video {
  id: number;
  video_id: string;
  publish_date: string;
  youtube_channel_id: string;
  title: string;
  description: string;
  thumbnails: string;
  tags: string | null;
  category_id: string;
  default_language: string | null;
  default_audio_language: string | null;
  views: string;
  likes: string;
  favorite_count: string;
  comment_count: string;
}

interface VideoSlideProps {
  video: Video;
  isCurrent: boolean;
}
const VideoSlide: React.FC<VideoSlideProps> = ({ video, isCurrent }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Truncate description to 150 characters or show full description based on state
  const displayDescription = showFullDescription
    ? video.description
    : video.description.length > 80
    ? video.description.substring(0, 80) + "..."
    : video.description;

  return (
    <div className={isCurrent ? "slide active" : "slide"}>
      {isCurrent && (
        <div className="w-full flex flex-wrap">
          <div className="md:w-1/2 w-full">
            <img
              src={video.thumbnails}
              alt="content images"
              className="image h-48 w-60 object-cover mx-auto"
            />
          </div>
          <div className="md:w-1/2 w-full md:p-4 xxs:mt-3 md:mt-0">
            <div className="video-details">
              {" "}
              <div className="flex items-center absolute right-3 top-14">
                <Link
                  to={`https://youtu.be/${video.video_id}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  <img
                    src={box_arrow}
                    alt="Box-Arrow for navigate"
                    className="h-5"
                  />{" "}
                </Link>
              </div>
              <h3 className="font-bold">{video.title}</h3>
              <p className="text-xs mt-2">{displayDescription}</p>
              {video.description.length > 80 && (
                <button
                  className="text-blue-500 text-xs cursor-pointer"
                  onClick={() => setShowFullDescription(!showFullDescription)}>
                  {showFullDescription ? "Show Less" : "Show More"}
                </button>
              )}
              <p className="text-xs font-bold">
                Content audio Language :{" "}
                <span className=" font-medium">
                  {video.default_audio_language === "zxx"
                    ? "Not Recognized"
                    : video.default_audio_language}
                </span>{" "}
              </p>
              <div className="flex items-center mt-2">
                <span className="flex items-center mr-4">
                  <i className="fas fa-thumbs-up mr-1"></i>
                  {video.likes}
                </span>
                <span className="flex items-center mr-4">
                  <i className="fas fa-comment mr-1"></i>
                  {video.comment_count}
                </span>
                <span className="flex items-center mr-4">
                  <i className="fas fa-eye mr-1"></i>
                  {video.views}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSlide;
