import React from "react";
import IMAGES from "../../assets/img";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

type Props = { backgroundColor: string, fontColor: string };
const departmentCard: React.FC<Props> = ({ backgroundColor, fontColor }) => {
  return (

    <div className="department-Card" style={{ backgroundColor: backgroundColor, }}>
      <div className="dp-card-header" style={{ color: fontColor }}>
        <h2>Department name</h2>
        <p>
          <img src={IMAGES.more} alt="more" />
        </p>
      </div>
      <div className="tasks-count" style={{ color: fontColor }}>
        <CheckBoxOutlinedIcon
          sx={{ color: fontColor, fontSize: '16px' }}
        ></CheckBoxOutlinedIcon>4/5
      </div>
      <div className="teams">
        <div className="teamName-badge" style={{ borderColor: fontColor }}>Team name 1</div>
        <div className="teamName-badge" style={{ borderColor: fontColor }}>Team name 2</div>
        <div className="teamName-badge" style={{ borderColor: fontColor }}>Team name 2</div>
        <div className="teamName-badge" style={{ borderColor: fontColor }}>Team name 2</div>
        <div className="teamName-badge" style={{ borderColor: fontColor }}>Team name 2</div>

      </div>

      <div className="counter-container">
        <div className="InProgress">
          <p className="counter-title">In progress Project</p>
          <p>02</p>
        </div>

        <hr className="hrVertical" />

        <div className="Done">
          <p className="counter-title">Done Project</p>
          <p>10</p>
        </div>
      </div>
    </div>

  );
};

export default departmentCard;
