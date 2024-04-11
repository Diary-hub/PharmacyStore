import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { CgRedo } from "react-icons/cg";

const BannerBottom = () => {
  return (
    <div className="w-full bg-white border-b-[1px] py-4 border-b-gray-200 px-4">
      <div className="max-w-container mx-auto h-20 flex flex-col md:flex-row justify-between items-center">
        <div className="flex md:w-auto items-center gap-2 w-72 shadow-sm hover:shadow-md duration-300">
          <p className="text-base">
            {sessionStorage.getItem("Lang") === "kr"
              ? "گەیاندنی خۆڕای"
              : "Quick Shipping"}
          </p>
          <span className="text-xl text-center w-6 ml-1">
            <MdLocalShipping />
          </span>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
