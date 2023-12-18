import React, { useEffect, useRef, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { selectAllDepartments } from "../../../models/Departments";
import { useAppSelector } from "../../../models/hooks";
import TaskCard from "./Card/TaskCard";
import { moveTask, selectAllProjects } from "../../../models/Projects";
import "./taskViewBoard.css";
import { Task } from "../../../types/models/Projects";
import { RouteComponentProps } from "react-router";
import {
  DragCloumnType,
  columnsValues,
  moveListsObject,
} from "src/types/views/BoardView";
import { IDepartmentState, IList } from "src/types/models/Departments";
import EditDeadline from "../Edit/EditDeadline";

type DragFieldProps = {
  props: RouteComponentProps<{ id: string }>;
};

type columnsType = {
  TasksBoard: DragCloumnType;
  NotClear: DragCloumnType;
  InProgress: DragCloumnType;
  Review: DragCloumnType;
  Shared: DragCloumnType;
  Done: DragCloumnType;
  Cancled: DragCloumnType;
};
type moveObject = {
  boardId: string;
  taskId: string;
  listId: string;
  status: string;
  previousListId: string;
  previousStatus: string;
};
const DragField = (props: DragFieldProps) => {
  const dispatch = useDispatch();
  const { allTasks, projects } = useAppSelector(selectAllProjects);
  const departments = useAppSelector(selectAllDepartments);
  const projectId = props.props.match.params.id;
  const project = projects.find((item) => item._id === projectId);
  const [columns, setColumns] = useState<columnsType>(columnsValues);
  const [tasks, setTasks] = useState<Task[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [moveMap, setMoveMap] = useState<Map<string, moveObject>>(new Map());
  const [move, setMove] = useState<{
    task: Task;
    dep: IDepartmentState;
    newList: IList;
  }>();
  const [deadlineChange, setDeadlineChange] = useState<{
    showPopup: "none" | "flex";
    value: string;
    loading: boolean;
    changed: boolean;
  }>({ showPopup: "none", value: "", loading: false, changed: false });
  useEffect(() => {
    let projectTasks = allTasks.filter((item) => item.projectId === projectId);
    setTasks(projectTasks);
    setColumns({
      TasksBoard: {
        ...columns.TasksBoard,
        items: projectTasks.filter((item) => item.status === "Tasks Board"),
      },
      NotClear: {
        ...columns.NotClear,
        items: projectTasks.filter((item) => item.status === "Not Clear"),
      },
      InProgress: {
        ...columns.InProgress,
        items: projectTasks.filter((item) => item.status === "In Progress"),
      },
      Review: {
        ...columns.Review,
        items: projectTasks.filter((item) => item.status === "Review"),
      },
      Shared: {
        ...columns.Shared,
        items: projectTasks.filter((item) => item.status === "Shared"),
      },
      Done: {
        ...columns.Done,
        items: projectTasks.filter((item) => item.status === "Done"),
      },
      Cancled: {
        ...columns.Cancled,
        items: projectTasks.filter((item) => item.status === "Cancled"),
      },
    });
  }, [projectId, allTasks]);

  useEffect(() => {
    function handleMouseMove(event: any) {
      // step 1: get the mouse move then get the data-rbd-draggable-id
      if (containerRef.current && event.clientX >= window.innerWidth - 1) {
        containerRef.current.scrollLeft += 20;
      }
      if (containerRef.current && event.clientX === 0) {
        containerRef.current.scrollLeft -= 20;
      }
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const onDragEnd = (result: DropResult) => {
    const source = result.source;
    const destination = result.destination;
    if (
      destination?.droppableId &&
      source.droppableId !== destination.droppableId
    ) {
      let Columns: any = { ...columns };
      const sourceColumn = Columns[source.droppableId];
      const destColumn = Columns[destination?.droppableId];
      let sourceItems = [...sourceColumn.items];
      let destinationItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destinationItems,
        },
      });
      setMoveToMap(
        result.draggableId,
        moveListsObject[destination.droppableId]
      );
    }
  };
  const setMoveToMap = (id: string, status: string) => {
    let map = new Map(moveMap);
    let task = tasks.find((item) => item._id === id);
    let taskDepartment = departments.find(
      (depItem) => depItem.boardId === task?.boardId
    );
    let taskListinDep = taskDepartment?.lists?.find(
      (item) => item.listId === task?.listId
    );
    let newTaskListInDep = taskDepartment?.lists?.find(
      (newList) => newList.name === status
    );
    if (task && taskDepartment && taskListinDep && newTaskListInDep) {
      let move: moveObject = {
        taskId: task._id,
        previousListId: taskListinDep.listId,
        previousStatus: taskListinDep.name,
        listId: newTaskListInDep.listId,
        status: newTaskListInDep.name,
        boardId: taskDepartment.boardId,
      };
      map.set(task._id, move);
      setMoveMap(map);
    }
    if (taskDepartment && newTaskListInDep && task)
      moveAction(taskDepartment, newTaskListInDep, task);
  };
  const moveAction = (dep: IDepartmentState, newList: IList, task: Task) => {
    if (
      newList.name === "Tasks Board" &&
      ["Done", "Shared", "Cancled"].includes(task.status)
    ) {
      setMove({ dep, newList, task });
      setDeadlineChange({
        ...deadlineChange,
        showPopup: "flex",
        value: "",
        loading: false,
      });
    } else dispatch(moveTask({ dep, newList, task }));
  };

  const onSumbitDeadlineChange = (e: string) => {
    setDeadlineChange({ ...deadlineChange, loading: true });
    dispatch(
      moveTask({
        ...move,
        deadline: e,
        setDeadlineChange: () =>
          setDeadlineChange({
            ...deadlineChange,
            loading: false,
            changed: true,
            showPopup: "none",
          }),
      })
    );
  };

  return (
    <>
      <Grid
        item
        xs={12}
        sx={{
          width: "100%",
          height: "auto",
          overflowX: "auto",
          pr: 10,
          position: "relative",
          display: "inline-flex",
          transition: " all 0.5s ease !important",
        }}
        ref={containerRef}
      >
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Box sx={{ display: "flex", width: "calc(100% + 20px)" }}>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Droppable
                  droppableId={columnId}
                  key={columnId}
                  direction="horizontal"
                >
                  {(provided, snapshot) => {
                    let CreateTask: React.FC = column.NewTask
                      ? column.NewTask
                      : () => {
                          return <></>;
                        };
                    return (
                      <Grid
                        ref={provided.innerRef}
                        className={column?.body}
                        key={columnId}
                        minWidth={"312px"}
                        height="auto"
                        data-test-id="task-card-container"
                        {...provided.droppableProps}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography style={{ padding: "14px" }}>
                            <span className={column?.header}>
                              {column.name}
                            </span>{" "}
                            {column.items?.length}
                          </Typography>
                        </Stack>
                        <CreateTask />
                        {column?.items &&
                          column?.items?.map((item: Task, index: number) => {
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
      </Grid>
      <EditDeadline
        loading={deadlineChange.loading}
        show={deadlineChange.showPopup}
        onCloseModel={() => {
          setDeadlineChange({ ...deadlineChange, showPopup: "none" });
          let map = { ...moveMap };
          let keys = map.keys();
          let lastKey;
          for (let key in keys) {
            lastKey = key;
          }
          if (lastKey) {
            map.delete(lastKey);
            setMoveMap(map);
          }
        }}
        handleSubmit={onSumbitDeadlineChange}
      />
    </>
  );
};
export default DragField;
