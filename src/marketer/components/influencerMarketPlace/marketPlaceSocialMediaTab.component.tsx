import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";

const youtube_channel_ids = [
  {
    id: 1,
    channel_name: "Dheeraj Bhojak",
    user_name: "@dheeraj-s-bhojak",
    channel_id: "UCbH2ei8mZAbwbB16GsIYetA",
    channel_description: "",
    channel_publish: "2023-07-21T10:40:44.520251Z",
    is_active: true,
    channel_profile_url:
      "https://yt3.ggpht.com/ytc/AIf8zZR2GqllHEipb3uLAoTezcg4Yx7xA9Z132aea4FD9xiWMn9gynR_vzWvcH13N_Mz=s240-c-k-c0x00ffffff-no-rj",
    total_views: "19",
    subscriber_count: "2",
    videos_uploaded: "2",
    videos_details: [
      {
        id: 1,
        video_id: "hQwDVdmayT0",
        publish_date: "2023-09-29T11:25:18Z",
        youtube_channel_id: "UCbH2ei8mZAbwbB16GsIYetA",
        title: "Brain Test 3 | Gundolf Puzzle |  Level 11",
        description:
          "@CarryisLive @fukrainsaanlive4744  #braintest3trickyquests  #braintest  #level11 #gundolfPuzzle",
        thumbnails: "https://i.ytimg.com/vi/hQwDVdmayT0/hqdefault.jpg",
        category_id: "22",
        views: "6",
        likes: "2",
        favorite_count: "0",
        comment_count: "0",
        is_active: true,
      },
      {
        id: 2,
        video_id: "qUkWPf5CT9A",
        publish_date: "2023-09-29T11:20:32Z",
        youtube_channel_id: "UCbH2ei8mZAbwbB16GsIYetA",
        title: "Free Fire Max | Gameplay | (MY First Video Gameplay)",
        description:
          "My First freefire max gameplay video, #freefire #gaming #gameplay #india #bgmi #pubgmobile #fashion #viral",
        thumbnails: "https://i.ytimg.com/vi/qUkWPf5CT9A/hqdefault.jpg",
        category_id: "22",
        views: "12",
        likes: "1",
        favorite_count: "0",
        comment_count: "1",
        is_active: true,
      },
    ],
  },
];

interface TotalVideos {
  views: number;
  likes: number;
  commentCount: number;
  favoriteCount: number;
}

const InfluencerMarketPlaceSocialMediaTab = () => {
  const [activeTab, setActiveTab] = useState(youtube_channel_ids[0].id);

  const youtubeProfileData2 = youtube_channel_ids.find(
    (tab) => tab.id === activeTab
  );

  return (
    <div className="">
      <h1>hello card</h1>
    </div>
  );
};

export default InfluencerMarketPlaceSocialMediaTab;
