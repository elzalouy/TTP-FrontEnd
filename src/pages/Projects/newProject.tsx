import React, { useState } from "react";
import "./createNewProject.css";
import Box from "@mui/material/Box";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import NewProjectPopUp from "../../components/Projects/ProjectPopUp";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ProjectsActions } from "../../redux/Projects";
import { selectNewProject } from "../../redux/Projects/projects.selectors";
import IMAGES from "../../assets/img";

type Props = {};
const CreateNewProject: React.FC<Props> = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const newProject = useAppSelector(selectNewProject);
  const setShow = (value: string) => {
    let project = { ...newProject };
    project.showPopUp = value;
    dispatch(ProjectsActions.onChangeNewProject(project));
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
          p: 3,
          mb: 5,
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
            mb: 3,
          }}
        >
          Not started yet
          {expanded ? (
            <ArrowDropUpIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setExpanded(false);
              }}
            ></ArrowDropUpIcon>
          ) : (
            <ArrowDropDownIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setExpanded(true);
              }}
            ></ArrowDropDownIcon>
          )}
        </Box>
        <Box
          onClick={() => {
            setShow("flex");
          }}
          sx={{
            backgroundColor: "#E8E8E8",
            border: "2px solid #9FA1AB",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            py: 0.6,
          }}
        >
          <img src={IMAGES.plus} alt="add" height={25} style={{ marginRight: 12 }} />
          <h3 style={{ color: "black", fontWeight: "bold" }}>
            Create new project
          </h3>
        </Box>
      </Box>
      <NewProjectPopUp setShow={setShow} />
    </div>
  );
};

export default CreateNewProject;
