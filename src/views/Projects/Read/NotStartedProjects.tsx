import React, { useState } from "react";
import "../Create/createNewProject.css";
import Box from "@mui/material/Box";
import { useAppSelector } from "src/models/hooks";
import { selectNotStartedProjects, selectLoading } from "src/models/Projects";
import { selectNewProject } from "src/models/Projects/projects.selectors";
import { useDispatch } from "react-redux";
import IMAGES from "src/assets/img/Images";
import { toggleCreateProjectPopup } from "src/models/Ui";
import Loading from "src/coreUI/components/Loading/Loading";
import TableBox from "src/coreUI/components/Containers/Table/TableContainer";
import ProjectsTable from "src/coreUI/components/Tables/ProjectsTable";
import { selectManagers } from "src/models/Managers";
import { RouteComponentProps } from "react-router";
import "./projects.css";

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
  const PMs = useAppSelector(selectManagers);
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
          <div className="create-button-table-wrapper">
            <ProjectsTable
              dataTestIdQuote="NotStarted-projects-"
              align="center"
              textSize="medium"
              status={"Not Started"}
              condition={notStartedProjects?.length === 0 ? true : false}
              expanded={expanded}
              projects={notStartedProjects}
              projectManagers={PMs}
              {...props}
            />
          </div>
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
