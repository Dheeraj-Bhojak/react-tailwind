import React, { useRef, useState } from "react";
import SingleImageCropper from "../../../global/global_component/imageCropper/imageCropperSingle";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import axios from "axios";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";

const ProfilePictureUploader = () => {
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const { profile_picture } = user.userData.user;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(profile_picture);

  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
  });
  const [showToast, setShowToast] = useState(false);
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const apiUrl = `${process.env.REACT_APP_API_URL}images/profile-upload`;
        const headers = {
          authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        };

        const response = await axios.post(apiUrl, formData, { headers });

        const { status, data } = response;

        const { message, theme } = CallToast(status, data.message);
        setShowToast(true);
        setResponseToast({ message, theme });

        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      } else {
        console.error("No file selected.");
      }
    } catch (error: any) {
      const errorCode = error.statusCode || 401;
      const errorMessage = "Failed to upload Profile Image";
      const { message, theme } = CallToast(errorCode, errorMessage);
      setResponseToast({ message, theme });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };
  const handleCancelUploadImage = () => {
    setImage(null);
  };

  return (
    <>
      <div>
        {showToast ? (
          <ToastNotification
            message={responseToast.message}
            theme={responseToast.theme}
          />
        ) : (
          ""
        )}
      </div>
      <div className="w-full border border-black rounded shadow-md relative min-h-[266px]">
        <div className=" w-2/3 mt-2 ml-2 text-neutral-400  font-semibold font-['Open Sans'] mb-4 ">
          PROFILE IMAGE
        </div>

        <form onSubmit={handleUpload}>
          <div className="flex justify-center">
            <SingleImageCropper
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              fileInputRef={fileInputRef}
              image={image}
              setImage={setImage}
            />
          </div>
          <div className="mt-2 flex items-center text-center p-2">
            <button
              type="submit"
              className="border-1 rounded w-16 bg-ri-orange px-2 py-1 text-xs uppercase transform text-white mx-1 font-['Open Sans']">
              save
            </button>
            <button
              type="button"
              className="border-1 rounded w-16 bg-ri-blue px-2 py-1 text-xs uppercase transform text-white mx-1 font-['Open Sans'] "
              onClick={handleCancelUploadImage}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfilePictureUploader;
