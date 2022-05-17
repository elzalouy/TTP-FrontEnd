import { BoltRounded } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import IMAGES from "../../assets/img";
import { selectAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import {
  getProject,
  getTasks,
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
import CreateNewTask from "./CreateNewTask";
import TaskCard from "./taskCard";
import "./taskViewBoard.css";
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
      name: "Not Started",
      items: notStartedTasks,
      header: "not-started-header",
      body: "not-started-task",
      border: "not-started-border",
      NewTask: <CreateNewTask />,
      value: "not started",
      footer: "task-card-footer-notstarted",
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
      header: "done-header",
      body: "done-task",
      border: "done-border",
      value: "review",
      footer: "task-card-footer-review",
    },
    [uuidv4()]: {
      name: "Shared",
      items: sharedTasks,
      header: "canceled-header",
      body: "canceled-task",
      border: "canceled-border",
      value: "shared",
      footer: "task-card-footer-shared",
    },
    [uuidv4()]: {
      name: "Done",
      items: doneTasks,
      header: "done-header",
      body: "done-task",
      border: "done-border",
      value: "done",
      footer: "task-card-footer-done",
    },
    [uuidv4()]: {
      name: "Not clear",
      items: notClearTasks,
      header: "not-clear-header",
      body: "not-clear-task",
      border: "not-clear-border",
      value: "not clear",
      footer: "task-card-footer-notclear",
    },
    [uuidv4()]: {
      name: "Canceled",
      items: cancledTasks,
      header: "canceled-header",
      body: "canceled-task",
      border: "canceled-border",
      value: "cancled",
      footer: "task-card-footer-cancled",
    },
  });

  useEffect(() => {
    let cols: any = {
      [uuidv4()]: {
        name: "Not Started",
        items: notStartedTasks,
        header: "not-started-header",
        body: "not-started-task",
        border: "not-started-border",
        NewTask: <CreateNewTask />,
        value: "Not Started",
        footer: "task-card-footer-notstarted",
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
        header: "done-header",
        body: "done-task",
        border: "done-border",
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
        name: "Not clear",
        items: notClearTasks,
        header: "not-clear-header",
        body: "not-clear-task",
        border: "not-clear-border",
        value: "Not Clear",
        footer: "task-card-footer-notclear",
      },
      [uuidv4()]: {
        name: "Canceled",
        items: cancledTasks,
        header: "canceled-header",
        body: "canceled-task",
        border: "canceled-border",
        value: "Cancled",
        footer: "task-card-footer-cancled",
      },
    };
    setColumns(cols);
  }, [selectedProject]);

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
      // dispatch(
      //   moveTask({
      //     department: department,
      //     list: destColumn,
      //     task: sourceColumn.items[source.index],
      //   })
      // );
      move({
        department: department,
        list: destColumn,
        task: sourceColumn.items[source.index],
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
      <Box sx={{ minWidth: 1200, overflowX: "scroll" }} display="inline-flex">
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
                     {/*  <Typography style={{ padding: "12px" }}>
                        <img src={IMAGES.taskFilter} alt="more" />
                      </Typography> */}
                    </Stack>
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
                    {column?.NewTask}
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
