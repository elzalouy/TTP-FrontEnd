import React, { useState } from "react";
import "./createNewProject.css";
import Box from "@mui/material/Box";
import NewProjectPopUp from "../../components/Projects/ProjectPopUp";
import { useAppSelector } from "../../redux/hooks";
import { ProjectsActions } from "../../redux/Projects";
import { selectNewProject } from "../../redux/Projects/projects.selectors";
import { useDispatch } from "react-redux";
import IMAGES from "../../assets/img";
import { Grid } from "@mui/material";
import { toggleCreateProjectPopup } from "../../redux/Ui";

type Props = {};
const CreateNewProject: React.FC<Props> = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const newProject = useAppSelector(selectNewProject);
  const setShow = (value: string) => {
    dispatch(toggleCreateProjectPopup(value));
  };

  return (
    <div>
      <Box
        id="project-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: "12px",
          backgroundColor: "#F1F1F4",
          py: 1,
          px: 2,
          mb: 4,
          font: "normal normal 600 16px/30px Cairo",
          color: "#505050",
        }}
      >
        <Box
          id="project-header"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingLeft: 1,
            paddingBottom: 2.5,
            fontWeight: "600",
          }}
        >
          Not started yet
        </Box>
        <Box
          onClick={() => {
            setShow("flex");
          }}
          sx={{
            backgroundColor: "#E8E8E8",
            border: "1px solid #9FA1AB",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            py: 1,
          }}
        >
          <img
            src={IMAGES.plus}
            alt="add"
            height={20}
            style={{ marginRight: 12 }}
          />
          <h5 style={{ color: "black", fontWeight: "bold" }}>
            Create new project
          </h5>
        </Box>
      </Box>
    </div>
  );
};

export default CreateNewProject;
