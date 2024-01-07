import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import _ from "lodash";
import React, { FC } from "react";
import IMAGES from "src/assets/img/Images";
import TableLoading from "src/coreUI/components/Loading/TableLoading";
import { Client } from "src/models/Clients";
import { IDepartmentState } from "src/types/models/Departments";
import { Project } from "src/types/models/Projects";
import { ITaskInfo, Journies } from "src/types/views/Statistics";

interface ProjectsReportProps {
  departments: IDepartmentState[];
}

interface HeadCell {
  id: any;
  label: string;
  type: string;
}

const TeableHeaderCells: readonly HeadCell[] = [
  {
    id: "clientName",
    label: "Client Name",
    type: "string",
  },
  {
    id: "projectName",
    label: "Project Name",
    type: "string",
  },
  {
    id: "projectManager",
    label: "Project Manager",
    type: "string",
  },
  {
    id: "projectStartDate",
    label: "Project Start Date",
    type: "number",
  },
  {
    id: "projectDeliveryDate",
    label: "Project Delivery Date",
    type: "number",
  },
  {
    id: "projectStatus",
    label: "Project Status",
    type: "string",
  },
  {
    id: "deliveryStatus",
    label: "Delivery Status",
    type: "string",
  },
  {
    id: "_OfTasks",
    label: "Number of tasks",
    type: "number",
  },
  { id: "_OfJournies", label: "No of journies", type: "number" },
];

enum Order {
  "asc",
  "desc",
  false,
}

type stateType = {
  popup: boolean;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: string;
  clients: Client[];
  projects: Project[];
  tasks: ITaskInfo[];
  journeys: { id: string; name: string; journies: Journies }[];
  cells: {
    clientName: string;
    projectName: string;
    projectManager: string;
    projectStartDate: number;
    projectDeliveryDate: number;
    projectStatus: string;
    deliveryStatus: string;
    _OfTasks: number;
    _OfJournies: number;
  }[];
  filter: {
    startDate: string | null;
    endDate: string | null;
  };
};

const ProjectsReport: FC<ProjectsReportProps> = () => {
  const [state, setState] = React.useState<stateType>({
    popup: false,
    loading: true,
    page: 0,
    rowsPerPage: 8,
    order: Order.asc,
    orderBy: "projectName",
    tasks: [],
    projects: [],
    clients: [],
    cells: [],
    journeys: [],
    filter: {
      startDate: null,
      endDate: null,
    },
  });
  const theme = useTheme();

  const MD = useMediaQuery(theme.breakpoints.down("md"));

  const createSortHandler = (
    orderBy:
      | "projectName"
      | "_OfJournies"
      | "clientName"
      | "projectManager"
      | "projectStartDate"
      | "projectDeliveryDate"
      | "projectStatus"
      | "deliveryStatus"
      | "_OfTasks",
    type: string
  ) => {
    const order =
      state.orderBy !== orderBy
        ? "asc"
        : state.order === Order.asc
        ? "desc"
        : "asc";
    let State = { ...state };
    State.orderBy = orderBy;
    State.order = Order[order];
    State.cells = _.orderBy(State.cells, (i) => i[orderBy], order);
    setState(State);
  };

  return (
    <Grid
      className="customScrollBar"
      sx={{
        display: "flex",
        background: "white",
        borderRadius: "5px",
        margin: "8px",
        pl: 1,
        pr: 1,
        pt: 1,
        marginBottom: 2,
        justifyContent: "space-between",
        width: "100%",
        overflowY: "hidden",
      }}
      container
    >
      <Grid xs={10}>
        <Typography fontSize={18} mb={1} p={2} fontWeight={"600"}>
          Projects Master Report
        </Typography>
      </Grid>
      <Grid xs={2}>
        <IconButton
          disableRipple
          onClick={() => setState({ ...state, popup: true })}
          sx={filterBtnStyle}
        >
          <img src={IMAGES.filtericon} alt="FILTER" />
        </IconButton>
      </Grid>
      <Table style={{ width: "100%", overflowY: "scroll", float: "left" }}>
        <TableHead>
          <TableRow>
            {TeableHeaderCells.map((headCell) => {
              return (
                <TableCell
                  size="small"
                  key={headCell.id}
                  width={"350px"}
                  style={{
                    color:
                      state.orderBy === headCell.id ? "#ffc500" : "#334D6E",
                    fontWeight:
                      state.orderBy === headCell.id ? "bold" : "normal",
                    visibility: "visible",
                    height: "40px",
                    width: "350px",
                  }}
                  sortDirection={
                    state.orderBy === headCell.id
                      ? state.order === Order.asc
                        ? "asc"
                        : "desc"
                      : undefined
                  }
                >
                  <TableSortLabel
                    color="#334D6E"
                    sx={{
                      width: "100%",
                      justifyContent: "space-between",
                      paddingLeft: "5px",
                      color: "#334D6E",
                      ":hover": {
                        color:
                          headCell.id === state.orderBy ? "black" : "#334D6E",
                      },
                    }}
                    hideSortIcon={false}
                    IconComponent={() =>
                      state.orderBy === headCell.id ? (
                        state.order === Order.asc ? (
                          <ArrowDownward
                            sx={{
                              color:
                                state.orderBy === headCell.id
                                  ? "black"
                                  : "#334D6E",
                              fontSize: "14px",
                            }}
                          ></ArrowDownward>
                        ) : (
                          <ArrowUpward
                            sx={{
                              color:
                                state.orderBy === headCell.id
                                  ? "black"
                                  : "#334D6E",
                              fontSize: "14px",
                            }}
                          ></ArrowUpward>
                        )
                      ) : (
                        <ArrowDownward
                          sx={{
                            color: "#334D6E",
                            fontSize: "14px",
                          }}
                        ></ArrowDownward>
                      )
                    }
                    active={state.orderBy === headCell.id}
                    direction={
                      state.orderBy === headCell.id
                        ? state.order === Order.asc
                          ? "asc"
                          : "desc"
                        : "asc"
                    }
                    onClick={(e) =>
                      createSortHandler(headCell.id, headCell.type)
                    }
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        {state.loading ? (
          <>
            <TableLoading rows={3} columns={9} name="client-health-tracker" />
          </>
        ) : (
          <></>
        )}
      </Table>
    </Grid>
  );
};

export default ProjectsReport;

const filterBtnStyle = {
  bgcolor: "#FAFAFB",
  borderRadius: 3,
  paddingTop: 1.2,
  float: "right",
  cursor: "pointer",
  width: "38px",
  height: "38px",
  textAlign: "center",
};
