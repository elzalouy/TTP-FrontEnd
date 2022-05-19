import * as React from "react";
import { SVGProps } from "react";

const MoreIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={4}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 2C0 1.431.174.956.523.573.88.191 1.351 0 1.938 0c.586 0 1.054.191 1.403.573.356.383.535.858.535 1.427 0 .569-.179 1.044-.535 1.427-.349.382-.817.573-1.403.573C1.35 4 .88 3.809.523 3.427.174 3.044 0 2.569 0 2ZM7.062 2c0-.569.174-1.044.523-1.427C7.942.191 8.413 0 9 0c.587 0 1.054.191 1.403.573.357.383.535.858.535 1.427 0 .569-.178 1.044-.535 1.427C10.054 3.809 9.587 4 9 4c-.587 0-1.058-.191-1.415-.573-.349-.383-.523-.858-.523-1.427ZM14.124 2c0-.569.175-1.044.523-1.427.357-.382.829-.573 1.415-.573.587 0 1.054.191 1.403.573C17.822.956 18 1.431 18 2c0 .569-.178 1.044-.535 1.427-.349.382-.816.573-1.403.573-.586 0-1.058-.191-1.415-.573-.348-.383-.523-.858-.523-1.427Z"
      fill={props.color ? props.color : "#92929D"}
    />
  </svg>
);

export default MoreIcon;