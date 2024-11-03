import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { campaignProductData } from "../pages/dashboard/campaign_view/campaignView.page";
import noImages from "../../assets/images/content/no Images.jpg";

interface ProductCardProps {
  product: campaignProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Fragment>
      {product && (
        <div className="w-full max-w-[54rem] md:flex rounded overflow-hidden shadow-sm border border-gray-300 p-2">
          {product.product_images.length > 0 ? (
            <img
              className="w-full md:w-1/2 h-56 object-contain bg-gray-300"
              src={product.product_images[0].img_url}
              alt={product.product_name}
            />
          ) : (
            <img
              className="w-full md:w-1/2 h-28 object-contain m-auto bg-gray-300"
              src={noImages}
              alt="no image available for product"
            />
          )}
          <div className="w-full md:w-1/2 py-4 ml-3">
            <div className="font-bold lg:text-xl text-base mb-2">
              {product.product_name}
            </div>

            <p className="text-gray-700 text-xs lg:text-base mb-2">
              Price:
              <i className="fa-solid fa-indian-rupee-sign ml-2 mr-1 text-gray-950" />
              {product.product_price}
            </p>
            <p className="text-gray-700 text-xs lg:text-base">
              Free Product : {product.product_seeding === true ? "Yes" : "No"}
            </p>
            <div className="flex flex-row lg:mt-2  items-center">
              <p className="text-gray-700 text-xs lg:text-base">
                Product link:{" "}
              </p>
              <div className="rounded-lg ml-1">
                <Link to={product.product_purchase_link}>
                  <i className="fa-solid fa-arrow-up-right-from-square ml-2 mt-0 text-ri-blue" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductCard;
