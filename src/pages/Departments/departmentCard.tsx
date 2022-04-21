import React, { useState } from "react";
import IMAGES from "../../assets/img";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { Department } from "../../redux/Departments";
import DepartmentDrop from "../../components/dropdowns/DepartmentDrop";
import EditDepartment from "../../components/popups/EditDepartment";
import { useDispatch } from "react-redux";
import { departmentsActions } from "../../redux/Departments";
import DeleteDepartment from "../../components/popups/DeleteDepartment";

type Props = {
  backgroundColor: string;
  fontColor: string;
  department: Department;
};
const DepartmentCard: React.FC<Props> = ({
  backgroundColor,
  fontColor,
  department,
}) => {
  const [Show, setShow] = useState("none");
  const [showDelete, setShowDelete] = useState("none");
  const dispatch = useDispatch();
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
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="dp-card-header" style={{ color: fontColor }}>
        <h2>{department.name}</h2>
        <p>
          <DepartmentDrop
            handleSetShow={handleSetShow}
            handleSetShowDelete={handleSetShowDelete}
          />
        </p>
      </div>
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
      <EditDepartment Show={Show} handleSetShow={handleSetShow} />
      <DeleteDepartment
        showDelete={showDelete}
        handleSetShowDelete={handleSetShowDelete}
      />
    </div>
  );
};

export default DepartmentCard;
