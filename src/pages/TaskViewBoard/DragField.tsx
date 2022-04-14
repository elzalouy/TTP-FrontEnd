import { BoltRounded } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import IMAGES from "../../assets/img";
import { useAppSelector } from "../../redux/hooks";
import {
  getProject,
  getTasks,
  selectCancledTasks,
  selectDoneTasks,
  selectInProgressTasks,
  selectNotClearTasks,
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
  const cancledTasks = useAppSelector(selectCancledTasks);
  const sharedTasks = useAppSelector(selectSharedTasks);
  const [columns, setColumns] = useState({
    [uuidv4()]: {
      name: "",
      items: [],
      header: "",
      body: "",
      border: "",
      NewTask: <CreateNewTask />,
    },
  });

  useEffect(() => {
    dispatch(getProject(`?_id=${props.match.params.id}`));
    dispatch(
      getTasks({
        projectId: props.match.params.id,
        url: `?projectId=${props.match.params.id}`,
      })
    );
  }, []);
  useEffect(() => {
    let cols: any = {
      [uuidv4()]: {
        name: "In Progress",
        items: inProgressTasks,
        header: "in-progress-header",
        body: "in-progress-task",
        border: "in-progress-border",
        NewTask: <CreateNewTask />,
      },
      [uuidv4()]: {
        name: "Review",
        items: reviewTasks,
        header: "canceled-header",
        body: "canceled-task",
        border: "canceled-border",
      },
      [uuidv4()]: {
        name: "Done",
        items: doneTasks,
        header: "done-header",
        body: "done-task",
        border: "done-border",
      },
      [uuidv4()]: {
        name: "Not clear",
        items: notClearTasks,
        header: "not-clear-header",
        body: "not-clear-task",
        border: "not-clear-border",
      },
      [uuidv4()]: {
        name: "Canceled",
        items: cancledTasks,
        header: "canceled-header",
        body: "canceled-task",
        border: "canceled-border",
      },
      [uuidv4()]: {
        name: "Shared",
        items: sharedTasks,
        header: "canceled-header",
        body: "canceled-task",
        border: "canceled-border",
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
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Box sx={{ width: 1200, overflowX: "scroll" }} display="inline-flex">
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
                    height="auto"
                    sx={{ overflowY: "scroll", height: 400 }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography style={{ paddingLeft: "12px" }}>
                        <span className={column?.header}>{column.name}</span> 3
                      </Typography>
                      <Typography style={{ padding: "12px" }}>
                        <img src={IMAGES.taskFilter} alt="more" />
                      </Typography>
                    </Stack>
                    {column &&
                      column?.items?.map((item: Task, index) => {
                        return (
                          <Box className={column.border}>
                            <TaskCard
                              project={selectedProject.project}
                              key={item?._id}
                              item={item}
                              index={index}
                            ></TaskCard>
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
