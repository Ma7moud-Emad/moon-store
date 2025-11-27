import { useFormik } from "formik";
import * as Yup from "yup";

import InputForm from "../../auth/components/InputForm";
import BreButton from "../../../components/ui/BreButton";

import {
  IoCallOutline,
  IoChatboxOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import useCashOrder from "../hooks/useCashPayment";
import { useLocation } from "react-router-dom";
import useOnlineOrder from "../hooks/useOnlinePayment";

export default function PaymentForm() {
  const location = useLocation();
  const { cartId } = location.state;

  const token = useSelector((state) => state.user.token);

  const { cashPaymentWithToast, isPending: cash } = useCashOrder(token);
  const { onlinePaymentWithToast, isPending: online } = useOnlineOrder(token);
  const validationSchema = Yup.object({
    details: Yup.string()
      .min(5, "Details must be at least 5 characters")
      .max(100, "Details can't be more than 100 characters")
      .required("Details is required"),

    city: Yup.string()
      .min(2, "City name is too short")
      .max(50, "City name is too long")
      .required("City is required"),

    phone: Yup.string()
      .matches(
        /^01[0-2,5][0-9]{8}$/,
        "Phone number must be a valid Egyptian number"
      )
      .required("Phone is required"),
    paymentMethod: Yup.string().required("Please select a payment method"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
      paymentMethod: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      const shippingAddress = {
        details: values.details,
        city: values.city,
        phone: values.phone,
      };

      if (values.paymentMethod == "cash") {
        cashPaymentWithToast(cartId, shippingAddress);
      } else {
        onlinePaymentWithToast(cartId, shippingAddress);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
      <InputForm
        formik={formik}
        id="details"
        name="details"
        type="text"
        Icon={<IoChatboxOutline />}
        label="details"
        placeholder="your message..."
        autoComplete="msg"
      />
      <InputForm
        formik={formik}
        id="city"
        name="city"
        type="text"
        Icon={<IoLocationOutline />}
        label="address"
        placeholder="Zawyet Razin, Menouf, Menoufia Governorate"
        autoComplete="current-city"
      />
      <InputForm
        formik={formik}
        id="phone"
        name="phone"
        type="tel"
        Icon={<IoCallOutline />}
        label="phone"
        placeholder="012 0726 1602"
        autoComplete="current-phone"
      />
      {/* Payment Method Checkboxes */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 cursor-pointer w-fit">
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            checked={formik.values.paymentMethod === "cash"}
            onChange={formik.handleChange}
            className="w-4 h-4 accent-[#b58b77] cursor-pointer"
          />
          Cash
        </label>

        <label className="flex items-center gap-2 cursor-pointer w-fit">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={formik.values.paymentMethod === "card"}
            onChange={formik.handleChange}
            className="w-4 h-4 accent-[#b58b77] cursor-pointer"
          />
          Card
        </label>

        {formik.touched.paymentMethod && formik.errors.paymentMethod && (
          <p className="bg-light-brown w-fit float-end text-neutral rounded-sm px-4 mt-2 ml-auto">
            {formik.errors.paymentMethod}
          </p>
        )}
      </div>
      <BreButton
        title="checkout"
        type="submit"
        raduis="lg"
        addCalsses="bg-light-brown border-0 text-white"
        disabled={cash || online}
      />
    </form>
  );
}
