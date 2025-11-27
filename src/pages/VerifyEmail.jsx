import logo from "../assets/logo.svg";
import icon from "../assets/Icon.svg";

import VerifedEmailForm from "../features/auth/components/VerifedEmailForm";
import HomeIcon from "./../components/ui/HomeIcon";

import { IoIosMailOpen } from "react-icons/io";

export default function VerifyEmail() {
  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <HomeIcon bg="sec" />
      <div className="bg-linear-to-l from-light-brown to-dark-brown py-30 md:py-0 md:w-1/2 flex justify-center items-center">
        <IoIosMailOpen className="text-6xl md:text-9xl text-white m-auto" />
      </div>
      <div className="m-auto">
        <div className="flex gap-2 justify-center mt-4">
          <img src={icon} alt="icon" className="w-10" />
          <img src={logo} alt="logo" />
        </div>
        <div className="text-center mt-4">
          <h1 className="w-fit mx-auto mt-4 capitalize font-bold text-xl text-neutral-800">
            verification code on your email
          </h1>
          <p className="text-neutral-600 text-sm">
            we will send verification code in your email.
          </p>
        </div>
        <VerifedEmailForm />
      </div>
    </section>
  );
}
