import * as React from "react";
import { SVGProps } from "react";

const DepartmentIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path data-name="Rectangle 8" fill="rgba(255,255,255,0)" />
    <g data-name="Iconly/Light-outline/Document">
      <path
        data-name="Document"
        d="M8.138 22a6.942 6.942 0 0 1-1.171-.094l-.218-.041a4.447 4.447 0 0 1-2.763-1.686A5.547 5.547 0 0 1 3 16.791V7.209a7.431 7.431 0 0 1 .06-.96C3.41 3.549 5.262 2 8.138 2h7.725C19.05 2 20.97 3.919 21 7.132v9.659C21 20.052 19.079 22 15.863 22ZM4.437 7.209v9.581c0 2.489 1.245 3.752 3.7 3.752h7.716c2.45 0 3.692-1.263 3.692-3.752V7.209c0-2.489-1.242-3.752-3.692-3.752H8.138c-2.456 0-3.701 1.263-3.701 3.752Zm3.945 9.749a.724.724 0 0 1 0-1.448h7.211a.724.724 0 0 1 0 1.448Zm7.211-4.229H8.382a.735.735 0 0 1 0-1.458h7.211a.722.722 0 0 1 .691.339.745.745 0 0 1 0 .779.721.721 0 0 1-.691.339ZM8.391 8.5a.734.734 0 0 1 0-1.457h2.743a.734.734 0 0 1 0 1.457Z"
        fill="#9fa1ab"
      />
    </g>
  </svg>
);

export default DepartmentIcon;
