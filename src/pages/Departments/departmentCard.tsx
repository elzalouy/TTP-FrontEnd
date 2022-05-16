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
import { selectAllProjects } from "../../redux/Projects";

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
  const handleSetShow = (value: string) => {
    setShow(value);
    dispatch(departmentsActions.selecteDepartment(department));
  };
  const handleSetShowDelete = (value: string) => {
    setShowDelete(value);
    dispatch(departmentsActions.selecteDepartment(department));
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
        <p>
          {role !== "PM" && (
            <DepartmentDrop
              handleSetShow={handleSetShow}
              handleSetShowDelete={handleSetShowDelete}
              color={colors[department.color][1]}
            />
          )}
        </p>
      </div>
      <div className="teams">
        {department?.teamsId?.map((team: any) => (
          <div
            className="teamName-badge"
            key={team._id}
            style={{ borderColor: colors[department.color][1] }}
          >
            {team.name}
          </div>
        ))}
      </div>
      <div className="counter-container">
        <div className="InProgress">
          <p className="counter-title">In progress task</p>
          <p>
            {
              projects.allTasks.filter(
                (item) =>
                  item.boardId === department.boardId &&
                  item.status === "inProgress"
              ).length
            }
          </p>
        </div>
        <hr className="hrVertical" />
        <div className="Done">
          <p className="counter-title">Done task</p>
          <p>
            {
              projects?.allTasks?.filter(
                (item) =>
                  item.boardId === department.boardId && item.status === "done"
              ).length
            }
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
