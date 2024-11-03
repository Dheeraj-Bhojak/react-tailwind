import React, { useState, useRef, createRef, ChangeEvent } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { CModal, CModalBody } from "@coreui/react";

export const ImageCropper: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [visibleXL, setVisibleXL] = useState(false);

  const cropperRef = createRef<ReactCropperElement>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisibleXL(!visibleXL);
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropData = () => {
    if (cropperRef.current?.cropper) {
      const croppedData = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();
      setImages((prevImages) => [...prevImages, croppedData]);

      // Hide the file input after cropping three images
      if (images.length + 1 >= 3) {
        fileInputRef.current?.setAttribute("hidden", "true");
      }
    }
    setVisibleXL(false);
  };

  const handleCloseCropper = () => {
    setVisibleXL(false);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    // Show the file input when removing images below three
    if (images.length - 1 < 3) {
      fileInputRef.current?.removeAttribute("hidden");
    }
  };

  const renderCroppedImages = () => {
    return (
      <div className="flex">
        {images.map((img, index) => (
          <div key={index} className="items-center">
            <img className="w-24" src={img} alt={`cropped-${index}`} />
            <button onClick={() => handleRemoveImage(index)}>&times;</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full">
        <CModal
          backdrop="static"
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
                <div className="w-full mt-2 pr-5">
                  <div className="flex justify-end items-end">
                    <button
                      onClick={handleCloseCropper}
                      className="bg-gray-300  text-black p-1 px-4 rounded-md mr-2">
                      Close
                    </button>
                    <button
                      onClick={getCropData}
                      className="bg-ri-blue text-white p-1 px-4 rounded-md">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </CModalBody>
        </CModal>
        <input type="file" onChange={onChange} ref={fileInputRef} />
        <br />
        <br />
      </div>
      <div className="box w-full float-right h-300">
        {renderCroppedImages()}
      </div>
      <br className="clear-both" />
    </div>
  );
};

export default ImageCropper;
