// TODO it should be under the project folder in pages as a new folder called CreateProject
import React, { useState } from "react";
import "../Create/createNewProject.css";
import Box from "@mui/material/Box";
import { useAppSelector } from "src/models/hooks";
import { selectNotStartedProjects, selectLoading } from "src/models/Projects";
import { selectNewProject } from "src/models/Projects/projects.selectors";
import { useDispatch } from "react-redux";
import IMAGES from "src/assets/img/Images";
import { toggleCreateProjectPopup } from "src/models/Ui";
import Loading from "src/coreUI/usable-elements/Loading";
import TableBox from "src/coreUI/components/Containers/Table/TableContainer";
import ProjectsTable from "src/coreUI/components/Tables/ProjectsTable";
import { selectPMs } from "src/models/PM";
import { RouteComponentProps } from "react-router";

type Props = {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
};

const CreateNewProject: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const dispatch = useDispatch();
  const loading = useAppSelector(selectLoading);
  const notStartedProjects = useAppSelector(selectNotStartedProjects);
  const PMs = useAppSelector(selectPMs);
  const newProject = useAppSelector(selectNewProject);

  const setShow = (value: string) => {
    dispatch(toggleCreateProjectPopup(value));
  };

  return (
    <TableBox
      title={"Not Started"}
      outTitled={false}
      expanded={expanded}
      setExpanded={setExpanded}
      bgColor={"#F1F1F4"}
    >
      <Box
        id="project-container"
        sx={
          notStartedProjects?.length === 0
            ? {
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "column",
                width: "100%",
                borderRadius: "12px",
                backgroundColor: "#F1F1F4",
                py: 1,
                px: 0,
                mb: 1,
                font: "normal normal 600 16px/30px Cairo",
                color: "#505050",
              }
            : {
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "column",
                width: "100%",
                borderRadius: "12px",
                backgroundColor: "#F1F1F4",
                py: 1,
                px: 0,
                mb: 4,
                font: "normal normal 600 16px/30px Cairo",
                color: "#505050",
              }
        }
      >
        {loading === false ? (
          <ProjectsTable
            align="center"
            textSize="medium"
            status={"Not Started"}
            condition={notStartedProjects?.length === 0 ? true : false}
            expanded={expanded}
            projects={notStartedProjects}
            projectManagers={PMs}
            {...props}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              borderRadius: "12px",
              backgroundColor: "#F1F1F4",
              p: 1,
              my: 2,
              cursor: "pointer",
              font: "normal normal 600 16px/30px Cairo",
              color: "#909090",
            }}
          >
            <Loading color="grey" type="spinningBubbles" /> Loading More
          </Box>
        )}
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
            my: 1,
          }}
          data-test-id="create-project"
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
    </TableBox>
  );
};

export default CreateNewProject;
