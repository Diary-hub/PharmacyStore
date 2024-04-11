import React from "react";
import { Link } from "react-router-dom";
import { RiPriceTagLine, RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount, MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";

const SpecialCase = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      {sessionStorage.getItem("LOGEDIN") ? (
        sessionStorage.getItem("LOGEDIN").match(true) ? (
          <Link
            onClick={() => {
              sessionStorage.setItem("LOGEDIN", false);
              sessionStorage.setItem("TYPE", "");
              window.setTimeout(function () {
                // Move to a new location or you can do something else
                window.location.href = "http://localhost:3000/";
              }, 500);
            }}
          >
            <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
              <div className="flex justify-center items-center">
                <MdLogout className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

                <MdLogout className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
              </div>
              <p className="text-xs font-semibold font-Rabar">
                {sessionStorage.getItem("Lang") === "kr"
                  ? "چوونەدەرەوە"
                  : "Logout"}
              </p>
            </div>
          </Link>
        ) : (
          <Link to="/signin">
            <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
              <div className="flex justify-center items-center">
                <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

                <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
              </div>
              <p className="text-s font-semibold font-Rabar">
                {sessionStorage.getItem("Lang") === "kr" ? "داخڵبوون" : "Login"}
              </p>
            </div>
          </Link>
        )
      ) : (
        <Link to="/signin">
          <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
            <div className="flex justify-center items-center">
              <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

              <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
            </div>
            <p className="text-s font-semibold font-Rabar">
              {sessionStorage.getItem("Lang") === "kr" ? "داخڵبوون" : "Login"}
            </p>
          </div>
        </Link>
      )}

      {sessionStorage.getItem("LOGEDIN") ? (
        sessionStorage.getItem("LOGEDIN").match(true) ? (
          sessionStorage.getItem("TYPE").match("ADMIN") ? null : (
            <Link to="/cart">
              <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
                <div className="flex justify-center items-center">
                  <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

                  <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
                </div>
                <p className="text-s font-bold font-Rabar">
                  {sessionStorage.getItem("Lang") === "kr" ? "سەبەتە" : "Cart"}
                </p>
                {products.length > 0 && (
                  <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {products.length}
                  </p>
                )}
              </div>
            </Link>
          )
        ) : null
      ) : null}

      {sessionStorage.getItem("LOGEDIN") ? (
        sessionStorage.getItem("LOGEDIN").match(true) ? (
          sessionStorage.getItem("TYPE").match("ADMIN") ? (
            <Link to="/discount">
              <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
                <div className="flex justify-center items-center">
                  <RiPriceTagLine className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

                  <RiPriceTagLine className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
                </div>
                <p className="text-s font-bold font-Rabar">
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "داشکاندن"
                    : "Discount"}
                </p>
              </div>
            </Link>
          ) : null
        ) : null
      ) : null}
    </div>
  );
};

export default SpecialCase;
