import React, { useState } from "react";
import IMAGES from "../../assets/img";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { Department } from "../../redux/Departments";
import DepartmentDrop from "../../components/dropdowns/DepartmentDrop";
import EditDepartment from "../../components/popups/EditDepartment";
import { useDispatch } from "react-redux";
import { departmentsActions } from "../../redux/Departments";
import DeleteDepartment from "../../components/popups/DeleteDepartment";
import { selectRole } from "../../redux/Auth";
import { useAppSelector } from "../../redux/hooks";
import {
  selectAllProjects,
  selectDoneTasks,
  selectInProgressTasks,
  selectTasks,
  Task,
} from "../../redux/Projects";

type Status =
  | "Tasks Board"
  | "Review"
  | "Shared"
  | "Done"
  | "Cancled"
  | "inProgress"
  | "Not Clear";

type Props = {
  backgroundColor: string;
  fontColor: string;
  department: Department;
};

const colors: any = {
  blue: ["#0079BF1A", "#0079BF"],
  orange: ["#D290341A", "#D29034"],
  green: ["#5198391A", "#519839"],
  red: ["#B046321A", "#B04632"],
  purple: ["#89609E1A", "#89609E"],
  pink: ["#CD5A911A", "#CD5A91"],
  lime: ["#4BBF6B1A", "#4BBF6B"],
  sky: ["#00AECC1A", "#00AECC"],
  grey: ["#838C911A", "#838C91"],
};
const DepartmentCard: React.FC<Props> = ({
  backgroundColor,
  fontColor,
  department,
}) => {
  const [Show, setShow] = useState("none");
  const [showDelete, setShowDelete] = useState("none");
  const dispatch = useDispatch();
  const role = useAppSelector(selectRole);
  const projects = useAppSelector(selectAllProjects);
  const tasks = useAppSelector(selectTasks);

  const handleSetShow = (value: string) => {
    setShow(value);
    dispatch(departmentsActions.selecteDepartment(department));
  };

  const handleSetShowDelete = (value: string) => {
    setShowDelete(value);
    dispatch(departmentsActions.selecteDepartment(department));
  };

  const getAllTasksByFilteredByStatus = (status: Status[]) => {
    let findTasksByDepartmentId = tasks.filter(
      (task) => task.boardId === department.boardId
    );
    let filterTasksByStatus = findTasksByDepartmentId.filter((task) => {
       return !status.some((item) => item === task.status);
    });
    console.log(filterTasksByStatus , status);
    return filterTasksByStatus.length;
  };

  return (
    <div
      className="department-Card"
      style={{ backgroundColor: colors[department.color][0] }}
    >
      <div
        className="dp-card-header"
        style={{ color: colors[department.color][1] }}
      >
        <h2>{department.name}</h2>
        {role !== "PM" && (
          <DepartmentDrop
            color={colors[department.color][1]}
            handleSetShow={handleSetShow}
            handleSetShowDelete={handleSetShowDelete}
          />
        )}
      </div>
      <div className="teams">
        {department?.teamsId?.map((team: any) => {
          if (!team.isDeleted) {
            return (
              <div
                className="teamName-badge"
                key={team._id}
                style={{ borderColor: colors[department.color][1] }}
              >
                {team.name}
              </div>
            );
          }
        })}
      </div>
      <div className="counter-container">
        <div className="InProgress">
          <p className="counter-title">Active tasks</p>
          <p>{getAllTasksByFilteredByStatus(["Done", "Cancled"])}</p>
        </div>
        <div className="hrVertical"></div>
        <div className="Done">
          <p className="counter-title">Done tasks</p>
          <p>
            {getAllTasksByFilteredByStatus([
              "Tasks Board",
              "Review",
              "Shared",
              "Cancled",
              "inProgress",
              "Not Clear",
            ])}
          </p>
        </div>
      </div>
      <EditDepartment Show={Show} handleSetShow={handleSetShow} />
      <DeleteDepartment
        showDelete={showDelete}
        handleSetShowDelete={handleSetShowDelete}
      />
    </div>
  );
};

export default DepartmentCard;
