import React from "react";
import IMAGES from "../../assets/img";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { Department } from "../../redux/Departments";

type Props = {
  backgroundColor: string;
  fontColor: string;
  department: Department;
};
const departmentCard: React.FC<Props> = ({
  backgroundColor,
  fontColor,
  department,
}) => {
  return (
    <div
      className="department-Card"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="dp-card-header" style={{ color: fontColor }}>
        <h2>{department.name}</h2>
        <p>
          <img src={IMAGES.more} alt="more" />
        </p>
      </div>
      {/* <div className="tasks-count" style={{ color: fontColor }}>
        <CheckBoxOutlinedIcon
          sx={{ color: fontColor, fontSize: "16px" }}
        ></CheckBoxOutlinedIcon>
        4/5
      </div> */}
      <div className="teams">
        {department?.teamsId?.map((team: any) => (
          <div
            className="teamName-badge"
            key={team._id}
            style={{ borderColor: fontColor }}
          >
            {team.name}
          </div>
        ))}
      </div>

      <div className="counter-container">
        <div className="InProgress">
          <p className="counter-title">In progress Project</p>
          <p>{department.totalInProgress}</p>
        </div>

        <hr className="hrVertical" />

        <div className="Done">
          <p className="counter-title">Done Project</p>
          <p>{department.totalDone}</p>
        </div>
      </div>
    </div>
  );
};

export default departmentCard;
