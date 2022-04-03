import React from "react";
import "./tasks.css";
import IMAGES from "../../assets/img/index";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import SearchBox from "../../components/SearchBox";

type Props = {};

const tasks: React.FC<Props> = () => {
  const columns: GridColDef[] = [
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.6,
      filterable: false,
      sortable: false,
      hideable: false,
      renderCell: (params: GridValueGetterParams) => (
        <div className={`task-status-${params.value}`}>{params.value}</div>
      ),
    },
    {
      field: "taskName",
      headerName: "Task name",
      minWidth: 100,
      flex: 2,
      filterable: false,
      sortable: false,
      hideable: false,
    },
    {
      field: "projectName",
      headerName: "Project name",
      minWidth: 100,
      flex: 1,
      filterable: false,
      sortable: false,
      hideable: false,
    },
    {
      field: "version",
      headerName: "Version",
      minWidth: 100,
      flex: 0.5,
      filterable: false,
      sortable: false,
      hideable: false,
    },
    {
      field: "briefDate",
      headerName: "Brief date",
      minWidth: 100,
      flex: 1,
      filterable: false,
      sortable: false,
      hideable: false,
    },
    {
      field: "deadline",
      headerName: "Deadline",
      minWidth: 100,
      flex: 1,
      filterable: false,
      sortable: false,
      hideable: false,
    },
  ];

  const rows = [
    {
      id: 1,
      status: "Shared",
      taskName: "Lorem ipsum dolor sit amet, consetetur",
      projectName: "Lindsey Stroud",
      version: 1,
      briefDate: "Der 14, 2018",
      deadline: "Der 14, 2018",
    },
    {
      id: 2,
      status: "Ended",
      taskName: "Lorem ipsum dolor sit amet.",
      projectName: "Lindsey Stroud",
      version: 4,
      briefDate: "Der 14, 2018",
      deadline: "Der 14, 2018",
    },
    {
      id: 3,
      status: "Done",
      taskName: "lerom ip",
      projectName: "Lindsey Stroud",
      version: 3,
      briefDate: "Der 14, 2018",
      deadline: "Der 14, 2018",
    },
    {
      id: 4,
      status: "Done",
      taskName: "Lorem ipsum dolor sit amet.",
      projectName: "Lindsey Stroud",
      version: 8,
      briefDate: "Der 14, 2018",
      deadline: "Der 14, 2018",
    },
    {
      id: 5,
      status: "Shared",
      taskName: "Lorem ipsum dolor sit amet.",
      projectName: "Lindsey Stroud",
      version: 9,
      briefDate: "Der 14, 2018",
      deadline: "Der 14, 2018",
    },
    {
      id: 6,
      status: "Ended",
      taskName: "Lorem ipsum dolor sit amet.",
      projectName: "Lindsey Stroud",
      version: 12,
      briefDate: "Der 14, 2018",
      deadline: "Der 14, 2018",
    },
    {
      id: 7,
      status: "Ended",
      taskName: "Lorem ipsum dolor sit amet.",
      projectName: "Lindsey Stroud",
      version: 4,
      briefDate: "Der 14, 2018",
      deadline: "Der 14, 2018",
    },
    {
      id: 8,
      status: "Done",
      taskName: "Lorem ipsum dolor sit amet.",
      projectName: "Lindsey Stroud",
      version: 7,
      briefDate: "Der 14, 2018",
      deadline: "Der 14, 2018",
    },
  ];
  return (
    <Box className="tasks-page" sx={{ width: '100%' }}>
      <Box sx={{ paddingTop: '30px' }}>
        <Typography
          variant="h2"
          style={{
            margin: "10px 0",
            paddingBottom: "20px",
          }}
        >
          Tasks
        </Typography>
      </Box>
      <div className="tasks-tools">
        <Box className="tasks-option">
          <label>Date:</label>
          <div className="select-container">
            <select className="select-filter" name="color">
              <option value="A to Z">Due Date</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>
        <Box className="tasks-option">
          <label>Status:</label>
          <div className="select-container">
            <select className="select-filter2 " name="color">
              <option value="A to Z">All</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>

        <Box className="tasks-option">
          <label >Project manager:</label>
          <div className="select-container">
            <select className="select-filter" name="color">
              <option value="Nawaf m">Nawaf m</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>

        <Box className="tasks-option">
          <label>Clients:</label>
          <div className="select-container">
            <select className="select-filter2" name="color">
              <option value="Nawaf m">All</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>

        <Box className="tasks-option">
          <label>Project:</label>
          <div className="select-container">
            <select className="select-filter2" name="color">
              <option value="Nawaf m">All</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>

        <Box className="tasks-option">
          <label>Teams:</label>
          <div className="select-container">
            <select className="select-filter2" name="color">
              <option value="Nawaf m">All</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>
        <div className="deleteBtn-tasks">
          <img src={IMAGES.deleteicon} alt="delete" />
        </div>
        <SearchBox></SearchBox>
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          sx={{
            minHeight: "70vh",
            width: "100%",
            backgroundColor: "white",
            border: 0,
            "& .MuiDataGrid-row": {
              "&:hover": {
                boxShadow: " 0 0 5px grey",
                backgroundColor: "white",
              },
            },
            "& .MuiCheckbox-root": {
              color: "#D5D5D5",
            },

            "& .MuiCheckbox-root.Mui-checked": {
              color: "black",
            },
            "& .MuiDataGrid-footerContainer": {
              display: "none !important",
            },
            "& .MuiDataGrid-iconSeparator": {
              display: "none !important",
            },
          }}
          rows={rows}
          columns={columns}
          checkboxSelection
          disableColumnSelector
        />
      </div>

      <div className="loading-card">
        <img src={IMAGES.smallLoading} alt="loading" />
        <p>Loading more</p>
      </div>
    </Box>
  );
};

export default tasks;
