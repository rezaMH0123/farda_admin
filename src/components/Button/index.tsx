import { ReactNode } from "react";

interface ButtonPropsI {
  type?: "submit";
  className?: string;
  title: string | ReactNode;
  disable?: boolean;
  onClick?: () => void;
}

export default function Button({
  title,
  className,
  disable,
  type,
  onClick,
}: ButtonPropsI) {
  return (
    <button
      type={type}
      className={`text-base rounded-lg flex items-center justify-center gap-x-2 ${className}`}
      disabled={disable}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
