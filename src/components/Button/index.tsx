import { ReactNode } from "react";

type ButtonPropsT = {
  type?: "submit";
  className?: string;
  title: string | ReactNode;
  disable?: boolean;
  onClick?: (() => Promise<void>) | (() => void);
  icon?: ReactNode;
  model?:
    | "fill_blue"
    | "fill_red"
    | "outline_gray"
    | "outline_red"
    | "outline_blue";
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
      className={`h-[44px] text-base rounded-lg flex items-center justify-center gap-x-3 leading-5 transition-all duration-100 disabled:bg-[#a2e5fd] disabled:cursor-not-allowed ${
        model === "fill_blue"
          ? "bg-Blue-PrimaryBlue text-W1 hover:bg-Blue-BlueHover"
          : model === "outline_gray"
          ? "text-Black-B3 border border-Black-B3"
          : model === "outline_red"
          ? "text-Red-R1 border border-Red-R1"
          : model === "fill_red"
          ? "bg-Red-R1 text-W1"
          : model === "outline_blue"
          ? "text-Blue-PrimaryBlue border border-Blue-PrimaryBlue"
          : "bg-black text-W1"
      } ${className} `}
      disabled={disable}
      onClick={onClick}
    >
      {title}
      {icon}
    </button>
  );
}
