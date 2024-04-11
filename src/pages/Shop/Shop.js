import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { setItmes } from "../../constants";
import ReactPaginate from "react-paginate";
import Product from "../../components/home/Products/Product";
import Category from "../../components/pageProps/shopPage/shopBy/Category";
import Price from "../../components/pageProps/shopPage/shopBy/Price";
import NavTitle from "../../components/pageProps/shopPage/shopBy/NavTitle";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const [selected, setSelected] = useState("");
  const [girdViewActive, setGridViewActive] = useState(true);
  const [listViewActive, setListViewActive] = useState(false);
  var [paginationItems, setpaginationItems] = useState([]);
  var refresh = [];

  useEffect(() => {
    const gridView = document.querySelector(".gridView");
    const listView = document.querySelector(".listView");

    gridView.addEventListener("click", () => {
      setListViewActive(false);
      setGridViewActive(true);
    });
    listView.addEventListener("click", () => {
      setGridViewActive(false);
      setListViewActive(true);
    });
  }, [girdViewActive, listViewActive]);

  useEffect(() => {
    async function getProds() {
      console.log(selected);
      await fetch("api/products/getProducts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ CATEGORY: selected }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the response JSON
        })
        .then(async (data) => {
          setItmes(data);

          console.log(selected);
          setpaginationItems((paginationItems = refresh));
          setpaginationItems(paginationItems.push(data.data));
          setpaginationItems(paginationItems[0]); // this makes the ITEMS SHOW
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    getProds();
  }, [selected]);

  function changePrice(firstPrice, secondPrice) {
    var filterdItem = [];
    paginationItems.forEach((item) => {
      if (item.PRICE <= secondPrice && item.PRICE >= firstPrice) {
        filterdItem.push(item);
      }
      console.log(filterdItem);
      setpaginationItems(filterdItem);
    });
  }
  //

  // This is the Function the Gives all THe Items It Name And Details
  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div key={item.ID} className="w-full">
              <Product
                ID={item.ID}
                IMAGE={item.IMAGE}
                NAME={item.NAME}
                PRICE={item.PRICE}
                CATEGORY={item.CATEGORY}
                QUALITY={item.QUALITY}
                Description={item.Description}
              />
            </div>
          ))}
      </>
    );
  }

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const items = paginationItems;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset},`
    // );
    setItemStart(newOffset);
  };

  //

  const priceList = [
    {
      _id: 1,
      priceOne: 0.0,
      priceTwo: 4.99,
    },
    {
      _id: 2,
      priceOne: 5.0,
      priceTwo: 9.99,
    },
    {
      _id: 3,
      priceOne: 10.0,
      priceTwo: 14.99,
    },
    {
      _id: 4,
      priceOne: 15.0,
      priceTwo: 19.99,
    },
    {
      _id: 5,
      priceOne: 20.0,
      priceTwo: 24.99,
    },
    {
      _id: 6,
      priceOne: 25.0,
      priceTwo: 29.99,
    },
  ];

  const prev = [];

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs
        title={
          sessionStorage.getItem("Lang") === "kr" ? "دەرمانەکان" : "Medecine"
        }
      />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          {/* <ShopSideNav /> */}
          <div className="w-full flex flex-col gap-6">
            {/* --> This is the Category Left Side */}
            <Category icons={false} />

            <div className="cursor-pointer">
              <NavTitle
                title={
                  sessionStorage.getItem("Lang") === "kr"
                    ? "نرخی دەرمانەکان"
                    : "Prices"
                }
                icons={false}
              />
              <div className="font-titleFont">
                <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676] ">
                  {priceList.map((item) => (
                    <li
                      key={item._id}
                      onClick={() => {
                        var filterdItem = [];
                        paginationItems.forEach((itemss) => {
                          console.log(item.priceOne);

                          if (
                            itemss.PRICE >= item.priceOne &&
                            itemss.PRICE <= item.priceTwo
                          ) {
                            filterdItem.push(itemss);
                          }
                          console.log(filterdItem);
                          setpaginationItems(filterdItem);
                        });
                      }}
                      className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
                    >
                      ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SIDE */}
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          {/* //////////////////////////////////////// */}
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
            {/* =========================================================
                            Left Part Start here
        ======================================================== */}

            <div className="flex items-center gap-4 hidden">
              <span
                className={`${
                  girdViewActive
                    ? "bg-primeColor text-white"
                    : "border-[1px] border-gray-300 text-[#737373]"
                } w-8 h-8 text-lg flex items-center justify-center cursor-pointer gridView`}
              >
                <BsGridFill />
              </span>
              <span
                className={`${
                  listViewActive
                    ? "bg-primeColor text-white"
                    : "border-[1px] border-gray-300 text-[#737373]"
                } w-8 h-8 text-base flex items-center justify-center cursor-pointer listView`}
              >
                <ImList />
              </span>
            </div>
            {/* =========================================================
                            Left Part End here
        ======================================================== */}
            {/* =========================================================
                            Right Part STart here
        ======================================================== */}
            <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-base text-[#767676] relative">
                <select
                  value={selected}
                  val
                  onChange={(e) => setSelected(e.target.value)}
                  id="countries"
                  className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
                >
                  <option value="" selected={selected}>
                    {sessionStorage.getItem("Lang") === "kr" ? "هەمووی" : "All"}
                  </option>
                  <option value="Pill">
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "حەبەکان"
                      : "Pills"}
                  </option>
                  <option value="Injection">
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "دەرزیەکان"
                      : "Injections"}
                  </option>
                  <option value="Liquid">
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "گیراوەکان"
                      : "Liquids"}
                  </option>
                  <option value="Other">
                    {sessionStorage.getItem("Lang") === "kr"
                      ? "بابەتی تر"
                      : "Others"}
                  </option>
                </select>

                <label className="block">
                  :
                  {sessionStorage.getItem("Lang") === "kr"
                    ? "ڕیزکرن بە"
                    : "Sort By"}
                </label>
              </div>
              <div className="flex items-center gap-2 text-[#767676] relative">
                <select
                  onChange={(e) => itemsPerPageFromBanner(e.target.value)}
                  id="countries"
                  className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                  <option value="48">48</option>
                </select>
                <label className="block">
                  :{sessionStorage.getItem("Lang") === "kr" ? "دانە" : "Items"}
                </label>
              </div>
            </div>
            {/* =========================================================
                            Right Part End here
        ======================================================== */}
          </div>
          {/* ////////////////////////////////////////// */}
          {/* PAGIIINATIONNNNNNNNNNNNNNNNNN */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
              {/* This is the items */}
              <Items currentItems={currentItems} />
            </div>
            <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
              <ReactPaginate
                nextLabel=""
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel=""
                pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                pageClassName="mr-6"
                containerClassName="flex text-base font-semibold font-titleFont py-10"
                activeClassName="bg-black text-white"
              />

              <p className="text-base font-normal text-lightText">
                {sessionStorage.getItem("Lang") === "kr"
                  ? "دەرمانی"
                  : "Showing"}{" "}
                {itemStart === 0 ? 1 : itemStart}{" "}
                {sessionStorage.getItem("Lang") === "kr" ? "بۆ" : "To"}{" "}
                {endOffset}{" "}
                {sessionStorage.getItem("Lang") === "kr" ? "لە" : "From"}{" "}
                {items.length}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
