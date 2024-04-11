import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
import * as shopBy from "react-icons/im";
import NavTitle from "./NavTitle";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const items = [
    {
      _id: 991,
      title: sessionStorage.getItem("Lang") === "kr" ? "حەبەکان" : "Pills",
      icons: true,
    },
    {
      _id: 992,
      title:
        sessionStorage.getItem("Lang") === "kr" ? "دەرزیەکان" : "Injections",
      icons: true,
    },
    {
      _id: 993,
      title: sessionStorage.getItem("Lang") === "kr" ? "گیراوەکان" : "Liquids",
      icons: true,
    },
    {
      _id: 994,
      title: sessionStorage.getItem("Lang") === "kr" ? "بابەتی تر" : "Others",
      icons: true,
    },
  ];
  return (
    <div className="w-full">
      <NavTitle
        title={
          sessionStorage.getItem("Lang") === "kr"
            ? "جۆرەکانی دەرمان"
            : "Category"
        }
        icons={false}
      />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, title, icons }) => (
            <li
              key={_id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
            >
              {title}
              {icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <shopBy.ImNotification />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
