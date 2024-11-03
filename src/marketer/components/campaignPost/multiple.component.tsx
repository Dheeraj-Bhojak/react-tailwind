import React, { useState, createRef, ChangeEvent } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { CModal, CModalBody } from "@coreui/react";

interface CropperComponentProps {
  selectedFiles: File[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export const MultiImageCropper: React.FC<CropperComponentProps> = ({
  selectedFiles,
  fileInputRef,
  images,
  setImages,
  setSelectedFiles,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [visibleXL, setVisibleXL] = useState(false);
  const cropperRef = createRef<ReactCropperElement>();
  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles: File[] = [];
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          newImages.push(reader.result as string);
          if (newImages.length === 1) {
            setCurrentImage(newImages[0]);
            setCurrentImageIndex((prev) => prev + 1);
            setVisibleXL(true);
          }
        };
        reader.readAsDataURL(file);
        newFiles.push(file);
      });
      setSelectedFiles((prev) => [...prev, ...newFiles]);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const getCropData2 = () => {
    if (cropperRef.current && currentImageIndex !== null) {
      const cropper = cropperRef.current?.cropper;
      if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas();
        croppedCanvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const croppedFile = new File(
              [blob],
              `cropped-image-${currentImageIndex}.png`,
              {
                type: "image/png",
              }
            );
            const updatedFiles = [...selectedFiles];
            updatedFiles[currentImageIndex] = croppedFile;
            setSelectedFiles(updatedFiles);
            const croppedData = croppedCanvas.toDataURL();
            const updatedImages = [...images];
            updatedImages[currentImageIndex] = croppedData;
            setImages(updatedImages);
            setVisibleXL(false);
          }
        }, "image/png");
      }
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
          const updatedImages = [...images];
          updatedImages[currentImageIndex] = croppedCanvas.toDataURL();
          setImages(updatedImages);
          const updatedFiles = [...selectedFiles];
          updatedFiles[currentImageIndex] = croppedFile;
          setSelectedFiles(updatedFiles);
          setVisibleXL(false);
        }
      }, "image/png");
    }
  };
  const handleCloseCropper = () => {
    setVisibleXL(false);
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
              <div className="pt-2">
                <button
                  onClick={handleCloseCropper}
                  className="py-1 mx-2 w-32 px-2 border-1 bg-ri-blue text-white rounded-md">
                  Close Cropper
                </button>
                <button
                  onClick={getCropData2}
                  className="py-1 mx-2 w-32 px-2 border-1 bg-ri-orange text-white rounded-md">
                  Crop Image
                </button>
              </div>
            </div>
          )}
        </CModalBody>
      </CModal>
      <div className="flex justify-center">
        <label htmlFor="fileToUpload" className="">
          <div
            className={`relative profile-pic border border-black h-36 w-36 rounded-full bg-contain bg-no-repeat bg-center cursor-pointer hover:opacity-60 mx-auto `}>
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
              multiple // Allow multiple files
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default MultiImageCropper;

// import React, { useState, ChangeEvent, useRef } from "react";
// import Cropper from "react-cropper"; // Correctly import Cropper as default
// import "cropperjs/dist/cropper.css";
// import { CModal, CModalBody } from "@coreui/react";

// interface MultiImageCropperProps {
//   selectedFiles: File[];
//   fileInputRef: React.RefObject<HTMLInputElement>;
//   images: string[];
//   setImages: React.Dispatch<React.SetStateAction<string[]>>;
//   setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
// }

// const MultiImageCropper: React.FC<MultiImageCropperProps> = ({
//   selectedFiles,
//   fileInputRef,
//   images,
//   setImages,
//   setSelectedFiles,
// }) => {
//   const [currentImage, setCurrentImage] = useState<string | null>(null);
//   const [currentIndex, setCurrentIndex] = useState<number | null>(null);
//   const [visible, setVisible] = useState(false);
//   const cropperRef = useRef<Cropper>(null); // Use Cropper type for the ref
//   const onImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
//     e.preventDefault();
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setCurrentImage(reader.result as string);
//         setCurrentIndex(index); // Set the current index for cropping
//         setVisible(true);
//       };
//       reader.readAsDataURL(files[0]);
//       const updatedFiles = [...selectedFiles];
//       updatedFiles[index] = files[0];
//       setSelectedFiles(updatedFiles);
//     }
//   };

//   const getCropData = () => {
//     if (cropperRef.current && currentIndex !== null) {
//       // Use type assertion to get the cropper instance
//       const cropper = (cropperRef.current as any).cropper;

//       if (cropper) {
//         const croppedCanvas = cropper.getCroppedCanvas();

//         croppedCanvas.toBlob((blob: Blob | null) => {
//           // Explicitly define blob type
//           if (blob) {
//             const croppedFile = new File([blob], "cropped-image.png", {
//               type: "image/png",
//             });

//             // Update selectedFiles at the current index
//             const updatedFiles = [...selectedFiles];
//             updatedFiles[currentIndex] = croppedFile;
//             setSelectedFiles(updatedFiles);

//             // Update images at the current index
//             const croppedData = croppedCanvas.toDataURL();
//             const updatedImages = [...images];
//             updatedImages[currentIndex] = croppedData;
//             setImages(updatedImages);

//             setVisible(false); // Close the modal after cropping
//           }
//         }, "image/png");
//       }
//     }
//   };

//   const handleCloseCropper = () => {
//     setVisible(false);
//   };

//   return (
//     <div>
//       <CModal size="xl" visible={visible}>
//         <CModalBody>
//           {currentImage && (
//             <div>
//               <Cropper
//                 ref={cropperRef as unknown as React.RefObject<HTMLImageElement>} // Attach the ref to the Cropper component
//                 style={{ height: 400, width: "100%" }}
//                 zoomTo={0.5}
//                 aspectRatio={1} // Adjust aspect ratio
//                 src={currentImage}
//                 viewMode={1}
//                 minCropBoxHeight={50}
//                 minCropBoxWidth={50}
//                 background={false}
//                 autoCropArea={1}
//                 checkOrientation={false}
//                 guides={true}
//               />
//               <button onClick={handleCloseCropper}>Close Cropper</button>
//               <button onClick={getCropData}>Crop Image</button>
//             </div>
//           )}
//         </CModalBody>
//       </CModal>

//       {/* Render file input and image preview */}
//       {images.map((image, index) => (
//         <div key={index} className="image-upload-section">
//           <label htmlFor={`file-upload-${index}`}>
//             <div className="relative profile-pic border border-black h-36 w-36 rounded-full bg-contain bg-no-repeat bg-center cursor-pointer hover:opacity-60 mx-auto">
//               <img
//                 src={image}
//                 alt="Profile"
//                 className="h-36 w-36 object-cover rounded-full absolute hover:opacity-100 text-transparent"
//               />
//               <div className="hover:text-black h-full flex items-center justify-center">
//                 <i className="fa-solid fa-camera font-black text-4xl"></i>
//               </div>
//               <input
//                 type="file"
//                 accept="image/png, image/jpg, image/jpeg"
//                 id={`file-upload-${index}`}
//                 className=""
//                 onChange={(e) => onImageChange(e, index)} // Pass the index
//                 // ref={fileInputRef}
//               />
//             </div>
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MultiImageCropper;
