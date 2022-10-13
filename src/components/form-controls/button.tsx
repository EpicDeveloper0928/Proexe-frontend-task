import React from "react";
import {classnames} from "../../helpers";

type ColorType = "primary" | "green" | "red" | "yellow" | "purple";
type VariantType = "outline" | "fill";

interface Props extends React.ButtonHTMLAttributes<HTMLElement> {
  label: string;
  variant?: VariantType;
  colorName?: ColorType;
}

function styleBy(variant: VariantType, colorName: ColorType) {
  let bgColor = "",
    borderColor = "",
    textColor = "";

  switch (colorName) {
    case "red":
      bgColor =
        variant === "outline"
          ? "bg-transparent"
          : "bg-red-700 hover:bg-red-800";
      borderColor = "border-red-700 hover:border-red-800";
      textColor =
        variant === "outline"
          ? "text-red-700 hover:text-red-800"
          : "text-white";
      break;
    case "green":
      bgColor =
        variant === "outline"
          ? "bg-transparent"
          : "bg-green-700 hover:bg-green-800";
      borderColor = "border-green-700 hover:border-green-800";
      textColor =
        variant === "outline"
          ? "text-green-700 hover:text-green-800"
          : "text-white";
      break;
    case "purple":
      bgColor =
        variant === "outline"
          ? "bg-transparent"
          : "bg-purple-700 hover:bg-purple-800";
      borderColor = "border-purple-700 hover:border-purple-800";
      textColor =
        variant === "outline"
          ? "text-purple-700 hover:text-purple-800"
          : "text-white";
      break;
    case "yellow":
      bgColor =
        variant === "outline"
          ? "bg-transparent"
          : "bg-yellow-400 hover:bg-yellow-500";
      borderColor = "border-yellow-400 hover:border-yellow-500";
      textColor =
        variant === "outline"
          ? "text-yellow-400 hover:text-yellow-500"
          : "text-white";
      break;

    default:
      bgColor =
        variant === "outline"
          ? "bg-transparent"
          : "bg-blue-700 hover:bg-blue-800";
      borderColor = "border-blue-700 hover:border-blue-800";
      textColor =
        variant === "outline"
          ? "text-blue-700 hover:text-blue-800"
          : "text-white";
      break;
  }

  return {bgColor, borderColor, textColor};
}

export default function Button({
  label,
  colorName = "primary",
  variant = "fill",
  type = "button",
  className = "",
  ...rest
}: Props) {
  let {bgColor, borderColor, textColor} = styleBy(variant, colorName);

  return (
    <button
      className={classnames([
        "px-10 py-2 text-sm font-medium rounded-lg focus:outline-none border transition-colors duration-300",
        bgColor,
        borderColor,
        textColor,
        className,
      ])}
      {...rest}
    >
      {label}
    </button>
  );
}
