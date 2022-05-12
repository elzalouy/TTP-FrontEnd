import * as React from "react";
import { SVGProps } from "react";

const PersonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={18} height={18} viewBox="0 0 20 20" {...props}>
    <g data-name="Layer 2">
      <g data-name="person" fill="#9FA1AB">
        <path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2zM12 13a7 7 0 0 0-7 7 1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7z" />
      </g>
    </g>
  </svg>
);

export default PersonIcon;
