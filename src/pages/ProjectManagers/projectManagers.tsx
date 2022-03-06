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
import SearchBox from "../../components/SearchBox";
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
const projectManagers: React.FC<Props> = () => {
  return (
    <Box sx={{ backgroundColor: "#FAFAFB", width: "100%" }}>
      <Box className="pm-header">
        <Stack
          sx={{ margin: "70px 0 25px 0" }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography sx={{ flexGrow: 1 }} variant="h3">
            Project Managers
          </Typography>
          <button className="pmBtn">Create new PM</button>
          <br />
        </Stack>
        <Box
          style={{
            backgroundColor: "#fafafa",

            width: "350px",
          }}
        >
          <SearchBox></SearchBox>
        </Box>
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
                      style={{ width: "300px", margin: "0px", padding: "0px" }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Avatar></Avatar> <Typography>{name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ width: "300px", margin: "0px", padding: "0px" }}
                    >
                      {email}
                    </TableCell>
                    <TableCell align="left">{progressTask}</TableCell>
                    <TableCell align="left">{progressProject}</TableCell>
                    <TableCell align="left">{doneProject}</TableCell>

                    <TableCell align="left">
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                      >
                        <IconButton>
                          <img src={IMAGES.editicon} alt="editicon" />
                        </IconButton>

                        <IconButton>
                          <img src={IMAGES.deleteicon} alt="deleteicon" />
                        </IconButton>
                      </Stack>
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
export default projectManagers;
