import React, { useState } from "react";
import { Link } from "react-router-dom";
const Discount = () => {
  // ============= Initial State Start here =============
  const [discountInput, setDiscountInput] = useState("");

  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errdiscountInput, seterrdiscountInput] = useState("");

  var okkk = false;
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");

  const handlediscountInput = (e) => {
    setDiscountInput(e.target.value);
    seterrdiscountInput("");
  };

  const handleDiscount = async (e) => {
    e.preventDefault();

    if (!discountInput) {
      sessionStorage.getItem("Lang") === "kr"
        ? seterrdiscountInput("تکایە  داخڵ بکە")
        : seterrdiscountInput("Enter The discount");
    }

    // ============== Getting the value ==============
    if (discountInput) {
      await fetch("http://localhost:5000/api/users/getUser", {
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
            await fetch("http://localhost:5000/api/users/Notifi", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ EMAIL: acc.EMAIL, SUB: discountInput }),
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
          });
          console.log(data);

          okkk = true;
          console.log(okkk);
        })
        .catch((error) => {
          console.error("Error:", error);
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

      await fetch("http://localhost:5000/api/products/updateProduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ DIS: discountInput }),
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

    function gg() {
      sessionStorage.getItem("Lang") === "kr"
        ? setSuccessMsg(`بەسەرکەوتووی دەرمانەکە تۆمار کرا`)
        : setSuccessMsg(`Successfully Added Medecine`);
      window.setTimeout(function () {
        // Move to a new location or you can do something else
        window.location.href = "http://localhost:3000/discount";
      }, 500);
    }

    setDiscountInput("");
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
              <Link to="/dicount ">
                <button
                  className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-Rabar font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
                >
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "دووبارە"
                    : "Again"}
                </button>
              </Link>
            </div>
          ) : (
            <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
              <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                <h1 className="font-Rabar underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "داشکاندن"
                    : "Discount"}
                </h1>
                <div className="flex flex-col gap-3">
                  {/* client name */}
                  <div className="flex flex-col gap-.5 text-right">
                    <p className="font-Rabar text-base font-semibold text-gray-600">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "ڕێژە"
                        : "Amount"}
                    </p>
                    <input
                      onChange={handlediscountInput}
                      value={discountInput}
                      className="w-full text-right h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder={
                        sessionStorage.getItem("Lang") === "kr" ? "٢٠" : "25"
                      }
                    />
                    {errdiscountInput && (
                      <p className="text-sm text-red-500 text-right font-Rabar font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errdiscountInput}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleDiscount}
                    // onClick={sendEmail}
                    className={`${"bg-primeColor hover:bg-black hover:text-white cursor-pointer"} w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                  >
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "داشکاندن"
                      : "Discount"}
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

export default Discount;
