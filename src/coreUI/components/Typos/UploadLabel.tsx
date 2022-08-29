import * as React from "react";
import IMAGES from "src/assets/img/Images";
import "./typos.css";
type UploadProps = {
  onClick: any;
  length: number;
};

const Upload = (props: UploadProps) => {
  return (
    <label onClick={props.onClick} className="upload-label">
      <img src={IMAGES.fileicon} alt="Upload" />
      <p>{props.length > 0 ? props.length : 0}</p>
    </label>
  );
};

export default Upload;
