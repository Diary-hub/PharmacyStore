import React, { useState } from "react";
import { Link } from "react-router-dom";
const Admin = () => {
  // ============= Initial State Start here =============
  const [itemName, setItemName] = useState("");
  const [itemCategory, setitemCategory] = useState("");
  const [itemPrice, setitemPrice] = useState("");
  const [itemQuality, setitemQuality] = useState("");
  const [itemDes, setitemDes] = useState("");
  const [itemImage, setitemImage] = useState("");
  const [Notifi, setNotifi] = useState("");

  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errItemName, seterrItemName] = useState("");
  const [errcategory, seterrcategory] = useState("");
  const [errPrice, seterrPrice] = useState("");
  const [errQuality, seterrQuality] = useState("");
  const [errDes, seterrDes] = useState("");
  const [errImg, seterrImg] = useState("");
  var okkk = false;
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");

  const handleItemName = (e) => {
    setItemName(e.target.value);
    seterrItemName("");
  };
  const handleCategory = (e) => {
    setitemCategory(e.target.value);
    seterrcategory("");
  };
  const handlePrice = (e) => {
    setitemPrice(e.target.value);
    seterrPrice("");
  };
  const handleQuality = (e) => {
    setitemQuality(e.target.value);
    seterrQuality("");
  };
  const handleDes = (e) => {
    setitemDes(e.target.value);
    seterrDes("");
  };
  const handleImg = (e) => {
    setitemImage(e.target.value);
    seterrImg("");
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!itemName) {
      sessionStorage.getItem("Lang") === "kr"
        ? seterrItemName("تکایە ناو داخڵ بکە")
        : seterrItemName("Enter The Name");
    }
    if (!itemCategory) {
      sessionStorage.getItem("Lang") === "kr"
        ? seterrcategory("تکایە نابێت بەتاڵبیت")
        : seterrcategory("Not Leave Empty");
    } else if (
      itemCategory.match("Pill") ||
      itemCategory.match("Liquid") ||
      itemCategory.match("Injection") ||
      itemCategory.match("Other")
    ) {
    } else {
      sessionStorage.getItem("Lang") === "kr"
        ? seterrcategory("Pill-Liquid-Injection-Other تکایە یەکێک لەمانە")
        : seterrcategory("Pill-Liquid-Injection-Other ");
    }
    if (!itemDes) {
      sessionStorage.getItem("Lang") === "kr"
        ? seterrDes("تکایە نابێت بەتاڵبیت")
        : seterrDes("Not Leave Empty");
    }
    if (!itemImage) {
      sessionStorage.getItem("Lang") === "kr"
        ? seterrImg("تکایە نابێت بەتاڵبیت")
        : seterrImg("Not Leave Empty");
    }
    if (!itemPrice) {
      sessionStorage.getItem("Lang") === "kr"
        ? seterrPrice("تکایە نابێت بەتاڵبیت")
        : seterrPrice("Not Leave Empty");
    }
    if (!itemQuality) {
      sessionStorage.getItem("Lang") === "kr"
        ? seterrQuality("تکایە نابێت بەتاڵبیت")
        : seterrQuality("Not Leave Empty");
    } else if (itemQuality.match("Low") || itemQuality.match("High")) {
    } else {
      sessionStorage.getItem("Lang") === "kr"
        ? seterrQuality("High - Low تکایە یەکێک لەمانە")
        : seterrQuality("High - Low");
    }
    // if (!address) {
    //   setErrAddress("Enter your address");
    // }
    // if (!city) {
    //   setErrCity("Enter your city name");
    // }
    // if (!country) {
    //   setErrCountry("Enter the country you are residing");
    // }
    // if (!zip) {
    //   setErrZip("Enter the zip code of your area");
    // }

    // ============== Getting the value ==============
    if (
      itemName &&
      itemCategory &&
      itemDes &&
      itemImage &&
      itemPrice &&
      itemQuality
    ) {
      if (Notifi) {
        await fetch("http://localhost:5000/api/users/getUserAll", {
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
            console.log(data);

            data.data.forEach(async (acc) => {
              console.log(acc.EMAIL);

              if (acc.TYPE === "BASIC") {
                await fetch("http://localhost:5000/api/users/Notifi", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ EMAIL: acc.EMAIL }),
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Network response was not ok");
                    }
                    return response.json(); // Parse the response JSON
                  })
                  .then((data) => {
                    console.log(data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }

      await fetch("http://localhost:5000/api/products/createProduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NAME: itemName,
          CATEGORY: itemCategory,
          PRICE: itemPrice,
          QUALITY: itemQuality,
          Description: itemDes,
          IMAGE: itemImage,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            okkk = false;
            console.log(okkk);
            throw new Error("Network response was not ok");
          }

          return response.json(); // Parse the response JSON
        })
        .then((data) => {
          console.log(data);

          okkk = true;
          console.log(okkk);
        })
        .catch((error) => {
          okkk = false;
          console.error("Error:", error);
        })
        .finally(() => {
          okkk
            ? gg()
            : sessionStorage.getItem("Lang") === "kr"
            ? setSuccessMsg("هەڵەیەک ڕوویدا تکایە دووبارە هەوڵ بدەرەوە")
            : setSuccessMsg("There Was A Problem Please Try Again");
        });

      function gg() {
        sessionStorage.getItem("Lang") === "kr"
          ? setSuccessMsg(`بەسەرکەوتووی دەرمانەکە تۆمار کرا`)
          : setSuccessMsg(`Successfully Added Medecine`);
        window.setTimeout(function () {
          // Move to a new location or you can do something else
          window.location.href = "http://localhost:3000/admin";
        }, 500);
      }

      setItemName("");
      setitemCategory("");
      setitemDes("");
      setitemPrice("");
      setitemImage("");
      setitemQuality("");
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="max-w-container mx-auto px-4 ">
        <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
          {successMsg ? (
            <div className="w-[500px]">
              <p className="w-full px-4 py-10 text-green-500 font-medium font-Rabar">
                {successMsg}
              </p>
              <Link to="/admin ">
                <button
                  className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-Rabar font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
                >
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "زیادکردنی دەرمان دووبارە"
                    : "Add Medecine Again"}
                </button>
              </Link>
            </div>
          ) : (
            <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
              <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                <h1 className="font-Rabar underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "زیادکردنی دەرمان"
                    : "Add Medecine"}
                </h1>
                <div className="flex flex-col gap-3">
                  {/* client name */}
                  <div className="flex flex-col gap-.5 text-right">
                    <p className="font-Rabar text-base font-semibold text-gray-600">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "ناوی دەرمان"
                        : "Medecine Name"}
                    </p>
                    <input
                      onChange={handleItemName}
                      value={itemName}
                      className="w-full text-right h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder={
                        sessionStorage.getItem("Lang") === "kr"
                          ? "ناوی دەرمان"
                          : "Medecine Name"
                      }
                    />
                    {errItemName && (
                      <p className="text-sm text-red-500 text-right font-Rabar font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errItemName}
                      </p>
                    )}
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-.5 text-right">
                    <p className="font-Rabar text-base font-semibold text-gray-600">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "جۆری دەرمان"
                        : "Medecine Type"}
                    </p>
                    <input
                      onChange={handleCategory}
                      value={itemCategory}
                      className="w-full h-8 placeholder:text-sm text-right placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder={
                        sessionStorage.getItem("Lang") === "kr"
                          ? "Pills-Liquid-Injections تکایە یەکێک لەمانە"
                          : "One of These Pills-Liquid-Injections"
                      }
                    />
                    {errcategory && (
                      <p className="text-sm text-red-500 text-right font-Rabar font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errcategory}
                      </p>
                    )}
                  </div>
                  {/* Phone Number */}
                  <div className="flex flex-col gap-.5 text-right">
                    <p className="font-Rabar text-base font-semibold text-gray-600">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "نرخی دەرمان"
                        : " Price"}
                    </p>
                    <input
                      onChange={handlePrice}
                      value={itemPrice}
                      className="w-full h-8 placeholder:text-sm text-right placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder={
                        sessionStorage.getItem("Lang") === "kr"
                          ? "1,20 - 100 - 20 بە دۆلار"
                          : "In Dollar"
                      }
                    />
                    {errPrice && (
                      <p className="text-sm text-red-500 font-Rabar text-right font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errPrice}
                      </p>
                    )}
                  </div>
                  {/* Password */}
                  <div className="flex flex-col gap-.5 text-right">
                    <p className="font-Rabar text-base font-semibold text-gray-600">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "کواڵیتی دەرمان"
                        : "Medecine Quality"}
                    </p>
                    <input
                      onChange={handleQuality}
                      value={itemQuality}
                      className="w-full h-8 text-right placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder={
                        sessionStorage.getItem("Lang") === "kr"
                          ? "High-Low تکایە یەکێک لەمانە"
                          : "Type High or Low"
                      }
                    />
                    {errQuality && (
                      <p className="text-sm text-red-500 text-right font-Rabar font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errQuality}
                      </p>
                    )}
                  </div>
                  {/* new input */}
                  <div className="flex flex-col gap-.5 text-right">
                    <p className="font-Rabar text-base font-semibold text-gray-600">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "کورتەیەک لەسەر دەرمان"
                        : "Medecine Description"}
                    </p>
                    <input
                      onChange={handleDes}
                      value={itemDes}
                      className="w-full h-8 text-right placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder={
                        sessionStorage.getItem("Lang") === "kr"
                          ? "کورتەیەک لەسەر دەرمان"
                          : "Medecine Description"
                      }
                    />
                    {errDes && (
                      <p className="text-sm text-red-500 text-right font-Rabar font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errDes}
                      </p>
                    )}
                  </div>
                  {/* new input */}
                  <div className="flex flex-col gap-.5 text-right">
                    <p className="font-Rabar text-base font-semibold text-gray-600">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "ڕەسمی دەرمان"
                        : "Medecine Image"}
                    </p>
                    <input
                      onChange={handleImg}
                      value={itemImage}
                      className="w-full h-8 text-right placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder={
                        sessionStorage.getItem("Lang") === "kr"
                          ? "تکایە لینکی ڕەسمەکە"
                          : "Please The Link Of Image"
                      }
                    />
                    {errImg && (
                      <p className="text-sm text-red-500 text-right font-Rabar font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errImg}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex items-start mdl:items-center gap-2 ">
                    <input
                      onChange={() => setNotifi(!Notifi)}
                      className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                      type="checkbox"
                    />
                    <p className="text-sm text-primeColor">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "ئاگادار کردنەوەی هەژمارەکان"
                        : "Notify The Users"}
                    </p>
                  </div>

                  <button
                    onClick={handleAddItem}
                    // onClick={sendEmail}
                    className={`${"bg-primeColor hover:bg-black hover:text-white cursor-pointer"} w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                  >
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "زیادکردنی دەرمان"
                      : "Add Medecine"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
