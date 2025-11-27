import logo from "../assets/logo.svg";
import icon from "../assets/Icon.svg";

import HomeIcon from "./../components/ui/HomeIcon";
import ResetCodeForm from "../features/auth/components/ResetCodeForm";

import { MdRestartAlt } from "react-icons/md";

export default function ResetCode() {
  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <HomeIcon bg="sec" />
      <div className="bg-linear-to-r flex-1 from-light-brown to-dark-brown py-30 md:py-0 w-1/2 flex justify-center items-center">
        <MdRestartAlt className="text-6xl md:text-9xl text-white m-auto" />
      </div>
      <div className="md:w-1/2 mx-auto md:m-auto py-8 md:p-8">
        <div className="flex gap-2 justify-center mt-4">
          <img src={icon} alt="icon" className="w-10" />
          <img src={logo} alt="logo" />
        </div>
        <div className="text-center mt-4">
          <h1 className="w-fit mx-auto mt-4 capitalize font-bold text-xl text-neutral-800">
            email verification
          </h1>
          <p className="text-neutral-600 text-sm">
            Please enter the 6 digit send to Moon store
          </p>
        </div>
        <ResetCodeForm />
      </div>
    </section>
  );
}
