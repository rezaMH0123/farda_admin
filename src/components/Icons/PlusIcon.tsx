import React from "react";

type IconProps = {
  className?: string;
  stroke?: string;
  fill?: string;
};

const PlusIcon: React.FC<IconProps> = ({ className, fill }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0V6H0V8H6V14H8V8H14V6H8V0H6Z"
        fill={fill}
      />
    </svg>
  );
};

export default PlusIcon;
