import React from "react";
import ReactLoading from "react-loading";

interface Props {
  type: string;
  color: string;
}

const Loading = (props: any) => (
  <ReactLoading
    type={props.type}
    color={props.color}
    height={"25px"}
    width={"25px"}
    className="loading-projects"
  />
);

export default Loading;
