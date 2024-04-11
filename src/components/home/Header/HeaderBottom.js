import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {
  FaSearch,
  FaUser,
  FaCaretDown,
  FaShoppingCart,
  FaExchangeAlt,
} from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { itemss, paginationItems } from "./getter";

const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [showLang, setShowLang] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  async function gg() {
    await fetch("api/products/getProducts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response JSON
      })
      .then((data) => {
        itemss(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  gg();
  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.NAME.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="text-right	 flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[16px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder={
                sessionStorage.getItem("Lang") === "kr"
                  ? ". . . بگەڕێ بە دوای دەرماندا"
                  : "Seacrh For Medecine . . ."
              }
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {searchQuery &&
                  filteredProducts.map((item) => (
                    <div
                      onClick={() =>
                        navigate(
                          `/product/${item.NAME.toLowerCase()
                            .split(" ")
                            .join("")}`,
                          {
                            state: {
                              item: item,
                            },
                          }
                        ) &
                        setShowSearchBar(true) &
                        setSearchQuery("")
                      }
                      key={item.ID}
                      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                    >
                      <img className="w-24" src={item.IMAGE} alt="productImg" />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg">{item.NAME}</p>
                        {/* <p className="text-xs">{item.Description}</p> */}
                        <p className="text-sm">
                          Price:{" "}
                          <span className="text-primeColor font-semibold">
                            ${item.PRICE}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          {/* Language */}
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex">
              <FaUser />
              <FaCaretDown />
            </div>
            <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
              <div onClick={() => setShowLang(!showLang)} className="flex">
                <FaExchangeAlt size={22} />
                <FaCaretDown />
              </div>
              {showLang && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
                >
                  <Link
                    onClick={() => {
                      sessionStorage.setItem("Lang", "en");
                      window.location.reload();
                    }}
                  >
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      English
                    </li>
                  </Link>
                  <Link
                    onClick={() => {
                      sessionStorage.setItem("Lang", "kr");
                      window.location.reload();
                    }}
                  >
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      کوردی
                    </li>
                  </Link>
                </motion.ul>
              )}
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >
                {sessionStorage.getItem("LOGEDIN") ? (
                  sessionStorage.getItem("LOGEDIN").match(true) ? null : (
                    <Link to="/signin">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        {sessionStorage.getItem("Lang") === "kr"
                          ? "داخڵبوون"
                          : "Login"}
                      </li>
                    </Link>
                  )
                ) : (
                  <Link to="/signin">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "داخڵبوون"
                        : "Login"}
                    </li>
                  </Link>
                )}

                {sessionStorage.getItem("LOGEDIN") ? (
                  sessionStorage.getItem("LOGEDIN").match(true) ? null : (
                    <Link onClick={() => setShowUser(false)} to="/signup">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        {sessionStorage.getItem("Lang") === "kr"
                          ? "دروستکردنی هەژمار"
                          : "Sign Up"}
                      </li>
                    </Link>
                  )
                ) : (
                  <Link onClick={() => setShowUser(false)} to="/signup">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "دروستکردنی هەژمار"
                        : "Sign Up"}
                    </li>
                  </Link>
                )}

                {sessionStorage.getItem("LOGEDIN") ? (
                  sessionStorage.getItem("LOGEDIN").match(true) ? (
                    <Link onClick={() => setShowUser(false)} to="/profile">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        {sessionStorage.getItem("Lang") === "kr"
                          ? "پرۆفایل"
                          : "Profile"}
                      </li>
                    </Link>
                  ) : null
                ) : null}
              </motion.ul>
            )}

            {sessionStorage.getItem("LOGEDIN") ? (
              sessionStorage.getItem("LOGEDIN").match(true) ? (
                sessionStorage.getItem("TYPE").match("ADMIN") ? null : (
                  <Link to="/cart">
                    <div className="relative">
                      <FaShoppingCart />
                      <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                        {products.length > 0 ? products.length : 0}
                      </span>
                    </div>
                  </Link>
                )
              ) : null
            ) : null}
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
