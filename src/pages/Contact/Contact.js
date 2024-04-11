import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  // ========== Error Messages Start here ============
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  // ========== Error Messages End here ==============
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handlePost = async (e) => {
    e.preventDefault();
    if (!clientName) {
      sessionStorage.getItem("Lang") === "kr"
        ? setErrClientName("ناوەکات داخڵ بکە")
        : setErrClientName("Enter Your Name");
    }
    if (!email) {
      sessionStorage.getItem("Lang") === "kr"
        ? setErrEmail("ئیمەیڵەکەت داخڵ بکە")
        : setErrEmail("Enter Your Email");
    } else {
      if (!EmailValidation(email)) {
        sessionStorage.getItem("Lang") === "kr"
          ? setErrEmail("ئیمەیڵەکە دەبێت ڕاستبێت")
          : setErrEmail("Enter A Valid Email");
      }
    }
    if (!messages) {
      sessionStorage.getItem("Lang") === "kr"
        ? setErrMessages("نامەکەت داخڵ بکە")
        : setErrMessages("Enter The Message");
    }
    if (clientName && email && EmailValidation(email) && messages) {
      await fetch("http://localhost:5000/api/users/Notifi", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EMAIL: "diary.313205014@uhd.edu.iq",
          BODY: messages,
          NAME: clientName,
          CEMAIL: email,
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
          sessionStorage.getItem("Lang") === "kr"
            ? setSuccessMsg(
                `سوپاس بەڕێز ${clientName}, نامەکەت گەیشتووە بە دەستمان. لە کاتی هەبووی هەر شتێکدا بە ئیمەیڵ پەیوەندیت پێوە دەکەین بۆ ${email}.`
              )
            : setSuccessMsg(
                `Thanks Mr/Mrs ${clientName}, We have received your letter. We will contact you by email if anything is available${email}.`
              );
        })
        .catch((error) => {
          console.error("Error:", error);
          sessionStorage.getItem("Lang") === "kr"
            ? setSuccessMsg("ببورە هەڵەیەک ڕوویدا لە کاتی ناردنی داواکاریەکەت")
            : setSuccessMsg(
                "Sorry A Problem Occured While Sending Your Message"
              );
        });
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs
        title={sessionStorage.getItem("Lang") === "kr" ? "پەیوەندی" : "Contant"}
        prevLocation={prevLocation}
      />
      {successMsg ? (
        <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
      ) : (
        <form className="pb-20">
          <h1 className="font-Rabar font-semibold text-3xl">
            {sessionStorage.getItem("Lang") === "kr"
              ? "ئەم فۆڕمە پڕبکەوە"
              : "Fill Out This Form"}
          </h1>
          <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
            <div>
              <p className="text-base font-Rabar font-semibold px-2">
                {sessionStorage.getItem("Lang") === "kr" ? "ناو" : "Nameء"}
              </p>
              <input
                onChange={handleName}
                value={clientName}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder={
                  sessionStorage.getItem("Lang") === "kr"
                    ? "ناوەکەت داخڵ بکە"
                    : "Enter The Name"
                }
              />
              {errClientName && (
                <p className="text-red-500 text-sm font-Rabar font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errClientName}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-Rabar font-semibold px-2">
                {sessionStorage.getItem("Lang") === "kr" ? "ئیمەیڵ" : "Email"}
              </p>
              <input
                onChange={handleEmail}
                value={email}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="email"
                placeholder={
                  sessionStorage.getItem("Lang") === "kr"
                    ? "ئیمەیڵەکەت داخڵ بکە"
                    : "Enter The Email"
                }
              />
              {errEmail && (
                <p className="text-red-500 text-sm font-Rabar font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errEmail}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-Rabar font-semibold px-2">
                {sessionStorage.getItem("Lang") === "kr"
                  ? "نامەکەت"
                  : "Message"}{" "}
              </p>
              <textarea
                onChange={handleMessages}
                value={messages}
                cols="30"
                rows="3"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                type="text"
                placeholder={
                  sessionStorage.getItem("Lang") === "kr"
                    ? "نامەکەت داخڵ بکە"
                    : "Enter The Message"
                }
              ></textarea>
              {errMessages && (
                <p className="text-red-500 text-sm font-Rabar font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errMessages}
                </p>
              )}
            </div>
            <button
              onClick={handlePost}
              className="w-44 bg-primeColor text-gray-200 h-10 font-Rabar text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
            >
              {sessionStorage.getItem("Lang") === "kr" ? "ناردن" : "Send"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Contact;
