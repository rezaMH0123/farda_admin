import { ReactNode } from "react";

type ButtonPropsT = {
  type?: "submit";
  className?: string;
  title: string | ReactNode;
  disable?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
<<<<<<< HEAD
  model?: "fill_blue" | "fill_red" | "outline_gray" | "outline_red";
=======
  background?: string;
  textColor?: string;
>>>>>>> d470c0c (edit button component)
};

export default function Button({
  title,
  className,
  disable,
  type,
  onClick,
  icon,
  model,
}: ButtonPropsT) {
  return (
    <button
      type={type}
      className={`h-[44px] text-base rounded-lg flex items-center justify-center gap-x-2 leading-5 ${
        model === "fill_blue"
          ? "bg-PrimaryBlue-100 text-white"
          : model === "outline_gray"
          ? "text-PrimaryBlack-300 border border-PrimaryBlack-300"
          : model === "outline_red"
          ? "text-PrimaryRed-100 border border-PrimaryRed-100"
          : model === "fill_red"
          ? "bg-PrimaryRed-100 text-white"
          : "bg-black text-white"
      } ${className} `}
      disabled={disable}
      onClick={onClick}
    >
      {title}
      {icon}
    </button>
  );
}
