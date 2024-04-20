import React from "react";
import { IconProps } from "../../types/IconProps";

const UploadFile: React.FC<IconProps> = ({ className, fill }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.25 11.7885V3.38843L4.78462 5.85381L3.7308 4.76923L7.99997 0.500031L12.2692 4.76923L11.2153 5.85381L8.74995 3.38843V11.7885H7.25ZM2.3077 15.5C1.80257 15.5 1.375 15.325 1.025 14.975C0.675 14.625 0.5 14.1974 0.5 13.6923V10.9808H1.99997V13.6923C1.99997 13.7692 2.03202 13.8397 2.09612 13.9039C2.16024 13.968 2.23077 14 2.3077 14H13.6922C13.7692 14 13.8397 13.968 13.9038 13.9039C13.9679 13.8397 14 13.7692 14 13.6923V10.9808H15.5V13.6923C15.5 14.1974 15.325 14.625 14.975 14.975C14.625 15.325 14.1974 15.5 13.6922 15.5H2.3077Z"
        fill={fill}
      />
    </svg>
  );
};

export default UploadFile;
