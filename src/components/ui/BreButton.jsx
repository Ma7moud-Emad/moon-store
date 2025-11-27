import Spinner from "./Spinner";

export default function BreButton({
  title,
  type,
  children,
  disabled,
  clickedFun,
  addCalsses,
}) {
  return (
    <button
      onClick={clickedFun}
      style={{ cursor: `${disabled ? "not-allowed" : "pointer"}` }}
      disabled={disabled}
      type={type}
      className={`${addCalsses} flex justify-center cursor-pointer capitalize border border-neutral-700 px-4 py-1 font-semibold text-neutral-800 rounded-sm`}
    >
      {disabled ? <Spinner color="#3a3845" height="24" /> : title}
      {children}
    </button>
  );
}
