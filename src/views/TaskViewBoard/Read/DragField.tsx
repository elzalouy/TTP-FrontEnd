import React, { useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { selectAllDepartments } from "../../../models/Departments";
import { useAppSelector } from "../../../models/hooks";
import CreateNewTask from "./CreateTaskBtn";
import TaskCard from "./Card/TaskCard";
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
} from "../../../models/Projects";
import "./taskViewBoard.css";
import { Project, Task } from "../../../types/models/Projects";

type DragCloumn = {
  name: string;
  items: Task[];
  header: string;
  body: string;
  border: string;
  NewTask?: any;
  value: string;
  footer: string;
};
const DragField = () => {
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

  const [columns, setColumns] = useState<{
    TasksBoard: DragCloumn;
    NotClear: DragCloumn;
    InProgress: DragCloumn;
    Review: DragCloumn;
    Shared: DragCloumn;
    Done: DragCloumn;
    Cancled: DragCloumn;
  }>({
    TasksBoard: {
      name: "Tasks Board",
      items: notStartedTasks,
      header: "not-started-header",
      body: "not-started-task",
      border: "not-started-border",
      NewTask: <CreateNewTask />,
      value: "Tasks Board",
      footer: "task-card-footer-notstarted",
    },
    NotClear: {
      name: "Not clear",
      items: notClearTasks,
      header: "not-clear-header",
      body: "not-clear-task",
      border: "not-clear-border",
      value: "Not Clear",
      footer: "task-card-footer-notclear",
    },
    InProgress: {
      name: "In Progress",
      items: inProgressTasks,
      header: "in-progress-header",
      body: "in-progress-task",
      border: "in-progress-border",
      value: "In Progress",
      footer: "task-card-footer-inprogress",
    },
    Review: {
      name: "Review",
      items: reviewTasks,
      header: "review-header",
      body: "review-task",
      border: "review-border",
      value: "Review",
      footer: "task-card-footer-review",
    },
    Shared: {
      name: "Shared",
      items: sharedTasks,
      header: "canceled-header",
      body: "canceled-task",
      border: "canceled-border",
      value: "Shared",
      footer: "task-card-footer-shared",
    },
    Done: {
      name: "Done",
      items: doneTasks,
      header: "done-header",
      body: "done-task",
      border: "done-border",
      value: "Done",
      footer: "task-card-footer-done",
    },
    Cancled: {
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
      TasksBoard: {
        name: "Tasks Board",
        items: notStartedTasks,
        header: "not-started-header",
        body: "not-started-task",
        border: "not-started-border",
        NewTask: <CreateNewTask />,
        value: "Tasks Board",
        footer: "task-card-footer-notstarted",
      },
      NotClear: {
        name: "Not clear",
        items: notClearTasks,
        header: "not-clear-header",
        body: "not-clear-task",
        border: "not-clear-border",
        value: "Not Clear",
        footer: "task-card-footer-notclear",
      },
      InProgress: {
        name: "In Progress",
        items: inProgressTasks,
        header: "in-progress-header",
        body: "in-progress-task",
        border: "in-progress-border",
        value: "In Progress",
        footer: "task-card-footer-inprogress",
      },
      Review: {
        name: "Review",
        items: reviewTasks,
        header: "review-header",
        body: "review-task",
        border: "review-border",
        value: "Review",
        footer: "task-card-footer-review",
      },
      Shared: {
        name: "Shared",
        items: sharedTasks,
        header: "canceled-header",
        body: "canceled-task",
        border: "canceled-border",
        value: "Shared",
        footer: "task-card-footer-shared",
      },
      Done: {
        name: "Done",
        items: doneTasks,
        header: "done-header",
        body: "done-task",
        border: "done-border",
        value: "Done",
        footer: "task-card-footer-done",
      },
      Cancled: {
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
  }, [
    selectedProject.tasks,
    inProgressTasks,
    cancledTasks,
    notClearTasks,
    reviewTasks,
    sharedTasks,
    doneTasks,
    notStartedTasks,
  ]);
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
      onDragUpdate={(update) => {}}
    >
      <Box
        sx={{
          minWidth: 1200,
          overflowX: "scroll",
          height: "auto",
        }}
        display="inline-flex"
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Droppable droppableId={columnId} key={columnId}>
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
                    data-test-id="task-card-container"
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
                    {column?.NewTask && column?.NewTask}
                    {column &&
                      column?.items?.map((item: Task, index: number) => {
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
