import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Image from "../../components/designLayouts/Image";

import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Profile = () => {
  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs
        className="flex items-center h-screen w-full justify-center"
        title={sessionStorage.getItem("Lang") === "kr" ? "پڕۆفایل" : "Profile"}
        prevLocation={""}
      />
      <div class="flex items-center h-screen w-full justify-center ">
        <div class="max-w-xl">
          <div class="bg-white shadow-xl rounded-lg py-3">
            <div class="photo-wrapper p-5">
              <Image
                className="w-full h-full"
                imgSrc={sessionStorage.getItem("IMAGE")}
              />
            </div>
            <div class="p-6">
              <h3 class="text-center text-xl text-gray-900  leading-8">
                {sessionStorage.getItem("NAME")}
              </h3>
              <div class="text-center text-gray-400 text-m ">
                <p>{sessionStorage.getItem("TYPE")}</p>
              </div>
              <table class="text-xs my-3">
                <tbody>
                  <tr>
                    <td class="px-2 py-2 text-gray-500  text-xl">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "درووستکراوە لە"
                        : "Created At"}
                    </td>
                    <td class="text-xl px-2 py-2">
                      {sessionStorage.getItem("CREATED")}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-xl px-2 py-2 text-gray-500">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "مۆبایل"
                        : "Phone"}{" "}
                    </td>
                    <td class="text-xl px-2 py-2">
                      +964 {sessionStorage.getItem("PHONE")}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-xl px-2 py-2 text-gray-500 Rabar">
                      {sessionStorage.getItem("Lang") === "kr"
                        ? "ئیمەیڵ"
                        : "Email"}
                    </td>
                    <td class="text-xl px-2 py-2">
                      {sessionStorage.getItem("EMAIL")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
