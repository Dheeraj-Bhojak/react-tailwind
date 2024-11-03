import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import ContentDeliverableHistory from "./deliverableHistory.component";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import Page404NotFound from "../../../global/global_pages/pages/page404.component";
import CallToast from "../../../utils/utilsMethods/callToast.utils";

interface collabContentApiResponse {
  id: number;
  media_type: string;
  deliverable_name: string;
  deliverable_descriptions: string;
  campaign: {
    id: 5;
    campaign_name: string;
    campaign_description: string;
  };
  content_reviews: {
    status: string;
    caption: string;
    image: string;
    updated_at: string;
    deliverable_note: string;
  }[];
}

const ContentDeliverable: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const { id } = useParams();
  const campaignCollabId = parseInt(id ?? "0", 10);

  const [collabCampaign, setCollabCampaign] =
    useState<collabContentApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}influencer_campaigns/campaign_collab/${campaignCollabId}`,
          config
        );
        setCollabCampaign(data.data);
      } catch (error) {
        console.log(`error ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [campaignCollabId]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0]);
      setFileURL(URL.createObjectURL(event.target.files[0]));
    }
  };
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
  });
  const [showToast, setShowToast] = useState(false);

  const uploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (uploadedFile) {
        const uploadDeliverableApiUrl = `${process.env.REACT_APP_API_URL}influencer_campaigns/uploadDeliverable/${campaignCollabId}`;
        const headers = {
          authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        };
        const formData = new FormData();
        formData.append("file", uploadedFile);

        const response = await axios.post(uploadDeliverableApiUrl, formData, {
          headers,
        });

        const { status, data } = response;
        const { message, theme } = CallToast(status, data.message);
        setShowToast(true);
        setResponseToast({ message, theme });
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      } else {
        console.log("data");
      }
    } catch (error: any) {
      const errorCode = error.statusCode || 401;
      const errorMessage = "Failed to upload deliverable content";
      const { message, theme } = CallToast(errorCode, errorMessage);
      setResponseToast({ message, theme });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };

  const removeImage = () => {
    setUploadedFile(null);
    setFileURL("");
  };

  return (
    <Fragment>
      {loading ? (
        <p>loading.......</p>
      ) : (
        <div>
          {collabCampaign ? (
            <div className="bg-[#EBEBEB] p-3">
              <div className="bg-white p-3 rounded-md">
                <p className="font-medium 2xl:text-lg">
                  {collabCampaign.campaign.campaign_name}
                </p>
                <div className="lg:flex mt-4">
                  <div className="w-1/4">
                    <p className="text-sm">Deliverable Name:</p>
                    <p className="text-sm 2xl:text-base font-medium">
                      {collabCampaign.deliverable_name}
                    </p>
                  </div>
                  <div className="w-3/4 lg:mt-0  xxs:mt-4 ">
                    <p className="text-sm">Deliverable Description:</p>
                    <p className="text-sm 2xl:text-base">
                      {collabCampaign.deliverable_descriptions}
                    </p>
                  </div>
                </div>
                <div className="flex mt-3 gap-20">
                  <p className="font-medium text-sm 2xl:text-base">
                    Campaign Description:
                  </p>
                  <p className="text-sm 2xl:text-base">
                    {collabCampaign.campaign.campaign_description}
                  </p>
                </div>
                <div className="w-full  mt-3 flex">
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <div className="py-1 px-3 bg-[#4267B2] text-white rounded">
                      Choose Deliverable
                    </div>
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/* , video/mp4,"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {uploadedFile && (
                    <div className="mx-8 relative">
                      {uploadedFile.type.startsWith("image/") ? (
                        <img
                          src={fileURL}
                          alt={uploadedFile.name}
                          className="h-28 w-32 object-contain"
                        />
                      ) : (
                        <video
                          src={fileURL}
                          controls
                          className="h-28 w-32 object-contain"
                        />
                      )}
                      <button
                        className="absolute top-0 right-0 text-white bg-red-500 rounded-full px-2 py-1 text-xs"
                        onClick={removeImage}>
                        X
                      </button>
                      <p className="text-sm ml-3">
                        {uploadedFile.name.length > 15
                          ? uploadedFile.name.substring(0, 15) + "..."
                          : uploadedFile.name}
                      </p>
                    </div>
                  )}
                </div>
                <div className=" gap-3 flex justify-end">
                  <button className="bg-[#4267B2] text-white py-2 px-3 rounded-md">
                    <p className="text-sm xl:text-base" onClick={uploadImage}>
                      Upload
                    </p>
                  </button>
                  <button className="bg-[#FDC100] text-white py-2 px-3 rounded-md">
                    <p className="text-sm xl:text-base">Cancel</p>
                  </button>
                </div>
              </div>
              {collabCampaign.content_reviews.map((review, index) => {
                return (
                  <ContentDeliverableHistory
                    key={index}
                    content_review={review}
                    campaign_description={
                      collabCampaign.campaign.campaign_description
                    }
                  />
                );
              })}
            </div>
          ) : (
            <Page404NotFound />
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ContentDeliverable;
