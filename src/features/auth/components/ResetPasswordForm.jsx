import { useFormik } from "formik";
import * as Yup from "yup";

import InputForm from "./InputForm";
import BreButton from "../../../components/ui/BreButton";

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import { useChangePass } from "../hooks/useChangePass";

export default function ResetPasswordForm() {
  const { changePassWithToast, isPending } = useChangePass();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    newPassword: Yup.string()
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
      newPassword: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      changePassWithToast(values);
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
        label="email"
        placeholder="email@sample.com"
        autoComplete="current-email"
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <InputForm
          formik={formik}
          id="newPassword"
          name="newPassword"
          type="password"
          Icon={<RiLockPasswordLine />}
          label="new password"
          autoComplete="current-newPassword"
          placeholder="********"
        />
      </div>
      <BreButton
        title="change"
        type="submit"
        raduis="lg"
        disabled={isPending}
      />
    </form>
  );
}
