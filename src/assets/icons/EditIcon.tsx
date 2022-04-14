import React, { FC } from "react";
interface Props {
  color: string;
  width: string | number;
  height: string | number;
}
const EditIcon: FC<Props> = (props) => {
  return (
    <svg
      data-name="Iconly/Light-outline/Edit Square"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
    >
      <path
        data-name="Edit Square"
        d="M5.657 20A5.465 5.465 0 0 1 0 14.336V5.937C0 2.542 2.163.149 5.428.041h3.907a.736.736 0 0 1 .1 1.466l-.1.006H5.657A4 4 0 0 0 1.48 5.7v8.4c0 2.608 1.528 4.324 3.959 4.423H14.34a3.994 3.994 0 0 0 4.18-4.192V10.146a.737.737 0 0 1 1.468-.1l.007.1V14.1c0 3.4-2.156 5.789-5.429 5.9h-.23ZM6 14.659a.738.738 0 0 1-.74-.759l.093-3.712a2.855 2.855 0 0 1 .841-1.955L13.542.9A3.088 3.088 0 0 1 17.9.9l1.2 1.2a3.073 3.073 0 0 1 0 4.352l-7.385 7.372a2.856 2.856 0 0 1-2.031.841Zm1.238-5.38a1.389 1.389 0 0 0-.409.95l-.075 2.956h2.927a1.406 1.406 0 0 0 .886-.316l.1-.093 5.739-5.726-3.468-3.463Zm10.211-3.271.6-.6a1.6 1.6 0 0 0 0-2.268l-1.2-1.194a1.609 1.609 0 0 0-2.273 0l-.6.6Z"
        fill={props.color}
      />
    </svg>
  );
};

export default EditIcon;
