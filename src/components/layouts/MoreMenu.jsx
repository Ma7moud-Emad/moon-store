import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { userLogout } from "../../features/auth/authSlice";
import { MdLogin } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

export default function MoreMenu({ show }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const decoded = token && jwtDecode(token);

  const handleLogout = () => {
    dispatch(userLogout());
    toast.success("You have been logged out successfully.");
    window.location.href = "/";
  };

  return (
    <ul
      className={`fixed z-100 bottom-18 bg-light-brown text-white min-w-40 min-h-40 p-4 sm:hidden text-lg capitalize transition-all duration-500 ${
        show ? "right-0" : "-right-full"
      }`}
    >
      {token ? (
        <>
          <li className="flex items-center justify-between mb-2">
            <p className="text-light-brown bg-neutral w-8 h-8 text-lg leading-8 text-center rounded-full uppercase">
              {decoded.name[0]}
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer rounded-md p-2 hover:bg-neutral-100 hover:text-neutral-800"
            >
              <FiLogOut className="text-xl" />
            </button>
          </li>
          <li className="border-b p-1 rounded-md hover:bg-neutral-100 hover:text-neutral-800 cursor-pointer">
            <Link to="/allorders" className="block">
              orders
            </Link>
          </li>
        </>
      ) : (
        <li className="border-b p-1 hover:bg-neutral-100 hover:text-neutral-800 rounded-md cursor-pointer">
          <Link to="/signin" className="flex gap-1 items-center">
            <MdLogin className="text-xl" /> <span>sign in</span>
          </Link>
        </li>
      )}
    </ul>
  );
}
