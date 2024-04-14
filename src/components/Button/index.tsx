import { ReactNode } from "react";

type ButtonPropsT = {
  type?: "submit";
  className?: string;
  title: string | ReactNode;
  disable?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  background?: string;
  textColor?: string;
};

export default function Button({
  title,
  className,
  disable,
  type,
  onClick,
  icon,
  background,
  textColor,
}: ButtonPropsT) {
  return (
    <button
      type={type}
      style={{ backgroundColor: background, color: textColor }}
      className={`h-[44px] text-base rounded-lg flex items-center justify-center gap-x-2 ${className}`}
      disabled={disable}
      onClick={onClick}
    >
      {title}
      {icon}
    </button>
  );
}
