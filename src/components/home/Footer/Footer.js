import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { Link } from "react-router-dom";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = async () => {
    if (emailInfo === "") {
      sessionStorage.getItem("Lang") === "kr"
        ? setErrMsg("!تکایە ئیمەیڵێک داخڵ بکە")
        : setErrMsg("Enter Your Email");
    } else if (!emailValidation(emailInfo)) {
      sessionStorage.getItem("Lang") === "kr"
        ? setErrMsg("!تکایە با ئیمەیڵەکە ڕاست بێت")
        : setErrMsg("Enter A Valid Email");
    } else {
      await fetch("http://localhost:5000/api/users/subscribe", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EMAIL: emailInfo,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the response JSON
        })
        .then((data) => {
          console.log(data);
          setSubscription(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (
    <div className="w-full bg-[#F5F5F3] py-20">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-2">
          <FooterListTitle
            title={
              sessionStorage.getItem("Lang") === "kr"
                ? "زیاتر لەسەر دەرمانەکان"
                : "More On Darmanakan"
            }
          />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%] text-left">
              {sessionStorage.getItem("Lang") === "kr"
                ? "دیدگاکەمان دروستکردنی دیمەنێکی چاودێری تەندروستیە کە تاکەکان بتوانن بە متمانەوە تێچووی چاودێری تەندروستی خۆیان بەڕێوەببەن، کەدەبێتە هۆی دەرئەنجامە تەندروستییە باشترەکان"
                : "Our vision is to create a healthcare landscape where individuals can confidently manage their healthcare costs, leading to better health outcomes"}
            </p>
            <ul className="flex items-center gap-2">
              <a href="" target="_blank" rel="noreferrer">
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaYoutube />
                </li>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaGithub />
                </li>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaLinkedin />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div>
          <FooterListTitle
            title={
              sessionStorage.getItem("Lang") === "kr"
                ? "دەرمانەکان"
                : "Darmanakan"
            }
          />
          <ul className="flex flex-col gap-2">
            <Link to="/shop">
              <li className="font-Rabar text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                {sessionStorage.getItem("Lang") === "kr"
                  ? "دەرزیەکان"
                  : "Injections"}
              </li>
            </Link>
            <Link to="/shop">
              {" "}
              <li className="font-Rabar text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                {sessionStorage.getItem("Lang") === "kr" ? "حەبەکان" : "Pills"}
              </li>
            </Link>

            <Link to="/shop">
              <li className="font-Rabar text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                {sessionStorage.getItem("Lang") === "kr"
                  ? "گیراوەکان"
                  : "Liquids"}
              </li>
            </Link>

            <Link to="/shop">
              {" "}
              <li className="font-Rabar text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                {sessionStorage.getItem("Lang") === "kr"
                  ? "بابەتی تر"
                  : "Others"}{" "}
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <FooterListTitle
            title={
              sessionStorage.getItem("Lang") === "kr" ? "هەژمارەکەت" : "Account"
            }
          />
          <ul className="flex flex-col gap-2">
            <Link to="/contact">
              <li className="font-Rabar text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                {sessionStorage.getItem("Lang") === "kr"
                  ? "پەیوەندی"
                  : "Contact"}
              </li>
            </Link>
          </ul>
        </div>
        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <FooterListTitle
            title={
              sessionStorage.getItem("Lang") === "kr"
                ? "زانینی دواترین هەواڵەکان"
                : "Latest News"
            }
          />
          <div className="w-full">
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center text-base font-Rabar font-semibold text-green-600"
              >
                {sessionStorage.getItem("Lang") === "kr"
                  ? "! بە سەرکەوتوی بەژداریت کرد"
                  : "Subscribed Successfully"}
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder={
                      sessionStorage.getItem("Lang") === "kr"
                        ? ". . . ئیمەیڵەکەت داخڵ بکە"
                        : "Plase Your Email . . ."
                    }
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-Rabar text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-white text-lightText w-[30%] h-10 hover:bg-black hover:text-white duration-300 text-base tracking-wide"
                >
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "بەژداربوون"
                    : "Subscribe"}
                </button>
              </div>
            )}

            <Image
              className={`w-[80%] lg:w-[60%] mx-auto ${
                subscription ? "mt-2" : "mt-6"
              }`}
              imgSrc={paymentCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
