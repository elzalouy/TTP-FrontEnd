import { FC } from "react";
import IMAGES from "src/assets/img/Images";
import { showDotsOverLimit } from "src/helpers/generalUtils";
import { IBadge } from "src/types/components/Badge";
import "./Badge.css";

const Badge: FC<IBadge> = ({ name, index, onChange }) => {
  let label = showDotsOverLimit(name, 10);

  return (
    <div key={index} className="badge-wrapper" onClick={onChange}>
      <p className="badge-label">{label}</p>
      <img
        src={IMAGES.closeicon}
        alt="close"
        width="9px"
        height="9px"
        className="badge-close-icon"
      />
    </div>
  );
};

export default Badge;
