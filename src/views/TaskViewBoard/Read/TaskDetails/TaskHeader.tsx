import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import EventIcon from "@mui/icons-material/Event";
import { format } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
import { Task } from "src/types/models/Projects";

interface TaskHeaderProps {
  task: Task;
  setShow: any;
}

const TaskHeader: FC<TaskHeaderProps> = ({ task, setShow }) => {
  return (
    <Grid
      item
      container
      xs={12}
      borderBottom={"1px solid #9fa1ab1a"}
      p={2}
      justifyContent={"space-between"}
      display={"inline-flex"}
    >
      <Grid item display={"inline-flex"} xs={11} sx={{ overflowX: "scroll" }}>
        <Box
          sx={{
            display: "inline-flex",
            background: "#f6f6f6",
            border: "1px solid #eaeaea",
            minWidth: 170,
            height: 35,
            borderRadius: 2,
            pl: 1.5,
            alignItems: "center",
          }}
        >
          <Typography fontSize={"16px"}>{task.status}</Typography>
          <Typography
            width={20}
            height={20}
            textAlign={"center"}
            bgcolor={"#ffc500"}
            color="white"
            borderRadius={"100%"}
            ml={1}
          >
            {task.movements.length}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="inset"
          flexItem
          sx={{ mx: 2 }}
        />
        <Box
          sx={{
            minWidth: 170,
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <Typography
            color="#9ea1a7"
            mb={0.5}
            fontWeight={"600"}
            fontSize={"12px"}
          >
            Task created:
          </Typography>
          <Typography
            color="black"
            alignItems={"center"}
            display={"inline-flex"}
            fontSize={"12px"}
          >
            <EventIcon htmlColor="#9ea1a7" sx={{ fontSize: "12px", mr: 1 }} />
            {format(new Date(task.start), "dd MMMM yyyy")}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="inset"
          flexItem
          sx={{ mx: 2 }}
        />
        <Box
          sx={{
            minWidth: 170,
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <Typography
            color="#9ea1a7"
            mb={0.5}
            fontWeight={"600"}
            fontSize={"12px"}
          >
            Due date:
          </Typography>
          <Typography
            color="black"
            alignItems={"center"}
            display={"inline-flex"}
            fontSize={"12px"}
          >
            <EventIcon htmlColor="#9ea1a7" sx={{ fontSize: "12px", mr: 1 }} />
            {task.deadline
              ? format(new Date(task.deadline), "dd MMMM yyyy")
              : "Not Set"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={1} display={"flex"} justifyContent={"flex-end"}>
        <Box
          width={35}
          height={35}
          sx={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShow("none")}
        >
          <CloseIcon
            htmlColor="black"
            sx={{ fontSize: 16, fontWeight: "200" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default TaskHeader;
