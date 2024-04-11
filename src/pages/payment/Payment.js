import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Image from "../../components/designLayouts/Image";
import { MdMoneyOff } from "react-icons/md";
import { paymentCard } from "../../assets/images/index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/orebiSlice";

const Payment = () => {
  const dispatch = useDispatch();

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />

      <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
        <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
          <div className="w-full pt-1 pb-5">
            <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <MdMoneyOff size={50}></MdMoneyOff>
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-center font-bold text-xl uppercase">
              Secure payment info
            </h1>
          </div>
          <div className="mb-3 flex -mx-2" name="myForm">
            <div className="px-2">
              <label for="type2" className="flex items-center cursor-pointer">
                <input className="h-5 w-5 text-indigo-500" />
                <Image imgSrc={paymentCard} className="h-8 ml-3"></Image>
              </label>
            </div>
          </div>

          <div className="This is the Not FastPay">
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">
                Name on Account
              </label>
              <div>
                <input
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="John Smith"
                  type="text"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="font-bold text-sm mb-2 ml-1">
                Card number/Phone Number
              </label>
              <div>
                <input
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="0000 0000 0000 0000"
                  type="text"
                />
              </div>
            </div>
            <div className="mb-3 -mx-2 flex items-end"></div>

            <div>
              <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                <Link to="/shop" onClick={() => dispatch(resetCart())}>
                  پارەدان
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
