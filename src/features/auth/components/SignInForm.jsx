import { useFormik } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import InputForm from "./InputForm";
import BreButton from "../../../components/ui/BreButton";

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import { userLogin } from "../authSlice";

export default function SignInForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSignIn = async (userData) => {
    const resultAction = await dispatch(userLogin(userData));

    if (userLogin.fulfilled.match(resultAction)) {
      window.location.href = "/";
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must not exceed 16 characters")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one letter, one number, and one special character"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      handleSignIn(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
      <InputForm
        formik={formik}
        id="email"
        name="email"
        type="email"
        Icon={<MdOutlineEmail />}
        label="email address"
        placeholder="email@sample.com"
        autoComplete="current-email"
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <InputForm
          formik={formik}
          id="password"
          name="password"
          type="password"
          Icon={<RiLockPasswordLine />}
          label="password"
          autoComplete="current-password"
          placeholder="********"
        />
        <Link
          to="/verifedemail"
          className="capitalize text-neutral-800 underline font-medium ml-auto"
        >
          forget password?
        </Link>
      </div>
      <BreButton
        title="sign in"
        type="submit"
        raduis="lg"
        disabled={user.isPending}
      />
      <span className="block bg-neutral-600 w-full h-0.5 my-8"></span>
      <p className="font-medium -mt-15 mx-auto px-2 bg-white w-fit">
        New to <span className="text-neutral-800 font-bold">Moon store ?</span>
      </p>
      <BreButton raduis="lg">
        <Link to="/signup">create an account</Link>
      </BreButton>
    </form>
  );
}
