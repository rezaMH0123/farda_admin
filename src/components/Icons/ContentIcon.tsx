import React from "react";

type IconProps = {
  className?: string;
  stroke?: string;
  fill?: string;
};

const IconContent: React.FC<IconProps> = ({ className, fill, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        d="M13.25 9.00001V3.50003H20.5V9.00001H13.25ZM3.5 12.5V3.50003H10.75V12.5H3.5ZM13.25 20.5V11.5H20.5V20.5H13.25ZM3.5 20.5V15H10.75V20.5H3.5ZM4.99997 11H9.25V5.00001H4.99997V11ZM14.75 19H19V13H14.75V19ZM14.75 7.50003H19V5.00001H14.75V7.50003ZM4.99997 19H9.25V16.5H4.99997V19Z"
        fill={fill}
      />
    </svg>
  );
};

export default IconContent;
