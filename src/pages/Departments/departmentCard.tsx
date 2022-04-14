import React from "react";
import IMAGES from "../../assets/img";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TasksCheckIcon from "../../assets/icons/TasksCheck";

type Props = { backgroundColor: string; fontColor: string };
const departmentCard: React.FC<Props> = ({ backgroundColor, fontColor }) => {
  return (
    <div
      className="department-Card"
      style={{ backgroundColor: backgroundColor }}
    >
      <div
        className="dp-card-header"
        style={{ color: fontColor, paddingTop: 8 }}
      >
        <Typography variant="h4" fontSize={20} color={fontColor}>
          Department name
        </Typography>
        <p>
          <img src={IMAGES.more} alt="more" />
        </p>
      </div>
      <div className="tasks-count" style={{ color: fontColor }}>
        <Box paddingTop={0.3} paddingRight={0.2}>
          <TasksCheckIcon color={fontColor} />
        </Box>
        4/5
      </div>
      <div className="teams">
        <div className="teamName-badge" style={{ borderColor: fontColor }}>
          Team name 1
        </div>
        <div className="teamName-badge" style={{ borderColor: fontColor }}>
          Team name 2
        </div>
        <div className="teamName-badge" style={{ borderColor: fontColor }}>
          Team name 2
        </div>
        <div className="teamName-badge" style={{ borderColor: fontColor }}>
          Team name 2
        </div>
        <div className="teamName-badge" style={{ borderColor: fontColor }}>
          Team name 2
        </div>
      </div>
      <Box
        display={"inline-flex"}
        width="100%"
        justifyContent={"space-between"}
        paddingY={2}
      >
        <Box width={"40%"} className="InProgress">
          <p className="counter-title">In progress Project</p>
          <p>02</p>
        </Box>
        <Box
          width="1px !important"
          paddingTop={0.5}
          overflow={"hidden"}
          margin={"0px 20px 0px 0px"}
          sx={{ opacity: 0.5 }}
        >
          <hr
            color="#88888885"
            style={{ width: "1px !important" }}
            className="hrVertical"
          />
        </Box>
        <Box width={"45%"} className="Done">
          <p className="counter-title">Done Project</p>
          <p>10</p>
        </Box>
      </Box>
    </div>
  );
};

export default departmentCard;
