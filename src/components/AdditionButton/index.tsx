import { ReactNode } from "react";

type AdditionButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function AdditionButton({
  children,
  className,
  onClick,
}: AdditionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-PrimaryBlue-100 text-white rounded-lg flex items-center justify-center gap-x-2 ${className}`}
    >
      {children}
    </button>
  );
}
