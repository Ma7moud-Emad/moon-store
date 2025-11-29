import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  FiBox,
  FiHeart,
  FiHome,
  FiMoreHorizontal,
  FiShoppingCart,
} from "react-icons/fi";

import { BiCategory } from "react-icons/bi";

export default function Navbar({ show, setShow }) {
  const token = useSelector((state) => state.user.token);

  return (
    <nav className="w-full fixed bottom-0 left-0 z-50 px-2 sm:hidden bg-white shadow-navbar">
      <ul className="flex items-center capitalize">
        <Item path="/" Icon={FiHome} title="home" />
        <Item path="/products" Icon={FiBox} title="products" />
        {token ? (
          <>
            <Item path="/cart" Icon={FiShoppingCart} title="cart" />
            <Item path="/wishlist" Icon={FiHeart} title="wishlist" />
          </>
        ) : (
          <>
            <Item path="/categories" Icon={BiCategory} title="categories" />
          </>
        )}

        <Item
          Icon={FiMoreHorizontal}
          title="more"
          show={show}
          setShow={setShow}
        />
      </ul>
    </nav>
  );
}

// eslint-disable-next-line no-unused-vars
function Item({ path, Icon, title, show, setShow }) {
  return (
    <li className="w-1/5 ">
      {path ? (
        <NavLink
          to={path}
          className="flex flex-col items-center text-lg text-neutral-700 font-medium p-2"
        >
          <Icon className="text-2xl" />
          <p>{title}</p>
        </NavLink>
      ) : (
        <div
          className="flex flex-col items-center text-lg text-neutral-700 font-medium p-2 cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <Icon className="text-2xl" />
          <p>{title}</p>
        </div>
      )}
    </li>
  );
}
