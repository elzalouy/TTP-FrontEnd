import * as React from "react";
import { SVGProps } from "react";

const NotificationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={18.5} height={21.5} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      strokeLinecap="round"
      stroke="#9fa1ab"
      strokeWidth={1.5}
      strokeLinejoin="round"
    >
      <path
        d="M.75 12.537v-.219a3.6 3.6 0 0 1 .602-1.818 4.87 4.87 0 0 0 1.194-2.314c-.001-.335 0-.67.007-1.004.006-.336.023-.67.05-1.005A6.285 6.285 0 0 1 7.719.915 6.966 6.966 0 0 1 9.21.75h.078c2.856 0 5.744 1.843 6.469 4.598.071.272.12.55.147.829.037.419.028.841.028 1.263-.002.249.005.498.021.746.183.867.595 1.67 1.193 2.323.364.536.572 1.162.602 1.81v.209l.001.088a3.568 3.568 0 0 1-.845 2.301 4.506 4.506 0 0 1-2.853 1.371 45.074 45.074 0 0 1-9.614 0 4.554 4.554 0 0 1-2.853-1.37 3.605 3.605 0 0 1-.834-2.38z"
        fill="none"
      />
      <path
        d="M11.612 19.6c-.152.19-.328.36-.524.505a3.083 3.083 0 0 1-2.25.622A3.06 3.06 0 0 1 6.8 19.6"
        fill="none"
        stroke="#9fa1ab"
        opacity={0.4}
      />
    </g>
  </svg>
);

export default NotificationIcon;