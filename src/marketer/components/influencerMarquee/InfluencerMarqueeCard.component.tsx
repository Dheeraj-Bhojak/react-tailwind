import React from "react";
import "./InfluencerMarquee.css";
import Slider from "react-slick";

import { influencerData } from "../../../seeder";
import _ from "lodash";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../global/global_component/buttons/button.component";
import InfluencerCard from "../cards/influencerCard.component";
import RazorPayButton from "../../../global/global_component/razorPayButton/razorPayButton.component";
import InfluencerAgreement from "../../../influencer/component/campaignAgreement/campaignAgreement.component";
import CustomEditor from "../../../global/global_pages/quill-editor/quillEditor.pages";

const InfluencerMarqueeCard: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },

      {
        breakpoint: 555,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 0,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="bg-gray-100">
      <div className=" w-full bg-white p-10 text-center overflow-hidden">
        <p className="pb-3 text-gray-600 text-5xl font-semibold">
          Collaborate With
        </p>
        <p className=" text-black text-5xl font-semibold mb-10">
          Top Influencers
        </p>

        <div className="justify-center">
          <Slider {...settings}>
            {influencerData.map((influencer) => (
              <InfluencerCard key={influencer.id} influencer={influencer} />
            ))}
          </Slider>
        </div>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.sideLeftBounceBlue}
          className="lg:w-96 w-1/2 sm:text-lg text-xs font-bold rounded-full z-10 after:bg-ri-blue before:bg-ri-blue hover:text-white border-1 border-ri-blue mt-20">
          See all Influencer
        </Button>
      </div>
      <InfluencerAgreement />
      <CustomEditor />
      {/* <RazorPayButton /> */}
    </div>
  );
};

export default InfluencerMarqueeCard;
