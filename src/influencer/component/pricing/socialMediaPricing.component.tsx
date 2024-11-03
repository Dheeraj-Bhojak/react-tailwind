import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { socialIcons } from "../../../seeder";

type InstagramPriceDataType = {
  sponsored_image_post: string;
  reels: string;
  giveaways_and_contests: string;
  takeover: string;
  stories_swipe_link: string;
  stories: string;
  igtv: string;
  shout_outs: string;
  live_streaming: string;
  affiliate_rates: string;
};
interface instagramServicePriceResponseApi {
  message: string;
  InstagramServicePrice: InstagramPriceDataType | null;
}

const initialValueInstagramPriceData: InstagramPriceDataType = {
  sponsored_image_post: "0",
  reels: "0",
  giveaways_and_contests: "0",
  takeover: "0",
  stories_swipe_link: "0",
  stories: "0",
  igtv: "0",
  shout_outs: "0",
  live_streaming: "0",
  affiliate_rates: "0",
};

const InfluencerPricing: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const [instagramPriceData, setInstagramPriceData] =
    useState<InstagramPriceDataType>(initialValueInstagramPriceData);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    sectionName: keyof InstagramPriceDataType
  ) => {
    const { value } = e.target;
    setInstagramPriceData((prevData) => ({
      ...prevData,
      [sectionName]: value,
    }));
  };

  // Function to handle form submission for Instagram
  const handleSubmitInstagram = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}influencer/instagram_update_pricing`;
      const headers = {
        authorization: `Bearer ${access_token}`,
      };
      const response = await axios.post(apiUrl, instagramPriceData, {
        headers,
      });
    } catch (error) {
      console.error("Error updating Instagram pricing:", error);
    }
  };

  useEffect(() => {
    const fetchPricingList = async () => {
      const apiUrl = `${process.env.REACT_APP_API_URL}influencer/influencer_pricing`;
      const headers = {
        authorization: `Bearer ${access_token}`,
      };
      try {
        const { data } = await axios.get<instagramServicePriceResponseApi>(
          apiUrl,
          { headers }
        );

        if (data && data.InstagramServicePrice) {
          const {
            sponsored_image_post,
            reels,
            giveaways_and_contests,
            takeover,
            stories_swipe_link,
            stories,
            igtv,
            shout_outs,
            live_streaming,
            affiliate_rates,
          } = data.InstagramServicePrice;

          setInstagramPriceData({
            sponsored_image_post,
            reels,
            giveaways_and_contests,
            takeover,
            stories_swipe_link,
            stories,
            igtv,
            shout_outs,
            live_streaming,
            affiliate_rates,
          });
        }
      } catch (error) {
        console.error("Error fetching pricing data:", error);
      }
    };
    fetchPricingList();
  }, []);

  return (
    <div className="bg-[#EBEBEB] p-3">
      <div className="flex items-center justify-center">
        <div className="bg-white self-center w-full 2xl:w-8/12 p-3 mb-3 flex rounded-md justify-center gap-2">
          <p className="text-sm 2xl:text-base font-medium">Disclaimer:</p>
          <p className="text-sm 2xl:text-base">
            The prices displayed here in are subject to negotiation and are
            adaptable to suit specific requirements.
          </p>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-3 w-full items-start justify-center">
        {/* Instagram Prices */}
        <div className="bg-white rounded w-full 2xl:w-4/12 border-1 border-[#4267B2] flex flex-col">
          <div className="flex items-center justify-center bg-[#4267B2] rounded-t p-2 gap-2">
            <img src={socialIcons.instagram} alt="" className="w-5 h-5" />
            <p className="text-white text-sm 2xl:text-base">Instagram Prices</p>
          </div>

          <div className="flex-grow">
            {Object.entries(instagramPriceData).map(
              ([sectionName, value], index) => (
                <div key={index} className="p-3 w-full flex">
                  <div className="w-8/12">
                    <p className="font-medium text-sm 2xl:text-base">
                      {sectionName
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                      :
                    </p>
                  </div>
                  <div className="relative w-4/12 flex items-center">
                    <div className="flex items-center">
                      <span className="text-white bg-[#4267B2] px-2 rounded-l">
                        ₹
                      </span>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        maxLength={6}
                        value={value}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            sectionName as keyof InstagramPriceDataType
                          )
                        }
                        className="rounded-r-md border-1 border-[#4267B2] w-full text-sm custom-input py-[1px] pl-2"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="flex items-center justify-center mt-3 mb-3">
            <button
              className="bg-[#4267B2] text-white text-sm py-2 px-4 rounded-md"
              onClick={handleSubmitInstagram}>
              Submit Instagram
            </button>
          </div>
        </div>
        {/* YouTube Prices */}
        {/* <div className="bg-white rounded w-full 2xl:w-4/12 border-1 border-[#FDC100] flex flex-col self-stretch">
          <div className="flex items-center justify-center bg-[#FDC100] rounded-t p-2 gap-2">
            <p className="text-white text-sm 2xl:text-base">YouTube Prices</p>
          </div>
          <div className="flex-grow">
            {YoutubePriceData.map((item, index) => (
              <div key={index} className="p-3 w-full flex">
                <div className="w-8/12">
                  <p className="font-medium text-sm 2xl:text-base">
                    {item.youtubeSectionName}:
                  </p>
                </div>
                <div className="relative w-4/12 flex items-center">
                  <div className="flex items-center">
                    <span className="text-white bg-[#FDC100] px-2 rounded-l">
                      ₹
                    </span>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      maxLength={6}
                      value={youtubePriceData[item.youtubeSectionName]}
                      onChange={(e) =>
                        handleInputChange(e, item.youtubeSectionName, false)
                      }
                      className="rounded-r-md border-1 border-[#FDC100] w-full text-sm custom-input py-[1px] pl-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-3 mb-3">
            <button
              className="bg-[#FDC100] text-white text-sm py-2 px-4 rounded-md"
              onClick={handleSubmitYoutube}>
              Submit YouTube
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default InfluencerPricing;
