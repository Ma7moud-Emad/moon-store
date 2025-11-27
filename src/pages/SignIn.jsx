import logo from "../assets/logo.svg";
import icon from "../assets/Icon.svg";

import HomeIcon from "../components/ui/HomeIcon";
import SignInForm from "./../features/auth/components/SignInForm";

export default function SignIn() {
  return (
    <section className="flex flex-col md:flex-row">
      <HomeIcon />
      <div className="bg-[url('/src/assets/signInimg.png')] bg-cover bg-center bg-no-repeat w-1/2 h-screen hidden md:block"></div>
      <div className="h-fit mt-40 sm:m-auto">
        <div className="flex gap-2 justify-center mt-4">
          <img src={icon} alt="icon" className="w-10" />
          <img src={logo} alt="logo" />
        </div>
        <h1 className="w-fit mx-auto mt-4 capitalize font-bold text-2xl text-neutral-800">
          welcome back
        </h1>
        <SignInForm />
      </div>
    </section>
  );
}
