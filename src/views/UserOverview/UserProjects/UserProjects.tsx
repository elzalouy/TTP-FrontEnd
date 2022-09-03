import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "src/models/hooks";
import { selectPMs } from "src/models/PM";
import TableBox from "src/coreUI/components/Containers/Table/TableContainer";
import ProjectsTable from "src/coreUI/components/Tables/ProjectsTable";
import { RouteComponentProps } from "react-router";
import { Project } from "src/types/models/Projects";
import IMAGES from "src/assets/img/Images";
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
  projects?: Project[] | null;
}
const UserProjects: React.FC<Props> = (props) => {
  const PMs = useAppSelector(selectPMs);

  return (
    <TableBox
      title={"Projects Close To Deadline"}
      outTitled={true}
      expanded={true}
      bgColor={""}
    >
      {props.projects === null || props.projects?.length === 0 ? (
        <>
          <Grid
            container
            width="100%"
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            direction={"row"}
            flexDirection={"row"}
            height={"100%"}
            overflow={"hidden"}
            marginLeft={{ lg: 15 }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              textAlign={{ lg: "right" }}
            >
              <Box width={"300px"} height={"300px"} marginLeft={15}>
                <img
                  src={IMAGES.OvervieCloseProjectsEmpty}
                  width="100%"
                  height="100%"
                  alt=""
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              paddingBottom={12}
              textAlign={{ lg: "left" }}
            >
              <Typography fontSize={"22px"} fontWeight={"bold"} color="#505050">
                We are fair away from deadlines !!!
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <ProjectsTable
          progress={true}
          align={"left"}
          textSize="small"
          status={"In progress"}
          expanded={true}
          projectManagers={PMs}
          {...props}
        />
      )}
    </TableBox>
  );
};
export default UserProjects;
