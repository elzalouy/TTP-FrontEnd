import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "../../models/hooks";
import { selectPMs } from "../../models/PM";
import TableBox from "../../coreUI/components/Containers/TableContainer";
import ProjectsTable from "../../coreUI/components/Tables/ProjectsTable";
import { RouteComponentProps } from "react-router";
import { Project } from "../../types/models/Projects";
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
            direction={"row"}
            flexDirection={"row"}
            marginLeft={16}
          >
            <Box paddingLeft={4} width="28%">
              <img
                src={IMAGES.OvervieCloseProjectsEmpty}
                width="340px"
                height="340px"
                alt=""
              />
            </Box>
            <Box width="52%" paddingBottom={12}>
              <Typography fontSize={"22px"} fontWeight={"bold"} color="#505050">
                We are fair away from deadlines !!!
              </Typography>
            </Box>
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
