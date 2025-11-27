import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import MoreMenu from "./MoreMenu";
import { useState, useEffect, useRef } from "react";

export default function Layout() {
  const [showMenu, setShowMenu] = useState(false);
  const moreMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <>
      <div ref={moreMenuRef}>
        <MoreMenu show={showMenu} setShow={setShowMenu} />
      </div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Navbar show={showMenu} setShow={setShowMenu} />
    </>
  );
}
