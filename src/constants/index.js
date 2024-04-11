import {
  spfOne,
  spfTwo,
  spfThree,
  spfFour,
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../assets/images/index";

// =================== NavBarList Start here ====================

export const navBarListEn = [
  {
    ID: 1001,
    title: "Home",
    link: "/",
  },
  {
    ID: 1002,
    title: "Shop",
    link: "/shop",
  },
  {
    ID: 1003,
    title: "About",
    link: "/about",
  },
  {
    ID: 1004,
    title: "Contact",
    link: "contact",
  },

  {
    ID: 1005,
    title: "Admin",
    link: "/admin",
  },
];

export const navBarList = [
  {
    ID: 1001,
    title: "سەرەکی",
    link: "/",
  },
  {
    ID: 1002,
    title: "دەرمان",
    link: "/shop",
  },
  {
    ID: 1003,
    title: "دەربارە",
    link: "/about",
  },
  {
    ID: 1004,
    title: "پەیوەندی",
    link: "contact",
  },

  {
    ID: 1005,
    title: "ئەدمین",
    link: "/admin",
  },
];
// =================== NavBarList End here ======================
// =================== Special Offer data Start here ============
export const SplOfferData = [
  {
    ID: "201",
    IMAGE: spfOne,
    NAME: "Cap for Boys",
    PRICE: "35.00",
    CATEGORY: "Blank and White",
    QUALITY: true,
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    ID: "202",
    IMAGE: newArrFour,
    NAME: "Tea Table",
    PRICE: "180.00",
    CATEGORY: "Gray",
    QUALITY: true,
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    ID: "203",
    IMAGE: spfThree,
    NAME: "Headphones",
    PRICE: "25.00",
    CATEGORY: "Mixed",
    QUALITY: true,
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    ID: "204",
    IMAGE: spfFour,
    NAME: "Sun glasses",
    PRICE: "220.00",
    CATEGORY: "Black",
    QUALITY: true,
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];
// console.log(SplOfferData, "OFFERRR");
// =================== Special Offer data End here ==============

// =================== PaginationItems Start here ===============

export var paginationItems = [];
export var oldData = [];
export var refresh = [];

export var setItmes = (data) => {
  console.log("Old Pag" + paginationItems);

  console.log("data", data);
  console.log(JSON.stringify(oldData) == JSON.stringify(data));
  console.log("New Pag" + paginationItems);

  if (JSON.stringify(oldData) == JSON.stringify(data)) {
  } else {
    oldData = data;
    console.log("oldData", oldData);
    data.data.forEach((element) => {
      paginationItems.push(element);
    });
    paginationItems = refresh;
  }
};

// Create a GET request

// =================== PaginationItems End here =================
