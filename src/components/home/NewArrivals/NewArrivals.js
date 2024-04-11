import React, { useEffect, useState } from "react";
import { setItmes } from "../../../constants";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivals = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  var [paginationItems, setpaginationItems] = useState([]);
  const items = paginationItems;
  useEffect(() => {
    async function getProds() {
      await fetch("api/products/getProducts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the response JSON
        })
        .then(async (data) => {
          console.log(data.data, "SS");
          const aa = [];
          for (let i = data.data.length; i > data.data.length - 6; i--) {
            console.log(data.data[i - 1]);
            aa.push(data.data[i - 1]);
          }
          setpaginationItems(aa);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    getProds();
  });

  return (
    <div className="w-full pb-16">
      <Heading
        heading={
          sessionStorage.getItem("Lang") === "kr" ? "تازەکان" : "New Added"
        }
      />
      <Slider {...settings}>
        {items.map((item) => (
          // <div key={item.ID} className="w-full">
          //   <Product
          //     ID={item.ID}
          //     IMAGE={item.IMAGE}
          //     NAME={item.NAME}
          //     PRICE={item.PRICE}
          //     CATEGORY={item.CATEGORY}
          //     QUALITY={item.QUALITY}
          //     Description={item.Description}
          //   />
          // </div>

          <div key={item.ID} className="px-2">
            <Product
              ID={item.ID}
              IMAGE={item.IMAGE}
              NAME={item.NAME}
              PRICE={item.PRICE}
              CATEGORY={item.CATEGORY}
              QUALITY={item.QUALITY}
              Description={item.Description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
