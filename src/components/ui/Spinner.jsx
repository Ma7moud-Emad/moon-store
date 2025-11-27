import { RotatingLines } from "react-loader-spinner";

export default function Spinner({
  visible = true,
  height = "28",
  width = "28",
  color = "white",
  strokeWidth = "5",
  animationDuration = "0.75",
  ariaLabel = "rotating-lines-loading",
}) {
  return (
    <RotatingLines
      visible={visible}
      height={height}
      width={width}
      color={color}
      strokeWidth={strokeWidth}
      animationDuration={animationDuration}
      ariaLabel={ariaLabel}
    />
  );
}
