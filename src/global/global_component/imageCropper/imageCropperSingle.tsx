import React, { useState, createRef, ChangeEvent } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { CModal, CModalBody } from "@coreui/react";
import User from "../../../assets/images/avatars/user.png";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";

interface CropperComponentProps {
  selectedFile: File | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const SingleImageCropper: React.FC<CropperComponentProps> = ({
  selectedFile,
  fileInputRef,
  image,
  setImage,
  setSelectedFile,
}) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [visibleXL, setVisibleXL] = useState(false);
  const user = useSelector(selectCurrentUser);
  const { profile_picture } = user.userData.user;

  const cropperRef = createRef<ReactCropperElement>();

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisibleXL(!visibleXL);
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
      setSelectedFile(files[0]);
    }
  };

  const getCropData = () => {
    if (cropperRef.current?.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();

      croppedCanvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], "cropped-image.png", {
            type: "image/png",
          });
          setSelectedFile(croppedFile);
          const croppedData = croppedCanvas.toDataURL();
          setImage(croppedData);
          setVisibleXL(false);
        }
      }, "image/png");
    }
  };

  const handleCloseCropper = () => {
    setVisibleXL(false);
  };
  const [fallbackImage, setFallbackImage] = useState<string>(User);
  const handleImageError = () => {
    setFallbackImage(User);
  };
  return (
    <div style={{ width: "100%" }}>
      <CModal
        size="xl"
        visible={visibleXL}
        aria-labelledby="OptionalSizesExample1">
        <CModalBody>
          {currentImage && (
            <div className="">
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                aspectRatio={3.5 / 4}
                initialAspectRatio={1 / 1}
                src={currentImage}
                viewMode={1}
                minCropBoxHeight={60}
                minCropBoxWidth={60}
                background={false}
                autoCropArea={1 / 1}
                checkOrientation={true}
                guides={true}
              />
              <button
                onClick={handleCloseCropper}
                className="py-1 mx-2 w-32 px-2 border-1 bg-ri-blue text-white rounded-md">
                Close Cropper
              </button>
              <button
                onClick={getCropData}
                className="py-1 mx-2 w-32 px-2 border-1 bg-ri-orange text-white rounded-md">
                Crop Image
              </button>
            </div>
          )}
        </CModalBody>
      </CModal>
      <div className="flex justify-center">
        <label htmlFor="fileToUpload" className="">
          <div
            className={`relative profile-pic border border-black h-36 w-36 rounded-full bg-contain bg-no-repeat bg-center cursor-pointer hover:opacity-60 mx-auto `}>
            <img
              src={image || fallbackImage}
              alt="Profile"
              className="h-36 w-36 object-cover rounded-full absolute hover:opacity-100 text-transparent"
              onError={handleImageError}
            />
            <div className="hover:text-black h-full flex items-center justify-center">
              <i className="fa-solid fa-camera font-black text-4xl"></i>
            </div>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              name="fileToUpload"
              id="fileToUpload"
              className="hidden"
              onChange={onImageChange}
              ref={fileInputRef}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default SingleImageCropper;
