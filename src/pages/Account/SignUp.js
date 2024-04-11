import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { DropdownList } from "react-widgets";
import { Dropdown } from "primereact/dropdown";

const SignUp = () => {
  const [selectedTypeBasic, setSelectedTypeBasic] = useState("");
  const [selectedTypeBussiness, setSelectedTypeBussiness] = useState("");
  const [selectedTypeBoth, setSelectedTypeBoth] = useState("");
  // ============= Initial State Start here =============
  const [clientName, setClientName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [ss, setss] = useState("");

  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errClientName, setErrClientName] = useState("");
  const [errCode, setErrCode] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  var okkk = false;
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleCode = (e) => {
    setCode(e.target.value);
    setErrCode("");
  };
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleImage = (e) => {
    setImage(e.target.value);
  };

  // ============= Event Handler End here ===============
  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (checked) {
      if (!clientName) {
        sessionStorage.getItem("Lang") === "kr"
          ? setErrClientName("تکایە ناوت داخڵ بکە")
          : setErrClientName("Enter Name");
      }
      if (!email) {
        sessionStorage.getItem("Lang") === "kr"
          ? setErrEmail("تکایە ئیمەیڵەکەت داخڵ بکە")
          : setErrEmail("Enter Email");
      } else {
        if (!EmailValidation(email)) {
          sessionStorage.getItem("Lang") === "kr"
            ? setErrEmail("ئیمەیڵەکەت دەبیت درووست بێت")
            : setErrEmail("Enter Valid Email");
        }
      }
      if (!phone) {
        sessionStorage.getItem("Lang") === "kr"
          ? setErrPhone("تکایە ژمارەی مۆبایلەکەت داخڵ بکە")
          : setErrPhone("Enter Phone");
      }
      if (!password) {
        sessionStorage.getItem("Lang") === "kr"
          ? setErrPassword("تکایە وشەی تێپەڕ داخڵ بکە")
          : setErrPassword("Enter Password");
      } else {
        if (password.length < 6) {
          sessionStorage.getItem("Lang") === "kr"
            ? setErrPassword("تکایە وشەی تێپەڕ دەبێت لە ٦ زیاتر بێت")
            : setErrPassword("More Then 6");
        }
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
      if (selectedTypeBasic && selectedTypeBussiness) {
        sessionStorage.getItem("Lang") === "kr"
          ? setErrPassword("هەردوو جۆرەکە نابێت")
          : setErrPassword("Not Both Checked");
        console.log(selectedTypeBoth);
      } else if (!selectedTypeBasic && !selectedTypeBussiness) {
        sessionStorage.getItem("Lang") === "kr"
          ? setErrPassword("تکایە جۆرێک هەڵبژێرە")
          : setErrPassword("Choose One");
      } else {
        setSelectedTypeBoth(!selectedTypeBoth);
        if (selectedTypeBasic) {
          setss("BASIC");
        } else if (selectedTypeBussiness) {
          setss("BUSSINESS");
        }
      }
      // ============== Getting the value ==============
      if (
        clientName &&
        email &&
        EmailValidation(email) &&
        password &&
        password.length >= 6 &&
        selectedTypeBoth
      ) {
        await fetch("http://localhost:5000/api/users/Notifi", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            EMAIL: email,
            VER: "yes",
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
            okkk = true;
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            okkk
              ? gg()
              : sessionStorage.getItem("Lang") === "kr"
              ? setSuccessMsg("هەڵەیەک ڕوویدا ")
              : setSuccessMsg(`Sorry Invalid Error Happend`);
          });

        function gg() {
          sessionStorage.getItem("Lang") === "kr"
            ? setSuccessMsg("بە سەرکەوتوی تۆمار کرا")
            : setSuccessMsg(`Account Registerd, Bravoo!`);
        }
      }
    }
  };

  // VERIFYYYY
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!code) {
      sessionStorage.getItem("Lang") === "kr"
        ? setErrCode("تکایە کۆد داخڵ بکە")
        : setErrCode("Enter code");
    }

    // ============== Getting the value ==============
    if (code === "8686") {
      await fetch("http://localhost:5000/api/users/createUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NAME: clientName,
          EMAIL: email,
          PASSWORD: password,
          PHONE: phone,
          TYPE: ss,
          IMAGE: image,
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
            ? setSuccessMsg("هەڵەیەک ڕوویدا ")
            : setSuccessMsg(`Sorry Invalid Error Happend`);
        });

      function gg() {
        sessionStorage.getItem("Lang") === "kr"
          ? setSuccessMsg("بە سەرکەوتوی تۆمار کرا")
          : setSuccessMsg(`Account Registerd, Bravoo!`);
        window.setTimeout(function () {
          // Move to a new location or you can do something else
          window.location.href = "http://localhost:3000/signin";
        }, 2000);
      }

      setClientName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setCode("");
    } else {
      sessionStorage.getItem("Lang") === "kr"
        ? setErrCode("!کۆدەکە هەڵەیە")
        : setErrCode("Code is wrong!");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-start">
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
            <p className="text-sm font-Rabar font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              {sessionStorage.getItem("Lang") === "kr"
                ? "© دەرمانەکان"
                : "© Medicines"}
            </p>
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
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-Rabar underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                {sessionStorage.getItem("Lang") === "kr"
                  ? " درووستکردنی هەژمارەکەت"
                  : "Register Your Account"}
              </h1>
              <div className="flex flex-col gap-3">
                {/* client name */}
                <div className="flex flex-col gap-.5 text-right">
                  <p className="font-Rabar text-base font-semibold text-gray-600">
                    {sessionStorage.getItem("Lang") === "kr" ? " كۆد" : "Code"}
                  </p>
                  <input
                    onChange={handleCode}
                    value={code}
                    className="w-full text-right h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder={
                      sessionStorage.getItem("Lang") === "kr" ? "کۆد" : "Code"
                    }
                  />
                  {errCode && (
                    <p className="text-sm text-red-500 text-right font-Rabar font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errCode}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleVerify}
                  className={`${"bg-primeColor hover:bg-black hover:text-white cursor-pointer"} w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "درووستکردنی هەژمار"
                    : "Register"}
                </button>
                <p className="text-sm text-center font-Rabar font-medium">
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "هەژمارت هەیە؟"
                    : "Have Account?"}{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? " چوونە ژوورەوە"
                        : "Sign in"}
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-Rabar underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                {sessionStorage.getItem("Lang") === "kr"
                  ? " درووستکردنی هەژمارەکەت"
                  : "Register Your Account"}
              </h1>
              <div className="flex flex-col gap-3">
                {/* client name */}
                <div className="flex flex-col gap-.5 text-right">
                  <p className="font-Rabar text-base font-semibold text-gray-600">
                    {sessionStorage.getItem("Lang") === "kr"
                      ? " ناوی تەواو"
                      : "Full Name"}
                  </p>
                  <input
                    onChange={handleName}
                    value={clientName}
                    className="w-full text-right h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder={
                      sessionStorage.getItem("Lang") === "kr"
                        ? " ناوی تەواو"
                        : "Full Name"
                    }
                  />
                  {errClientName && (
                    <p className="text-sm text-red-500 text-right font-Rabar font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errClientName}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="flex flex-col gap-.5 text-right">
                  <p className="font-Rabar text-base font-semibold text-gray-600">
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "ئیمەیڵەکەت"
                      : "Email"}
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm text-right placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@workemail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 text-right font-Rabar font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
                {/* Phone Number */}
                <div className="flex flex-col gap-.5 text-right">
                  <p className="font-Rabar text-base font-semibold text-gray-600">
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "ژمارەی مۆبایلەکەت"
                      : "Phone"}
                  </p>
                  <input
                    onChange={handlePhone}
                    value={phone}
                    className="w-full h-8 placeholder:text-sm text-right placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="0750 123 4567"
                  />
                  {errPhone && (
                    <p className="text-sm text-red-500 font-Rabar text-right font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPhone}
                    </p>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5 text-right">
                  <p className="font-Rabar text-base font-semibold text-gray-600">
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "وشەی تێپەڕ"
                      : "Password"}
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 text-right placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder={
                      sessionStorage.getItem("Lang") === "kr"
                        ? "وشەی تێپەڕ"
                        : "Password"
                    }
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 text-right font-Rabar font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
                {/* Image */}
                <div className="flex flex-col gap-.5 text-right">
                  <p className="font-Rabar text-base font-semibold text-gray-600">
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "ڵینکی ڕەسم"
                      : "Image Link"}
                  </p>
                  <input
                    onChange={handleImage}
                    value={image}
                    className="w-full h-8 text-right placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder={
                      sessionStorage.getItem("Lang") === "kr"
                        ? "ڵینکی ڕەسم"
                        : "Image Link"
                    }
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 text-right font-Rabar font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
                {/* Address */}
                <div className="flex items-start mdl:items-center gap-2 ">
                  <input
                    onChange={() => setSelectedTypeBasic(!selectedTypeBasic)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer "
                    type="checkbox"
                  />
                  <p className="text-sm  text-primeColor">
                    {" "}
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "تایبەت"
                      : "Personal"}{" "}
                  </p>
                  <input
                    onChange={() =>
                      setSelectedTypeBussiness(!selectedTypeBussiness)
                    }
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    {" "}
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "بازرگانی"
                      : "BUSSINESS"}{" "}
                  </p>
                </div>
                {/* City */}

                {/* Country */}

                {/* Zip code */}

                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "من ڕازیم بە"
                      : "I aggree to"}{" "}
                    <span className="text-blue-500">
                      {" "}
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "خزمەت و یاسا"
                        : "Privacy And "}{" "}
                    </span>
                    و{" "}
                    <span className="text-blue-500">
                      {" "}
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "ڕێسای"
                        : "Policy"}{" "}
                    </span>{" "}
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "دەرمانەکان"
                      : "Your Medecine"}
                  </p>
                </div>
                <button
                  onClick={handleSignUp}
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "درووستکردنی هەژمار"
                    : "Register"}
                </button>
                <p className="text-sm text-center font-Rabar font-medium">
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "هەژمارت هەیە؟"
                    : "Have Account?"}{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? " چوونە ژوورەوە"
                        : "Sign in"}
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

export default SignUp;
