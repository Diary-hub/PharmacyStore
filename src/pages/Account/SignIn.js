import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";

const SignIn = () => {
  // ============= Initial State Start here =============
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var okkk = false;
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // ============= Event Handler End here ===============
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email) {
      sessionStorage.getItem("Lang") === "kr"
        ? setErrEmail("تکایە ئیمەیڵەکەت داخڵ بکە")
        : setErrEmail("Enter The Email");
    }

    if (!password) {
      sessionStorage.getItem("Lang") === "kr"
        ? setErrPassword("تکایە وشەی تێپەڕ داخڵ بکە")
        : setErrPassword("Enter The Password");
    }
    // ============== Getting the value ==============
    if (email && password) {
      await fetch("http://localhost:5000/api/users/loginUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EMAIL: email, PASSWORD: password }),
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
          console.log(data.data[0].TYPE);
          console.log(data.data[0].IMAGE);
          sessionStorage.setItem("TYPE", data.data[0].TYPE);
          sessionStorage.setItem("CREATED", data.data[0].CREATED);
          sessionStorage.setItem("NAME", data.data[0].NAME);
          sessionStorage.setItem("IMAGE", data.data[0].IMAGE);
          sessionStorage.setItem("PHONE", data.data[0].PHONE);
          sessionStorage.setItem("EMAIL", data.data[0].EMAIL);
        })
        .catch((error) => {
          okkk = false;
          console.error("Error:", error);
        })
        .finally(() => {
          okkk
            ? gg()
            : sessionStorage.getItem("Lang") === "kr"
            ? setSuccessMsg(`ببورە هیچ ئەکاونتێک بەو ناونیشانە بوونی نیە`)
            : setSuccessMsg(`Sorry, Your Email And Password Are Invalid`);
        });

      function gg() {
        sessionStorage.getItem("Lang") === "kr"
          ? setSuccessMsg(`بەسەرکوتووی داخڵ بوویت`)
          : setSuccessMsg("Logged In Nicely . . .");
        sessionStorage.setItem("LOGEDIN", true);
        window.setTimeout(function () {
          // Move to a new location or you can do something else
          window.location.href = "http://localhost:3000/";
        }, 2000);
      }

      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-Rabar text-xl font-medium">
              {sessionStorage.getItem("Lang") === "kr"
                ? "بە ئەکاونت داخڵ ببە بۆ کار ئاسانی زیاتر"
                : "Sign in with an account for more convenience"}
            </h1>
            <p className="text-base">
              {sessionStorage.getItem("Lang") === "kr"
                ? "بە هەژمارەکەت نزیکتریت لێمان"
                : "You are closer to us with your account"}
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-Rabar">
                {sessionStorage.getItem("Lang") === "kr"
                  ? "خێرا دەستپێبکە لەگەڵ دەرمانەکان"
                  : "Start quickly with medications"}
              </span>
              <br />
              {sessionStorage.getItem("Lang") === "kr"
                ? "بە زووترین کات هەژمارەکەت درووست بکە"
                : "Create your account as soon as possible"}
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-Rabar">
                {sessionStorage.getItem("Lang") === "kr"
                  ? "هەموو خزمەتگوزاریەکان بە دەستبهێنە"
                  : "Get all the services"}
              </span>
              <br />
              {sessionStorage.getItem("Lang") === "kr"
                ? "لە کاتی هەبوونی هەژماردا هەموو خزمەتگوزاریەکان بەردەست دەبێت"
                : "All services will be available once you have an account"}
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-Rabar">
                {sessionStorage.getItem("Lang") === "kr"
                  ? "ماڵپەڕێکە جێی متمانەیە"
                  : "It is a reliable website"}
              </span>
              <br />
              {sessionStorage.getItem("Lang") === "kr"
                ? "زانیاریەکانمان تایبەتە و متمانە پێکراوە"
                : "Our information is private and trusted"}
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-Rabar font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                {sessionStorage.getItem("Lang") === "kr"
                  ? "© دەرمانەکان"
                  : "© Medicines"}
              </p>
            </Link>
            <p className="text-sm font-Rabar font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              {sessionStorage.getItem("Lang") === "kr" ? "مەرجەکان" : "Terms"}
            </p>
            <p className="text-sm font-Rabar font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              {sessionStorage.getItem("Lang") === "kr"
                ? "تایبەتمەندیەتی"
                : "Privacy"}
            </p>
            <p className="text-sm font-Rabar font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              {sessionStorage.getItem("Lang") === "kr" ? "ئاسایشی" : "Policy"}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-Rabar">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-Rabar font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Waiting
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-Rabar underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                {sessionStorage.getItem("Lang") === "kr"
                  ? "چوونە ژوورەوە"
                  : "Login"}
              </h1>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-Rabar text-right text-base font-semibold text-gray-600">
                    {sessionStorage.getItem("Lang") === "kr"
                      ? " ئیمەیڵی ئەلەکترۆنی"
                      : "Email"}
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full text-right h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder={
                      sessionStorage.getItem("Lang") === "kr"
                        ? ". . .ئیمەیڵی ئەلەکترۆنی لێرەدا بنووسە"
                        : "Email Here"
                    }
                  />
                  {errEmail && (
                    <p className="text-sm text-right text-red-500 font-Rabar font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-Rabar text-base font-semibold text-gray-600 text-right">
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "وشەی تێپەڕ"
                      : "Password"}
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full text-right h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder={
                      sessionStorage.getItem("Lang") === "kr"
                        ? ". . .وشەی تێپەڕ لێرەدا بنووسە"
                        : "Password Here"
                    }
                  />
                  {errPassword && (
                    <p className="text-sm text-right text-red-500 font-Rabar font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSignUp}
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                >
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "چوونە ژوورەوە"
                    : "Login"}
                </button>
                <p className="text-sm text-center font-Rabar font-medium">
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "هەژمارت نیە؟"
                    : "No Account?"}{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "درووستکردنی هەژمار"
                        : "Register"}
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
