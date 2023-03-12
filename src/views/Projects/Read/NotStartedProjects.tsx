import React, { useState } from "react";
import "../Create/createNewProject.css";
import Box from "@mui/material/Box";
import { useAppSelector } from "src/models/hooks";
import { useDispatch } from "react-redux";
import IMAGES from "src/assets/img/Images";
import { toggleCreateProjectPopup } from "src/models/Ui";
import TableBox from "src/coreUI/components/Containers/Table/TableContainer";
import ProjectsTable from "src/coreUI/components/Tables/ProjectsTable";
import { selectManagers } from "src/models/Managers";
import "./projects.css";
import { Project } from "src/types/models/Projects";
import { CreateProjectContainerStyles } from "./styles";

type Props = {
  editProject: any;
  deleteProject: any;
  projects: Project[];
};

const CreateNewProject: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const style = CreateProjectContainerStyles(props);
  const dispatch = useDispatch();
  const PMs = useAppSelector(selectManagers);
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
      <Box id="project-container" sx={style.notStartedContainer}>
        <div className="create-button-table-wrapper">
          <ProjectsTable
            dataTestIdQuote="NotStarted-projects-"
            align="center"
            textSize="medium"
            status={"Not Started"}
            condition={props.projects?.length === 0 ? true : false}
            expanded={expanded}
            projectManagers={PMs}
            projects={props.projects}
            deleteProject={props.deleteProject}
            editProject={props.editProject}
          />
        </div>
        <Box
          onClick={() => {
            setShow("flex");
          }}
          sx={style.createProjectBtn}
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
