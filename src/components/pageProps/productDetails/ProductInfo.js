import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.NAME}</h2>
      <p className="text-xl font-semibold">
        {sessionStorage.getItem("Lang") === "kr" ? "نرخ" : "Price"} : $
        {productInfo.PRICE}{" "}
      </p>
      <p className="text-base text-gray-600">{productInfo.Description}</p>
      <p className="font-medium text-lg">
        <span className="font-normal">
          {" "}
          {sessionStorage.getItem("Lang") === "kr" ? "جۆر" : "Type"} :
        </span>
        {productInfo.CATEGORY}
      </p>
      <p className="font-medium text-lg">
        <span className="font-normal">
          {" "}
          {sessionStorage.getItem("Lang") === "kr" ? "کواڵیتی" : "Quality"} :
        </span>
        {productInfo.QUALITY}
      </p>
      {sessionStorage.getItem("LOGEDIN") ? (
        sessionStorage.getItem("LOGEDIN").match(true) ? (
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  _id: productInfo.ID,
                  name: productInfo.NAME,
                  quantity: 1,
                  image: productInfo.IMAGE,
                  badge: productInfo.QUALITY,
                  price: productInfo.PRICE,
                  colors: productInfo.CATEGORY,
                })
              )
            }
            className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-Rabar"
          >
            {sessionStorage.getItem("Lang") === "kr"
              ? "زیادکردن بۆ سەبەتە"
              : "Add To Cart"}
          </button>
        ) : null
      ) : null}
      {sessionStorage.getItem("TYPE") ? (
        sessionStorage.getItem("TYPE").match("ADMIN") ? (
          <button
            onClick={async () => {
              await fetch("http://localhost:5000/api/products/deleteProduct", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ID: productInfo.ID }),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }

                  return response.json(); // Parse the response JSON
                })
                .then((data) => {
                  console.log(data);
                  window.setTimeout(function () {
                    // Move to a new location or you can do something else
                    window.location.href = "http://localhost:3000/";
                  }, 500);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
            className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
          >
            {sessionStorage.getItem("Lang") === "kr"
              ? "لابردن لە کۆگا"
              : "Remove From Store"}
          </button>
        ) : null
      ) : null}
      {/* <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p> */}
    </div>
  );
};

export default ProductInfo;
