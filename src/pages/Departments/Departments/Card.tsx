import React, { useEffect, useState } from "react";
import DepartmentPopover from "../../../coreUI/usable-component/Popovers/DepartmentPopover";
import { selectRole } from "../../../redux/Auth";
import { useDispatch } from "react-redux";
import { selectTasks } from "../../../redux/Projects";
import { useAppSelector } from "../../../redux/hooks";
import {
  toggleDeleteDepartment,
  toggleEditDepartment,
} from "../../../redux/Ui";
import {
  cardColorsValues,
  IDepartmentsComponentProps,
  IDepartmentsComponentState,
} from "../../../interfaces/views/Departments";
import { changeState } from "../../../redux/Departments";

const DepartmentCard = ({
  department,
  cardColors = cardColorsValues,
}: IDepartmentsComponentProps) => {
  const dispatch = useDispatch();
  const role = useAppSelector(selectRole);
  const tasks = useAppSelector(selectTasks);
  const [state, setState] = useState<IDepartmentsComponentState>();
  useEffect(() => {
    setState({
      ...state,
      doneTasks: getTasksCountOf(["Done", "Cancled"]),
      notDoneTasks: getTasksCountOf([
        "Tasks Board",
        "Review",
        "Shared",
        "inProgress",
        "Not Clear",
      ]),
    });
  }, [tasks]);
  const handleSetShowEdit = () => {
    dispatch(changeState({ edit: department }));
    dispatch(toggleEditDepartment("flex"));
  };

  const handleSetShowDelete = () => {
    dispatch(changeState({ delete: department }));
    dispatch(toggleDeleteDepartment("flex"));
  };

  const getTasksCountOf = (status: string[]) =>
    tasks.filter(
      (item) =>
        item.boardId === department.boardId && status.includes(item.status)
    ).length;

  return (
    <>
      {department && department?.color && (
        <div
          data-test-id={`departments-card-${department._id}`}
          className="department-Card"
          style={{ backgroundColor: cardColors[department.color][0] }}
        >
          <div
            className="dp-card-header"
            style={{ color: cardColors[department.color][1] }}
          >
            <h2>{department.name}</h2>
            {role !== "PM" && (
              <DepartmentPopover
                color={cardColors[department?.color][1]}
                handleSetShow={handleSetShowEdit}
                handleSetShowDelete={handleSetShowDelete}
              />
            )}
          </div>
          <div className="teams">
            {department?.teams?.map((team) => {
              if (!team.isDeleted) {
                return (
                  <div
                    className="teamName-badge"
                    key={team._id}
                    style={{
                      borderColor:
                        department.color && cardColors[department.color][1],
                    }}
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
              <p>{state?.notDoneTasks}</p>
            </div>
            <div className="hrVertical"></div>
            <div className="Done">
              <p className="counter-title">Done tasks</p>
              <p>{state?.doneTasks}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentCard;
