import * as React from "react";
import { SVGProps } from "react";

const NotificationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18.5}
    height={21.503}
    {...props}
  >
    <g
      fill="none"
      stroke="#9fa1ab"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    >
      <path d="M.75 12.537v-.219a3.6 3.6 0 0 1 .6-1.818 4.87 4.87 0 0 0 1.2-2.314c0-.666 0-1.342.058-2.009C2.905 2.968 6.077.75 9.211.75h.078c3.134 0 6.306 2.218 6.617 5.427.058.666 0 1.342.049 2.009a4.955 4.955 0 0 0 1.195 2.323 3.506 3.506 0 0 1 .6 1.809v.209a3.566 3.566 0 0 1-.844 2.39 4.505 4.505 0 0 1-2.856 1.371 45.078 45.078 0 0 1-9.615 0 4.554 4.554 0 0 1-2.85-1.371 3.6 3.6 0 0 1-.835-2.38ZM6.805 19.602a3.061 3.061 0 0 0 2.037 1.127 3.088 3.088 0 0 0 2.251-.627 2.886 2.886 0 0 0 .524-.5" />
    </g>
  </svg>
);

export default NotificationIcon;
