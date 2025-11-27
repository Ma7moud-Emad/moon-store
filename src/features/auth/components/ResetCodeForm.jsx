import { useRef, useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import BreButton from "../../../components/ui/BreButton";
import { useResetCode } from "../hooks/useResetCode";

export default function ResetCodeForm() {
  const { resetCodeWithToast, isPending } = useResetCode();
  const inputRefs = useRef([]);

  const validationSchema = Yup.object({
    digitOne: Yup.number().min(0).max(9).integer().required(),
    digitTwo: Yup.number().min(0).max(9).integer().required(),
    digitThree: Yup.number().min(0).max(9).integer().required(),
    digitFour: Yup.number().min(0).max(9).integer().required(),
    digitFive: Yup.number().min(0).max(9).integer(),
    digitSix: Yup.number().min(0).max(9).integer(),
  });

  const formik = useFormik({
    initialValues: {
      digitOne: "",
      digitTwo: "",
      digitThree: "",
      digitFour: "",
      digitFive: "",
      digitSix: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      const formData = {
        resetCode: `${values.digitOne}${values.digitTwo}${values.digitThree}${values.digitFour}${values.digitFive}${values.digitSix}`,
      };

      resetCodeWithToast(formData);
    },
  });

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (e, index) => {
    const { value } = e.target;

    if (value.length <= 1) {
      formik.handleChange(e);

      if (value.length === 1 && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "Backspace") {
      if (
        formik.values[`digit${getDigitName(index + 1)}`] === "" &&
        index > 0
      ) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").split("").slice(0, 6); // Only numbers, max 6 digits

    digits.forEach((digit, index) => {
      const fieldName = `digit${getDigitName(index + 1)}`;
      formik.setFieldValue(fieldName, digit);
    });

    const nextEmptyIndex = digits.length < 6 ? digits.length : 5;
    inputRefs.current[nextEmptyIndex]?.focus();
  };

  const getDigitName = (index) => {
    const names = ["One", "Two", "Three", "Four", "Five", "Six"];
    return names[index - 1];
  };

  const getDigitValue = (index) => {
    const fieldName = `digit${getDigitName(index + 1)}`;
    return formik.values[fieldName];
  };

  const digitInputs = [
    { name: "digitOne", id: "digitOne" },
    { name: "digitTwo", id: "digitTwo" },
    { name: "digitThree", id: "digitThree" },
    { name: "digitFour", id: "digitFour" },
    { name: "digitFive", id: "digitFive" },
    { name: "digitSix", id: "digitSix" },
  ];

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
      <div className="flex gap-2 justify-center">
        {digitInputs.map((input, index) => (
          <input
            key={input.id}
            ref={(el) => (inputRefs.current[index] = el)}
            className="hide-up-down-input-number w-12 border-2 border-neutral-600 text-center rounded-xl focus:border-light-brown"
            type="number"
            name={input.name}
            id={input.id}
            maxLength="1"
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onBlur={formik.handleBlur}
            value={getDigitValue(index)}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        ))}
      </div>
      <BreButton
        title="send verification code"
        disabled={isPending}
        type="submit"
        raduis="lg"
        addCalsses="w-1/2 mx-auto"
      />
    </form>
  );
}
