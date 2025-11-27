import { useFormik } from "formik";
import * as Yup from "yup";

import InputForm from "./InputForm";
import BreButton from "../../../components/ui/BreButton";

import { MdOutlineEmail } from "react-icons/md";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

export default function ResetCodeForm() {
  const { verifyEmailWithToast, isPending } = useVerifyEmail();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      verifyEmailWithToast(values);
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
        label="your email"
        placeholder="email@sample.com"
        autoComplete="current-email"
      />
      <BreButton
        title="verifed email"
        disabled={isPending}
        type="submit"
        raduis="lg"
      />
    </form>
  );
}
