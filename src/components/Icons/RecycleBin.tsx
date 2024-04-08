import React from "react";
import { IconProps } from "../../types/IconProps";

const RecycleBin: React.FC<IconProps> = ({ className, fill, onClick }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M7.30773 20.5C6.80901 20.5 6.38306 20.3234 6.02986 19.9701C5.67664 19.6169 5.50003 19.191 5.50003 18.6923V5.99999H4.50003V4.50002H9.00001V3.61542H15V4.50002H19.5V5.99999H18.5V18.6923C18.5 19.1974 18.325 19.625 17.975 19.975C17.625 20.325 17.1974 20.5 16.6923 20.5H7.30773ZM17 5.99999H7.00001V18.6923C7.00001 18.782 7.02886 18.8557 7.08656 18.9134C7.14426 18.9711 7.21798 19 7.30773 19H16.6923C16.7692 19 16.8397 18.9679 16.9039 18.9038C16.968 18.8397 17 18.7692 17 18.6923V5.99999ZM9.40388 17H10.9039V7.99999H9.40388V17ZM13.0962 17H14.5961V7.99999H13.0962V17Z"
        fill={fill}
      />
    </svg>
  );
};

export default RecycleBin;
