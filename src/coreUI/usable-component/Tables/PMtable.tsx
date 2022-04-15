import {
  Avatar,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import React, { FC, useState } from "react";
import IMAGES from "../../../assets/img";
import _ from "lodash";
interface ProjectManagersProps {
  cellsData: any[];
}

const ProjectManagersTable: FC<ProjectManagersProps> = ({ cellsData }) => {
  const [select, setSelected] = useState(false);
  const [selects, setAllSelected] = useState<string[]>([]);
  const setSingleSelect = (val: string, checked: boolean) => {
    if (checked === true) {
      let selected = [...selects];
      selected.push(val);
      selected = _.uniq(selected);
      setAllSelected(selected);
    } else {
      let selected = [...selects];
      _.remove(selected, (item) => item === val);
      setAllSelected(selected);
    }
  };
  console.log(selects);
  return (
    <>
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
                <Checkbox
                  onChange={(e, checked) => {
                    setSelected(checked);
                    if (checked)
                      setAllSelected(cellsData.map((item) => item.id));
                    else setAllSelected([]);
                  }}
                  className="col-grey"
                  color="primary"
                />
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
                    <Checkbox
                      checked={
                        select || selects.findIndex((i) => i === id) >= 0
                      }
                      onChange={(e, checked) =>
                        setSingleSelect(cellData.id, checked)
                      }
                      className="col-grey"
                      color="primary"
                    />
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
    </>
  );
};

export default ProjectManagersTable;
