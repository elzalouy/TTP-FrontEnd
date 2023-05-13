import { Box } from "@mui/system";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { selectAllDepartments } from "../../../../models/Departments";
import { useAppSelector } from "../../../../models/hooks";
import {
  checkStatusAndSetBackground,
  checkStatusAndSetBorder,
} from "../../../../helpers/generalUtils";
import { Project, Task } from "../../../../types/models/Projects";
import "swiper/css";
import "swiper/css/navigation";
import "./taskCard.css";
import TaskInfo from "./TaskInfo";

interface TaskCartProps {
  index: number;
  item: Task;
  project: Project | null | undefined;
  footerStyle: string;
  column?: any;
}

const Dragger: React.FC<TaskCartProps> = ({
  item,
  index,
  project,
  column,
  footerStyle,
}) => {
  const departments = useAppSelector(selectAllDepartments);
  const [taskdata, setTaskData] = useState<
    | {
        department?: string | undefined;
        member?: string | undefined;
      }
    | undefined
  >();
  React.useEffect(() => {
    let newData = { ...taskdata };
    let dep = departments.find((dep) => dep.boardId === item.boardId);
    newData.department = dep ? dep.name : "";
    newData.member = dep?.teams?.find(
      (member) => member._id === item.teamId
    )?.name;
    setTaskData(newData);
  }, [item, departments]);

  return (
    <Draggable index={index} draggableId={`${item._id}`}>
      {(provided, snapshot) => {
        const afterDropStyle = {
          backgroundColor: checkStatusAndSetBackground(column?.value),
          border: checkStatusAndSetBorder(column?.value),
          ...provided.draggableProps.style,
        };
        return (
          <Box
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="task-card"
            style={snapshot.isDragging ? afterDropStyle : {}}
          >
            <TaskInfo
              task={item}
              department={taskdata?.department}
              member={taskdata?.member}
              projectManagerName={project?.projectManagerName}
              footerStyle={footerStyle}
            />
          </Box>
        );
      }}
    </Draggable>
  );
};

export default Dragger;
