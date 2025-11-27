import { FcCheckmark } from "react-icons/fc";
import { HiMiniXMark } from "react-icons/hi2";

export default function InputForm({
  formik,
  id,
  name,
  type,
  placeholder,
  label,
  autoComplete,
  Icon,
}) {
  const hasValue = formik.values[name] && formik.values[name].length > 0;
  const hasError = formik.touched[name] && formik.errors[name];
  const showSuccessIcon = !formik.errors[name] && hasValue;
  const showErrorIcon = formik.errors[name] && hasValue;

  return (
    <div className="flex-1">
      <label htmlFor={id} className="capitalize font-medium text-neutral-800">
        {label}
      </label>
      <div className="flex items-center justify-between border-2 border-neutral-700 p-2 rounded-lg">
        <div className="flex flex-1 gap-2">
          <span className="text-2xl text-light-brown">{Icon}</span>
          <input
            className="flex-1 outline-0"
            id={id}
            name={name}
            type={type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[name]}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
        </div>
        {showErrorIcon ? (
          <span className="text-2xl text-red-500">
            <HiMiniXMark />
          </span>
        ) : null}
        {showSuccessIcon && (
          <span className="text-2xl ">
            <FcCheckmark />
          </span>
        )}
      </div>
      {hasError ? (
        <div className="bg-light-brown w-fit float-end text-neutral rounded-sm px-4 mt-2">
          {formik.errors[name]}
        </div>
      ) : null}
    </div>
  );
}
