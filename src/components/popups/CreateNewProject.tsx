import React from "react";
import "./createNewProject.css";
import Box from "@mui/material/Box";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import NewProjectPopUp from "../../components/Projects/ProjectPopUp";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ProjectsActions, selectNewProject } from "../../redux/Projects";

type Props = {};
const CreateNewProject: React.FC<Props> = () => {
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
        className="black-btn"
        onClick={() => {
          setShow("flex");
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
            mb: 1,
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
            border: "2px solid #9FA1AB",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            py: 0.6,
          }}
        >
          <AddBoxOutlinedIcon sx={{ color: "black" }}></AddBoxOutlinedIcon>
          <h3 style={{ color: "black", fontWeight: "bold" }}>
            Add new project
          </h3>
        </Box>
      </Box>
      <NewProjectPopUp setShow={setShow} />
    </div>
  );
};

export default CreateNewProject;
