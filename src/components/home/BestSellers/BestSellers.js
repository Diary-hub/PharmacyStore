import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";

const BestSellers = () => {
  return (
    <div className="w-full pb-20">
      <Heading
        heading={
          sessionStorage.getItem("Lang") === "kr"
            ? "زۆر فڕۆشەکان"
            : "Best Sells"
        }
      />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        <Product
          ID="1011"
          IMAGE={bestSellerOne}
          NAME="Flower Base"
          PRICE="35.00"
          CATEGORY="Blank and White"
          QUALITY="High"
          Description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          ID="1012"
          IMAGE={bestSellerTwo}
          NAME="New Backpack"
          PRICE="180.00"
          CATEGORY="Gray"
          QUALITY={false}
          Description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          ID="1013"
          IMAGE={bestSellerThree}
          NAME="Household materials"
          PRICE="25.00"
          CATEGORY="Mixed"
          QUALITY={true}
          Description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          ID="1014"
          IMAGE={bestSellerFour}
          NAME="Travel Bag"
          PRICE="220.00"
          CATEGORY="Black"
          QUALITY={false}
          Description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
      </div>
    </div>
  );
};

export default BestSellers;
