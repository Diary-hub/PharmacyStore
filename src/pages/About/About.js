import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs
        title={sessionStorage.getItem("Lang") === "kr" ? "دەربارە" : "About"}
        prevLocation={prevLocation}
      />
      <div className="pb-10">
        <h1 className=" text-right max-w-[600px] text-base mb-2 text-lg">
          {sessionStorage.getItem("Lang") === "kr"
            ? "دەربارەی ئێمە"
            : "About us"}
        </h1>
        <h1 className=" text-right max-w-[600px] text-base text-lightText mb-2">
          {sessionStorage.getItem("Lang") === "kr"
            ? "بەخێربێن بۆ دەرمانەکان، سەرچاوەی متمانەپێکراوت بۆ نرخی نوێی دەرمان و زانیارییەکانی چاودێری تەندروستی. ئێمە تێدەگەین کە دەستڕاگەیشتن بە نرخی ورد و هەنووکەیی دەرمانەکان زۆر گرنگە بۆ ئەو کەس و خێزانانەی کە بەدوای چارەسەری چاودێری تەندروستی گونجاودا دەگەڕێن. ئەرکی ئێمە بەهێزکردنی تۆیە بەو زانیاریانەی کە پێویستتانە بۆ بڕیاردانی ئاگادارانە سەبارەت بە خەرجییەکانی چاودێری تەندروستی"
            : "Welcome to Medicines, your trusted source for up-to-date drug prices and healthcare information. We understand that access to accurate and current drug pricing is critical for individuals and families seeking affordable healthcare treatments. Our mission is to empower you with the information you need to make informed decisions about health care spending"}
        </h1>
        <h1 className=" text-right max-w-[600px] text-base text-lg mb-2">
          {sessionStorage.getItem("Lang") === "kr"
            ? "پابەندبوونمان"
            : "Our commitment"}
        </h1>

        <h1 className="  text-right max-w-[600px] text-base text-lightText mb-2">
          {sessionStorage.getItem("Lang") === "kr"
            ? "لە دەرمانەکان، ئێمە پابەندین بە دابینکردنی پلاتفۆرمێکی بەکارهێنەر دۆستانە کە زانیاری نرخدانان لە کاتی ڕاستەقینەدا بۆ کۆمەڵێک دەرمانی بەرفراوان پێشکەش دەکات. ئێمە دەزانین کە گەشتکردن بە ئاڵۆزییەکانی تێچووی چاودێری تەندروستی دەتوانێت زۆر قورس بێت، هەر بۆیە ئێمە ئاسانکاری پرۆسەکە بۆ ئێوە کردووە بە یەکەمایەتی خۆمان"
            : "At Medicines, we are committed to providing a user-friendly platform that provides real-time pricing information for a wide range of medicines. We know that navigating the complexities of healthcare costs can be overwhelming, which is why we’ve made simplifying the process for you our priority"}
        </h1>

        <h1 className="max-w-[600px] text-base mb-2 text-lg  text-right">
          {sessionStorage.getItem("Lang") === "kr"
            ? "دیدگای ئێمە"
            : "Our Vision"}
        </h1>

        <h1 className="  text-right max-w-[600px] text-base text-lightText mb-2">
          {sessionStorage.getItem("Lang") === "kr"
            ? "دیدگاکەمان دروستکردنی دیمەنێکی چاودێری تەندروستیە کە تاکەکان بتوانن بە متمانەوە تێچووی چاودێری تەندروستی خۆیان بەڕێوەببەن، کە دەبێتە هۆی دەرئەنجامە تەندروستییە باشترەکان. ئێمە داهاتوویەک پێشبینی دەکەین کە هەموو کەسێک بتوانێت دەستی بەو دەرمانانە بگات کە پێویستیانە بەبێ ئەوەی بارگرانی فشاری دارایی لەسەر بێت.s"
            : "Our vision is to create a healthcare landscape where individuals can confidently manage their healthcare costs, leading to better health outcomes. We envision a future where everyone can access the medicines they need without the burden of financial pressure."}
        </h1>

        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            {sessionStorage.getItem("Lang") === "kr"
              ? " بەردەوامبوون لە گەڕان"
              : "Continue Shopping"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
