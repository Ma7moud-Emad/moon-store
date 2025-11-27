import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import InputForm from "./InputForm";
import BreButton from "../../../components/ui/BreButton";

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";
import { GiClockwiseRotation } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { userSignUp } from "../authSlice";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSignUp = async (userData) => {
    const resultAction = await dispatch(userSignUp(userData));

    if (userSignUp.fulfilled.match(resultAction)) {
      window.location.href = "/";
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .test(
        "full-name",
        "Please enter both first name and last name (at least 2 parts)",
        (value) => {
          if (!value) return false;
          const nameParts = value
            .trim()
            .split(/\s+/)
            .filter((part) => part.length > 0);
          return nameParts.length >= 2;
        }
      )
      .required("Full name is required"),

    phone: Yup.string()
      .matches(
        /^\+20(10|11|12|15)\d{8}$/,
        "Please enter a valid Egyptian mobile number (e.g., +201012345678)"
      )
      .required("Phone is required"),

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

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      handleSignUp(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
      <InputForm
        formik={formik}
        id="name"
        name="name"
        type="text"
        Icon={<FaRegUser />}
        label="full name"
        placeholder="Mahmoud Emad"
        autoComplete="current-name"
      />
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
      <InputForm
        formik={formik}
        id="phone"
        name="phone"
        type="tel"
        Icon={<BsTelephone />}
        label="mobile number"
        placeholder="+20 1207261602"
        autoComplete="current-phone"
      />
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
      <InputForm
        formik={formik}
        id="rePassword"
        name="rePassword"
        type="password"
        Icon={<GiClockwiseRotation />}
        label="rePassword"
        autoComplete="current-rePassword"
        placeholder="********"
      />
      <BreButton
        title="create account"
        type="submit"
        raduis="lg"
        disabled={user.isPending}
      />
      <BreButton raduis="lg">
        <Link to="/signin">sign in to your account</Link>
      </BreButton>
    </form>
  );
}
