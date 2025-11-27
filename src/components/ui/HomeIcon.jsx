import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function HomeIcon({ bg = "pr" }) {
  return (
    <div
      className={`fixed top-4 right-4 md:left-4 p-2 rounded-full w-fit ${
        bg == "pr"
          ? "bg-linear-to-r from-light-brown from-25% to-dark-brown text-white"
          : " bg-white text-light-brown"
      }`}
    >
      <Link to="/" className="flex items-center gap-2">
        <AiFillHome />
        <span className="border-l pl-2 hidden md:block">Home</span>
      </Link>
    </div>
  );
}
