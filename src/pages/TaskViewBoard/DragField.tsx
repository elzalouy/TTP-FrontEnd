import React, { useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { selectAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import { selectViewTask } from "../../redux/Ui/UI.selectors";
import CreateNewTask from "./CreateNewTask";
import TaskCard from "./taskCard";
import {
  moveTask,
  selectCancledTasks,
  selectDoneTasks,
  selectInProgressTasks,
  selectNotClearTasks,
  selectNotStartedTasks,
  selectReviewTasks,
  selectSelectedProject,
  selectSharedTasks,
  Task,
} from "../../redux/Projects";
import "./taskViewBoard.css";
import TaskInfoPopUp from "./TaskInfoPopUp/TaskInfoPopUp";
const DragField: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const selectedProject = useAppSelector(selectSelectedProject);
  const inProgressTasks = useAppSelector(selectInProgressTasks);
  const doneTasks = useAppSelector(selectDoneTasks);
  const reviewTasks = useAppSelector(selectReviewTasks);
  const notClearTasks = useAppSelector(selectNotClearTasks);
  const notStartedTasks = useAppSelector(selectNotStartedTasks);
  const cancledTasks = useAppSelector(selectCancledTasks);
  const sharedTasks = useAppSelector(selectSharedTasks);
  const departments = useAppSelector(selectAllDepartments);

  const [columns, setColumns] = useState({
    [uuidv4()]: {
      name: "Tasks Board",
      items: notStartedTasks,
      header: "not-started-header",
      body: "not-started-task",
      border: "not-started-border",
      NewTask: <CreateNewTask />,
      value: "Tasks Board",
      footer: "task-card-footer-notstarted",
    },
    [uuidv4()]: {
      name: "Not clear",
      items: notClearTasks,
      header: "not-clear-header",
      body: "not-clear-task",
      border: "not-clear-border",
      value: "Not Clear",
      footer: "task-card-footer-notclear",
    },
    [uuidv4()]: {
      name: "In Progress",
      items: inProgressTasks,
      header: "in-progress-header",
      body: "in-progress-task",
      border: "in-progress-border",
      value: "inProgress",
      footer: "task-card-footer-inprogress",
    },
    [uuidv4()]: {
      name: "Review",
      items: reviewTasks,
      header: "review-header",
      body: "review-task",
      border: "review-border",
      value: "Review",
      footer: "task-card-footer-review",
    },
    [uuidv4()]: {
      name: "Shared",
      items: sharedTasks,
      header: "canceled-header",
      body: "canceled-task",
      border: "canceled-border",
      value: "Shared",
      footer: "task-card-footer-shared",
    },
    [uuidv4()]: {
      name: "Done",
      items: doneTasks,
      header: "done-header",
      body: "done-task",
      border: "done-border",
      value: "Done",
      footer: "task-card-footer-done",
    },

    [uuidv4()]: {
      name: "Cancled",
      items: cancledTasks,
      header: "canceled-header",
      body: "canceled-task",
      border: "canceled-border",
      value: "Cancled",
      footer: "task-card-footer-cancled",
    },
  });

  useEffect(() => {
    let cols: any = {
      [uuidv4()]: {
        name: "Tasks Board",
        items: notStartedTasks,
        header: "not-started-header",
        body: "not-started-task",
        border: "not-started-border",
        NewTask: <CreateNewTask />,
        value: "Tasks Board",
        footer: "task-card-footer-notstarted",
      },
      [uuidv4()]: {
        name: "Not clear",
        items: notClearTasks,
        header: "not-clear-header",
        body: "not-clear-task",
        border: "not-clear-border",
        value: "Not Clear",
        footer: "task-card-footer-notclear",
      },
      [uuidv4()]: {
        name: "In Progress",
        items: inProgressTasks,
        header: "in-progress-header",
        body: "in-progress-task",
        border: "in-progress-border",
        value: "inProgress",
        footer: "task-card-footer-inprogress",
      },
      [uuidv4()]: {
        name: "Review",
        items: reviewTasks,
        header: "review-header",
        body: "review-task",
        border: "review-border",
        value: "Review",
        footer: "task-card-footer-review",
      },
      [uuidv4()]: {
        name: "Shared",
        items: sharedTasks,
        header: "shared-header",
        body: "shared-task",
        border: "shared-border",
        value: "Shared",
        footer: "task-card-footer-shared",
      },
      [uuidv4()]: {
        name: "Done",
        items: doneTasks,
        header: "done-header",
        body: "done-task",
        border: "done-border",
        value: "Done",
        footer: "task-card-footer-done",
      },
      [uuidv4()]: {
        name: "Cancled",
        items: cancledTasks,
        header: "canceled-header",
        body: "canceled-task",
        border: "canceled-border",
        value: "Cancled",
        footer: "task-card-footer-cancled",
      },
    };
    setColumns(cols);
  }, [selectedProject.tasks]);
  const onDragEnd = (result: DropResult, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      let department = departments?.find(
        (item) => item.boardId === sourceColumn.items[source.index]?.boardId
      );
      move({
        department: department,
        value: destColumn.value,
        task: sourceColumn.items[source.index],
        dispatch,
      });
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      // sort tasks
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const move = (obj: any) => {
    dispatch(moveTask(obj));
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Box
        sx={{ minWidth: 1200, overflowX: "scroll", height: "auto" }}
        display="inline-flex"
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Droppable droppableId={columnId} key={index}>
              {(provided, snapshot) => {
                return (
                  <Grid
                    ref={provided.innerRef}
                    className={column?.body}
                    key={columnId}
                    xs
                    minWidth={"312px"}
                    height="100%"
                    sx={{ overflowY: "scroll" }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography style={{ padding: "14px" }}>
                        <span className={column?.header}>{column.name}</span>{" "}
                        {column.items.length}
                      </Typography>
                    </Stack>
                    {column?.NewTask}
                    {column &&
                      column?.items?.map((item: Task, index) => {
                        return (
                          <Box key={item._id} className={column.border}>
                            <TaskCard
                              project={selectedProject?.project}
                              key={item?._id}
                              item={item}
                              index={index}
                              footerStyle={column?.footer}
                              column={column}
                            />
                          </Box>
                        );
                      })}
                    {provided.placeholder}
                  </Grid>
                );
              }}
            </Droppable>
          );
        })}
      </Box>
    </DragDropContext>
  );
};

export default DragField;
