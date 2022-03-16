import React from "react";
import IMAGES from "../../assets/img";

type Props = {};
const departmentCard: React.FC<Props> = () => {
  return (
    <div>
      <div className="department-Card">
        <div className="dp-card-header">
          <p>Department name</p>
          <p>
            <img src={IMAGES.more} alt="more" />
          </p>
        </div>
        <div className="tasks-count">
          <img src={IMAGES.tasksCheck} alt="taskCheck" />
          4/5
        </div>   
        <div className="teams">
          <div className="teamName-badge">Team name 1</div>
          <div className="teamName-badge">Team name 2</div>
          <div className="teamName-badge">Team name 2</div>
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
    </div>
  );
};

export default departmentCard;
