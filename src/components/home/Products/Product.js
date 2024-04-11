import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  const _id = props.NAME;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    sessionStorage.setItem("productItem", JSON.stringify(productItem));
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };
  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div>
          <Image className="w-full h-full" imgSrc={props.IMAGE} />
        </div>
        <div className="absolute top-6 left-8">
          {/* {props.QUALITY && <Badge text="New" />} */}
        </div>
        <div className="w-full h-20 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-Rabar px-2 border-l border-r">
            <li
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: props.ID,
                    name: props.NAME,
                    quantity: 1,
                    image: props.IMAGE,
                    badge: props.QUALITY,
                    price: props.PRICE,
                    colors: props.CATEGORY,
                  })
                )
              }
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              {sessionStorage.getItem("Lang") === "kr"
                ? "زیادکردن بۆ سەبەتە"
                : "Add To Cart"}
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              {sessionStorage.getItem("Lang") === "kr"
                ? "بینینی زیاتر"
                : "See More"}

              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-Rabar">
          <h2 className="text-lg text-primeColor font-bold">{props.NAME}</h2>
          <p className="text-[#767676] text-[14px]">${props.PRICE}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.CATEGORY}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
