import React, { useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { selectAllDepartments } from "../../../models/Departments";
import { useAppSelector } from "../../../models/hooks";
import TaskCard from "./Card/TaskCard";
import { moveTask, selectAllProjects } from "../../../models/Projects";
import "./taskViewBoard.css";
import { Project, Task } from "../../../types/models/Projects";
import { RouteComponentProps } from "react-router";
import { DragCloumnType, columnsValues } from "src/types/views/BoardView";

type DragFieldProps = RouteComponentProps<{ id: string }>;

const DragField = (props: DragFieldProps) => {
  const departments = useAppSelector(selectAllDepartments);
  const dispatch = useDispatch();
  const { allTasks, projects } = useAppSelector(selectAllProjects);
  const projectId = props.match.params.id;
  const project = projects.find((item) => item._id === projectId);
  const [columns, setColumns] = useState<{
    TasksBoard: DragCloumnType;
    NotClear: DragCloumnType;
    InProgress: DragCloumnType;
    Review: DragCloumnType;
    Shared: DragCloumnType;
    Done: DragCloumnType;
    Cancled: DragCloumnType;
  }>(columnsValues);

  useEffect(() => {
    setColumns({
      TasksBoard: {
        ...columns.TasksBoard,
        items: allTasks.filter((item) => item.status === "Tasks Board"),
      },
      NotClear: {
        ...columns.NotClear,
        items: allTasks.filter((item) => item.status === "Not Clear"),
      },
      InProgress: {
        ...columns.InProgress,
        items: allTasks.filter((item) => item.status === "In Progress"),
      },
      Review: {
        ...columns.Review,
        items: allTasks.filter((item) => item.status === "Review"),
      },
      Done: {
        ...columns.Done,
        items: allTasks.filter((item) => item.status === "Done"),
      },
      Cancled: {
        ...columns.Cancled,
        items: allTasks.filter((item) => item.status === "Cancled"),
      },
      Shared: {
        ...columns.Shared,
        items: allTasks.filter((item) => item.status === "Shared"),
      },
    });
  }, [allTasks]);

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
          let items: Task[] = [];
          if (projectId && column.value)
            items = allTasks.filter(
              (item) =>
                item.projectId === projectId && item.status === column.value
            );
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
                        {items.length}
                      </Typography>
                    </Stack>
                    {column?.NewTask && column?.NewTask}
                    {column &&
                      items?.map((item: Task, index: number) => {
                        return (
                          <Box key={item._id} className={column.border}>
                            <TaskCard
                              project={project}
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
