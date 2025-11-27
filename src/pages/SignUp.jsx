import logo from "../assets/logo.svg";
import icon from "../assets/Icon.svg";

import SignUpForm from "./../features/auth/components/SignUpForm";
import HomeIcon from "../components/ui/HomeIcon";

export default function SignUp() {
  return (
    <section className="flex flex-col md:flex-row mt-4 md:mt-0">
      <HomeIcon />
      <div className="bg-[url('/src/assets/signUpImg.png')] bg-cover bg-center bg-no-repeat w-1/2 min-h-screen hidden md:block"></div>
      <div className="mt-15 md:mt-0 mx-auto md:w-2/5 lg:w-1/3">
        <div className="flex gap-2 justify-center mt-4">
          <img src={icon} alt="icon" className="w-10" />
          <img src={logo} alt="logo" />
        </div>
        <div className="text-center">
          <h1 className="w-fit mx-auto mt-4 capitalize font-bold text-2xl">
            join Moon store
          </h1>
          <p className="text-neutral-600 text-sm">
            Create your account and discover your style.
          </p>
        </div>
        <SignUpForm />
      </div>
    </section>
  );
}
