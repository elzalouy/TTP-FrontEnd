import React, { FC, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { TaskMovement } from "src/types/models/Projects";

interface TaskFooterProps {
  journies: number;
  onSelectJourney: any;
  movements: TaskMovement[];
}

const TaskFooter: FC<TaskFooterProps> = ({
  onSelectJourney,
  journies,
  movements,
}) => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    onSelectJourney(value);
  };

  useEffect(() => {
    setPage(1);
  }, [movements]);

  return (
    <>
      <Box display={"inline-flex"} alignItems={"center"}>
        <Typography
          fontSize={"12px"}
          color={"#9ea1a7"}
          display={"inline-flex"}
          alignItems={"baseline"}
          fontWeight={"600"}
        >
          Wrong/Missing Fulfillment times :{" "}
          <Typography color="black" fontSize={"10px"}>
            {" "}
            0
          </Typography>
        </Typography>
      </Box>
      <Divider orientation="vertical" variant="inset" flexItem sx={{ mx: 2 }} />
      <Box display={"inline-flex"} alignItems={"center"}>
        <Typography
          fontSize={"12px"}
          color={"#9ea1a7"}
          display={"inline-flex"}
          alignItems={"baseline"}
          fontWeight={"600"}
        >
          Comments & changes times :{" "}
          <Typography color="black" fontSize={"10px"}>
            {" "}
            0
          </Typography>
        </Typography>
      </Box>
      <Divider orientation="vertical" variant="inset" flexItem sx={{ mx: 2 }} />
      <Box display={"inline-flex"} alignItems={"center"}>
        <Typography
          fontSize={"12px"}
          color={"#9ea1a7"}
          display={"inline-flex"}
          alignItems={"baseline"}
          fontWeight={"600"}
        >
          Revisiting times :{" "}
          <Typography color="black" fontSize={"10px"}>
            {" "}
            0
          </Typography>
        </Typography>
      </Box>
      <Divider orientation="vertical" variant="inset" flexItem sx={{ mx: 2 }} />
      <Box display={"inline-flex"} alignItems={"center"}>
        <Typography
          fontSize={"12px"}
          color={"#9ea1a7"}
          display={"inline-flex"}
          alignItems={"baseline"}
          fontWeight={"600"}
        >
          Revived times :{" "}
          <Typography color="black" fontSize={"10px"}>
            {" "}
            0
          </Typography>
        </Typography>
      </Box>
      <Divider orientation="vertical" variant="inset" flexItem sx={{ mx: 2 }} />
      <Box display={"inline-flex"} alignItems={"center"}>
        <Typography
          fontSize={"12px"}
          color={"#9ea1a7"}
          display={"inline-flex"}
          alignItems={"baseline"}
          fontWeight={"600"}
        >
          Journey no :{" "}
          <Typography color="black" fontSize={"10px"}>
            {" "}
            {page}
          </Typography>
        </Typography>
        <Pagination count={journies} page={page} onChange={handleChange} />
      </Box>
    </>
  );
};

export default TaskFooter;
