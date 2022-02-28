import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import IMAGES from "../../assets/img";
import TaskCard from "./taskCard";
import { taskDataCanceled, taskDataDone, taskDataNotClear } from "./taskData";
import "./taskViewBroad.css";
const columnsUsed = {
  [uuidv4()]: {
    name: "Done",
    items: taskDataDone,
    header: "done-header",
    body: "done-task",
    border: "done-border",
  },
  [uuidv4()]: {
    name: "Not clear",
    items: taskDataNotClear,
    header: "not-clear-header",
    body: "not-clear-task",
    border: "not-clear-border",
  },
  [uuidv4()]: {
    name: "Canceled",
    items: taskDataCanceled,
    header: "canceled-header",
    body: "canceled-task",
    border: "canceled-border",
  },
};

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
type Props = {};
const DragField: React.FC<Props> = () => {
  const [columns, setColumns] = useState(columnsUsed);
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Grid
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        container
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided, snapshot) => {
                return (
                  <Grid
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={column.body}
                    item
                    xs
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography style={{ paddingLeft: "12px" }}>
                        {" "}
                        <span className={column.header}>{column.name}</span> 3
                      </Typography>

                      <Typography style={{ padding: "12px" }}>
                        <img src={IMAGES.taskFilter} alt="more" />
                      </Typography>
                    </Stack>

                    {column.items.map((item, index) => {
                      return (
                        <Box className={column.border}>
                          <TaskCard
                            key={item.id}
                            item={item}
                            index={index}
                          ></TaskCard>
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
      </Grid>
    </DragDropContext>
  );
};

export default DragField;
