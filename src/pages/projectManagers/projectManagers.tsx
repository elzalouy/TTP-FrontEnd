import { Avatar, Checkbox, IconButton, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import * as React from "react";
import IMAGES from "../../assets/img/index";
import SearchBox from "../../coreUI/usable-component/Inputs/SearchBox";
import CreateNewPM from "../../components/popups/CreateNewPM";
import "./projectManagers.css";
const cellsData = [
  {
    id: 1,
    name: "Lindsey Stoud",
    email: "lindseystoud@gmail.com",
    progressTask: 2,
    progressProject: 3,
    doneProject: 1,
  },
  {
    id: 2,
    name: "Lindsey Stoud",
    email: "lindseystoud@gmail.com",
    progressTask: 2,
    progressProject: 3,
    doneProject: 1,
  },
  {
    id: 3,
    name: "Lindsey Stoud",
    email: "lindseystoud@gmail.com",
    progressTask: 2,
    progressProject: 3,
    doneProject: 1,
  },
  {
    id: 4,
    name: "Lindsey Stoud",
    email: "lindseystoud@gmail.com",
    progressTask: 2,
    progressProject: 3,
    doneProject: 1,
  },
  {
    id: 5,
    name: "Lindsey Stoud",
    email: "lindseystoud@gmail.com",
    progressTask: 2,
    progressProject: 3,
    doneProject: 1,
  },
  {
    id: 6,
    name: "Lindsey Stoud",
    email: "lindseystoud@gmail.com",
    progressTask: 2,
    progressProject: 3,
    doneProject: 1,
  },
  {
    id: 7,
    name: "Lindsey Stoud",
    email: "lindseystoud@gmail.com",
    progressTask: 2,
    progressProject: 3,
    doneProject: 1,
  },
];

type Props = {};
const ProjectManagers: React.FC<Props> = () => {
  return (
    <Box sx={{ backgroundColor: "#FAFAFB", width: "100%" }}>
      <Box
        width={"100%"}
        paddingLeft={3.8}
        paddingRight={12.5}
        paddingTop={6}
        paddingBottom={12}
        flexDirection="row"
        display="inline-flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h2">Project Managers</Typography>
        <CreateNewPM />
      </Box>
      <Paper className="pm-container">
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    color: "#334D6E",
                    width: "30px",
                    margin: "0px",
                    padding: "0px 0px 0px 10px",
                  }}
                >
                  <Checkbox className="col-grey" color="primary" />
                </TableCell>
                <TableCell
                  style={{
                    color: "#334D6E",
                    width: "300px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  PM Name
                </TableCell>
                <TableCell
                  style={{
                    color: "#334D6E",
                    width: "300px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={{
                    color: "#334D6E",
                    width: "200px",
                    margin: "0px",
                    paddingRight: "15px",
                  }}
                >
                  In Progress Task
                </TableCell>
                <TableCell
                  style={{
                    color: "#334D6E",
                    width: "250px",
                    margin: "0px",
                    paddingRight: "15px",
                  }}
                >
                  In Progress Projects
                </TableCell>
                <TableCell
                  style={{
                    color: "#334D6E",
                    width: "158px",
                    margin: "0px",
                    paddingRight: "15px",
                  }}
                >
                  Done Project
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "#334D6E", width: "50px", margin: "0px" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cellsData.map((cellData) => {
                const {
                  id,
                  name,
                  email,
                  progressTask,
                  progressProject,
                  doneProject,
                } = cellData;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                    <TableCell
                      style={{
                        width: "50px",
                        margin: "0px",
                        paddingLeft: "10px",
                      }}
                    >
                      <Checkbox className="col-grey" color="primary" />
                    </TableCell>

                    <TableCell
                      align="left"
                      style={{
                        width: "300px",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                      >
                        <Avatar sx={{ width: 20, height: 20 }} />
                        <Typography
                          fontWeight={"700"}
                          fontSize={15}
                          sx={{
                            color: "#323C47",
                          }}
                        >
                          {name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        width: "300px",
                        margin: "0px",
                        padding: "0px",
                        color: "#707683",
                      }}
                    >
                      {email}
                    </TableCell>
                    <TableCell align="left">
                      <Typography color="#707683">{progressTask}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography color="#707683">{progressProject}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography color="#707683">{doneProject}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box display={"inline-flex"}>
                        <IconButton>
                          <img src={IMAGES.editicon} alt="editicon" />
                        </IconButton>

                        <IconButton>
                          <img src={IMAGES.deleteicon} alt="deleteicon" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
export default ProjectManagers;
