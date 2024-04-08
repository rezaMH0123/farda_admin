import React from "react";
import { IconProps } from "../../types/IconProps";

const Edit: React.FC<IconProps> = ({ className, fill, onClick }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M2.00001 16H3.26153L13.4981 5.76343L12.2366 4.50191L2.00001 14.7385V16ZM0.500031 17.5V14.1154L13.6904 0.930806C13.8416 0.793456 14.0086 0.687322 14.1913 0.612405C14.374 0.537489 14.5657 0.500031 14.7662 0.500031C14.9666 0.500031 15.1609 0.535614 15.3488 0.606781C15.5368 0.677931 15.7032 0.791064 15.8481 0.946181L17.0692 2.18271C17.2243 2.32757 17.3349 2.49427 17.4009 2.68281C17.467 2.87132 17.5 3.05984 17.5 3.24836C17.5 3.44944 17.4656 3.64134 17.397 3.82406C17.3283 4.00679 17.219 4.17377 17.0692 4.32498L3.88461 17.5H0.500031ZM12.8563 5.14373L12.2366 4.50191L13.4981 5.76343L12.8563 5.14373Z"
        fill={fill}
      />
    </svg>
  );
};

export default Edit;
