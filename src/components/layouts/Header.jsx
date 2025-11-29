import icon from "../../assets/Icon.svg";
import logo from "./../../assets/logo.svg";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { jwtDecode } from "jwt-decode";

import { userLogout } from "../../features/auth/authSlice";

import useProducts from "./../../features/products/hooks/useProducts";

import { FiSearch, FiShoppingCart, FiHeart, FiLogOut } from "react-icons/fi";
import filterProducts from "./../../utilites/helpers";
import { useState } from "react";
import BreButton from "./../ui/BreButton";
import toast from "react-hot-toast";

export default function Header() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchProducts, setSearchProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("userToken");

  const decoded = token && jwtDecode(token);
  
  const { data } = useProducts({ limit: 100 });

  const handleLogout = () => {
    dispatch(userLogout());
    toast.success("You have been logged out successfully.");
    window.location.href = "/";
  };

  const handleSearch = (term) => {
    if (term.trim() === "") {
      setSearchProducts(null);
      return;
    }

    setSearchProducts(
      filterProducts({
        data,
        selectedCategories: [],
        selectedBrands: [],
        priceRange: { min: 0, max: Infinity },
        searchTerm: term,
      })
    );
  };

  if (token) {
  const tokenExpiration = decoded?.exp * 1000;

  const intervalId = setInterval(() => {
    if (Date.now() >= tokenExpiration) {
      handleLogout();
      clearInterval(intervalId); 
    }
  }, 60000); 
}

  return (
    <>
      <header className="shadow-header bg-white fixed w-full top-0 right-0 z-50">
        <div className="flex items-center gap-10 sm:gap-15 md:gap-20 p-2.5">
          <Link to="/" className="flex gap-2 items-center">
            <img src={icon} alt="icon-logo" className="w-10" />
            <img src={logo} alt="logo" className="hidden md:block w-32" />
          </Link>
          <form
            className="flex-1 flex items-center gap-20"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="border border-neutral-700 flex items-center rounded-2xl flex-1">
              <input
                type="text"
                name="search"
                placeholder="Search Products..."
                className="w-fit outline-0 px-4 py-1 border-r border-r-neutral-700 flex-1 text-neutral-700 placeholder:text-neutral-700"
                value={searchTerm}
                onChange={(e) => {
                  const term = e.target.value;
                  setSearchTerm(term);
                  handleSearch(term);
                }}
              />
              <button
                type="submit"
                className="px-1 cursor-pointer text-2xl text-neutral-700"
              >
                <FiSearch />
              </button>
            </div>
            {token ? (
              <UlIcons btnClicked={handleLogout} letter={decoded.name[0]} />
            ) : (
              <BreButton
                title="sign in"
                clickedFun={() => navigate("/signin")}
                addCalsses="hidden md:block"
              />
            )}
          </form>
        </div>
        <UlTitles />
      </header>
      {searchProducts && (
        <ul className="fixed z-1000 top-13 left-1/2 -translate-x-1/2 w-full md:w-2/3 md:mx-auto bg-white shadow-navbar max-h-[60vh] overflow-y-auto rounded-md mt-1 custom-scrollbar p-2 space-y-2">
          {searchProducts.length > 0 ? (
            searchProducts?.map((item) => (
              <li
                key={item._id}
                className="bg-neutral-100 hover:bg-neutral-200 p-2 text-neutral-700"
                onClick={() => {
                  setSearchProducts(null);
                  setSearchTerm("");
                }}
              >
                <Link to={`/products/${item._id}`} className="block">
                  {item.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500 text-center">
              No products found.
            </li>
          )}
        </ul>
      )}
    </>
  );
}

// eslint-disable-next-line no-unused-vars
function IconLink({ path, Icon }) {
  return (
    <li>
      <NavLink
        className="text-neutral-700 hover:text-light-brown transition-colors"
        to={path}
      >
        <Icon />
      </NavLink>
    </li>
  );
}

function UlIcons({ btnClicked, letter }) {
  return (
    <ul className="hidden sm:flex sm:items-center sm:gap-4 text-2xl text-neutral-800">
      <li className="bg-light-brown text-neutral w-8 h-8 text-lg leading-8 text-center rounded-full uppercase">
        {letter}
      </li>
      <IconLink path="/cart" Icon={FiShoppingCart} />
      <IconLink path="/wishlist" Icon={FiHeart} />
      <li
        className="text-neutral-700 cursor-pointer hover:text-light-brown transition-colors"
        onClick={btnClicked}
      >
        <FiLogOut />
      </li>
    </ul>
  );
}
function TitleLink({ path, title }) {
  return (
    <li className="capitalize max-md:w-1/5 text-center">
      <NavLink className="text-neutral-800 block py-2 md:px-4" to={path}>
        {title}
      </NavLink>
    </li>
  );
}
function UlTitles() {
  const token = localStorage.getItem("userToken");
  return (
    <ul className="hidden sm:flex justify-center bg-white md:gap-10 mt-2 border-t border-dotted border-t-neutral-700 ">
      <TitleLink path="/" title="home" />
      <TitleLink path="/products" title="products" />
      <TitleLink path="/categories" title="categories" />
      <TitleLink path="/brands" title="brands" />
      {token && <TitleLink path="/allorders" title="orders" />}
    </ul>
  );
}
