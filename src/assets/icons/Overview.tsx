import * as React from "react";
import { SVGProps } from "react";

const Overviewicon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-name="\uD83C\uDF4EIcon"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    {...props}
  >
    <g
      transform="translate(2.778 2.278)"
      fill="none"
      stroke="#9fa1ab"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    >
      <path d="M4.467 12.504 7.46 8.615l3.414 2.68 2.929-3.78" />
      <circle cx={1.922} cy={1.922} r={1.922} transform="translate(15.295)" />
      <path d="M12.146.842H4.879C1.867.842 0 2.975 0 5.986v8.082c0 3.011 1.831 5.135 4.879 5.135h8.6c3.011 0 4.879-2.124 4.879-5.135V7.03" />
    </g>
  </svg>
);

export default Overviewicon;
