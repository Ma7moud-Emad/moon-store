import logo from "../assets/logo.svg";
import icon from "../assets/Icon.svg";

import HomeIcon from "./../components/ui/HomeIcon";
import ResetPasswordForm from "../features/auth/components/ResetPasswordForm";

import { TbPasswordUser } from "react-icons/tb";

export default function ResetPassword() {
  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <HomeIcon bg="sec" />
      <div className="bg-linear-to-r from-light-brown to-dark-brown py-30 md:py-0 md:w-1/2 flex justify-center items-center">
        <TbPasswordUser className="text-6xl md:text-9xl text-white m-auto" />
      </div>
      <div className="mx-auto md:m-auto">
        <div className="flex gap-2 justify-center mt-4">
          <img src={icon} alt="icon" className="w-10" />
          <img src={logo} alt="logo" />
        </div>
        <div className="text-center mt-4">
          <h1 className="w-fit mx-auto mt-4 capitalize font-bold text-xl text-neutral-800">
            reset password
          </h1>
          <p className="text-neutral-600 text-sm">
            Please enter new password send to Moon store
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </section>
  );
}
