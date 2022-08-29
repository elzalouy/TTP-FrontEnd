import * as React from "react";
import IMAGES from "src/assets/img/Images";
import { formatFileName } from "src/helpers/equations";

type UploadLabelProps = {
  fileName: string;
  onRemove: any;
};

const UploadLabel = (props: UploadLabelProps) => {
  return (
    <label className="file-label" onClick={props.onRemove}>
      <p>{formatFileName(props.fileName)}</p>
      <img src={IMAGES.closeicon} alt="" />
    </label>
  );
};

export default UploadLabel;
