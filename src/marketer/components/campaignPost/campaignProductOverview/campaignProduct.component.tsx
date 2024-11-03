import React, { useRef, useState } from "react";
import CIcon from "@coreui/icons-react";
import { cilXCircle } from "@coreui/icons";
import { ShoppingBag, Globe } from "react-feather";
import { campaignPostFormState } from "../campaignPostOverview/campaignPostOverview.component";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../utils/selectors/user.selectors";
import MultiImageCropper from "../multiple.component";

const CampaignProductOverview: React.FC<campaignPostFormState> = ({
  campaignPostState,
}) => {
  const { campaignFormObject, setCampaignFormObject } = campaignPostState;
  const campaignProduct = campaignFormObject.campaign_product;

  const handleChangeCampaignProductOverview = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setCampaignFormObject((prevState) => ({
      ...prevState,
      campaign_product: {
        ...prevState.campaign_product,
        [name]: value,
      },
    }));
  };

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const user = useSelector(selectCurrentUser);

  const { access_token } = user.userData.token;
  const [buttonVisible, setButtonVisible] = useState(false);
  const uploadImage = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}images/campaign/upload-product-image`;
    const headers = {
      authorization: `Bearer ${access_token}`,
      "Content-Type": "multipart/form-data",
    };
    if (selectedFiles.length > 0 && selectedFiles.length < 4) {
      try {
        for (const file of selectedFiles) {
          const formData = new FormData();
          formData.append("file", file, file.name);
          const response = await axios.post(apiUrl, formData, { headers });
          setCampaignFormObject((prevState) => ({
            ...prevState,
            campaign_product: {
              ...prevState.campaign_product,
              product_images: [
                ...prevState.campaign_product.product_images,
                {
                  id: response.data.image.id,
                  img_name: response.data.image.img_name,
                  img_url: response.data.image.img_url,
                },
              ],
            },
          }));
        }
        setButtonVisible(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleSwitch = () => {
    setCampaignFormObject((prevState) => ({
      ...prevState,
      campaign_product: {
        ...prevState.campaign_product,
        product_seeding: !prevState.campaign_product.product_seeding,
      },
    }));
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="" id="marketerBrandForm">
      <div className="bg-white">
        <div className="p-3">
          <div className="w-full  ">
            <div className="2xl:w-3/4 w-full mx-auto  rounded border-gray-200 xs:mt-6 xl:mt-0 shadow-md p-5 ">
              <h1 className=" text-3xl font-bold mt-2 mb-2 ">Product Name</h1>
              <span className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae architecto, dolore quo maiores optio veniam?
              </span>
              <div className="flex mt-1">
                <div className="w-10 z-10 text-center pointer-events-none flex items-center justify-center">
                  <ShoppingBag className="m-2" />
                </div>
                <input
                  name="product_name"
                  value={campaignProduct.product_name}
                  required
                  onChange={handleChangeCampaignProductOverview}
                  type="text"
                  placeholder="Black PadFoot Hoodie xl size "
                  className="w-full -ml-10 pl-10 pr-3 py-4 border-b-4 border-ri-blue outline-none focus:border-ri-orange"
                />
              </div>
              <h1 className=" text-3xl font-bold mt-4 mb-2 ">Product Price</h1>
              <span className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae architecto, dolore quo maiores optio veniam?
              </span>
              <div className="flex ">
                <div className="w-10 z-10 text-center pointer-events-none flex items-center justify-center">
                  <i className="fa-solid fa-tags text-lg"></i>{" "}
                </div>
                <input
                  name="product_price"
                  value={campaignProduct.product_price}
                  onChange={handleChangeCampaignProductOverview}
                  required
                  type="text"
                  placeholder="799"
                  className="w-full -ml-10 pl-10 pr-3 py-4 border-b-4 border-ri-blue outline-none focus:border-ri-orange"
                />
              </div>
              <h1 className=" text-3xl font-bold mt-5 mb-2 ">Product Link</h1>
              <span className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae architecto, dolore quo maiores optio veniam?
              </span>
              <div className="flex mt-1">
                <div className="w-10 z-10 text-center pointer-events-none flex items-center justify-center">
                  <Globe />
                </div>
                <input
                  name="product_purchase_link"
                  value={campaignProduct.product_purchase_link}
                  onChange={handleChangeCampaignProductOverview}
                  required
                  type="text"
                  placeholder="Https://amazon.in/dc/product_name"
                  className="w-full -ml-10 pl-10 pr-3 py-4 border-b-4 border-ri-blue outline-none focus:border-ri-orange"
                />
              </div>
              <h1 className=" text-3xl font-bold mt-5 mb-2 ">Product Images</h1>
              <div className=" mt-10 border  p-3">
                <MultiImageCropper
                  selectedFiles={selectedFiles}
                  fileInputRef={fileInputRef}
                  images={images}
                  setImages={setImages}
                  setSelectedFiles={setSelectedFiles}
                />
                <div className=" mx-auto justify-center items-center">
                  {errorMessage && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                  )}
                </div>
                <div className="images md:flex flex-row flex-wrap justify-center items-center mt-3 w-full">
                  {selectedFiles.length > 0
                    ? selectedFiles.slice(1).map((selectedFile, index) => (
                        <div key={index}>
                          {selectedFile instanceof Blob && (
                            <div className="text-lg w-full relative">
                              <img
                                src={URL.createObjectURL(selectedFile)}
                                alt={`product`}
                                className="h-64 w-52 max-h-72 border m-3 shadow-lg object-cover"
                              />
                              <button
                                className="absolute top-2 right-6  rounded-full bg-white px-2 py-[2px] cursor-pointer text-black"
                                onClick={() =>
                                  setSelectedFiles(
                                    selectedFiles.filter(
                                      (e) => e !== selectedFile
                                    )
                                  )
                                }>
                                <CIcon icon={cilXCircle} />
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    : campaignProduct
                    ? campaignProduct.product_images.map((image, index) => (
                        <div key={index}>
                          <div className="text-lg w-full relative">
                            <img
                              src={image.img_url}
                              alt={image.img_name}
                              className=" h-auto w-52 max-h-72 border m-3 shadow-lg object-cover"
                            />
                            <button
                              className="absolute -top-2 right-4  rounded-full bg-white  cursor-pointer text-black"
                              onClick={() =>
                                setSelectedFiles(
                                  selectedFiles.filter(
                                    (e) => e !== selectedFile
                                  )
                                )
                              }>
                              <CIcon icon={cilXCircle} />
                            </button>
                          </div>
                        </div>
                      ))
                    : " "}
                </div>
                {buttonVisible && (
                  <button
                    className="hover:text-white border-1 px-3 rounded-lg bg-ri-orange border-ri-orange mt-20"
                    onClick={uploadImage}>
                    Upload Image
                  </button>
                )}
              </div>

              <h1 className=" text-3xl font-bold mt-5 mb-2 ">
                Product seeding
              </h1>

              <label className="flex items-center cursor-pointer ">
                <span className="text-gray-700 flex flex-row">
                  F Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae architecto, dolore quo maiores optio veniam?
                </span>
                <div className="p-2 rounded-lg">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={campaignProduct.product_seeding}
                      onChange={toggleSwitch}
                    />
                    <div className="toggle__line w-12 h-7 bg-gray-700 rounded-full shadow-inner"></div>
                    <div
                      className={`toggle__dot absolute w-7 h-7 rounded-full shadow -left-1 -top-[.5px] transition-transform duration-300 transform ${
                        campaignProduct.product_seeding
                          ? "translate-x-full"
                          : ""
                      } ${
                        campaignProduct.product_seeding
                          ? "bg-ri-orange"
                          : "bg-gray-400"
                      }`}></div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignProductOverview;
