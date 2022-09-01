import React, { useEffect, useState } from "react";
import DepartmentPopover from "../DepartmentPopover";
import { selectRole } from "../../../../models/Auth";
import { useDispatch } from "react-redux";
import { selectTasks } from "../../../../models/Projects";
import { useAppSelector } from "../../../../models/hooks";
import {
    toggleDeleteDepartment,
    toggleEditDepartment,
} from "../../../../models/Ui";
import {
    cardColorsValues,
    IDepartmentsComponentProps,
    IDepartmentsComponentState,
} from "../../../../types/views/Departments";
import { changeState } from "../../../../models/Departments";
import { Typography } from "@mui/material";
import CardBadge from "src/coreUI/components/Badge/CardBadge";

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
                        {department?.teams?.map((team, _id) => {
                            if (!team.isDeleted) {
                                return (
                                    <>
                                        <CardBadge fontColor={department.color && cardColors[department.color][1]} _id={_id} text={team.name} />
                                    </>
                                )
                            }
                        })
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentCard;
