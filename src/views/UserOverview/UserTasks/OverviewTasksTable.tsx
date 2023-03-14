import * as React from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import _ from "lodash";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router";
import moment from "moment";
import Status from "src/coreUI/components/Typos/Status";
import { Project, Task } from "../../../types/models/Projects";
import EmptyCaption from "./Empty";
import "../../../views/TasksListView/Read/TasksListView.css";
import Loading from "./Loading";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import { useAppSelector } from "src/models/hooks";
import { selectCategoriesOptions } from "src/models/Categories";
import Filters from "./Filters";
import { FiltersParams } from "src/types/views/Overview";
interface OverviewTasksTableProps {
  tasks?: Task[] | null;
  projects: Project[];
  img?: any;
  caption?: string;
}
type TState = { tasks: Task[]; categoryId?: string; projectId?: string };
const cssHeadTableCell: any = {
  color: "#9FA1AB",
  width: "30px",
  margin: "0px",
  padding: "12px 8px 12px 20px",
  fontWeight: "normal",
  zIndex: 0,
};

const OverviewTasksTable: React.FC<OverviewTasksTableProps> = ({
  tasks,
  projects,
  img,
  caption,
}) => {
  const [state, setState] = React.useState<TState>({
    tasks: [],
    projectId: "",
    categoryId: "",
  });
  const history = useHistory();
  const css = Style();
  React.useEffect(() => {
    setState({ ...state, tasks: tasks ? tasks : [] });
  }, [tasks]);

  const onSetFilters = (filters: FiltersParams) => {
    let State = { ...state };
    let filterTasks: Task[] = tasks ? tasks : [];
    if (filters.projectId && filters.projectId !== "")
      filterTasks = filterTasks.filter(
        (item) => item.projectId === filters.projectId
      );
    if (filters.categoryId && filters.categoryId !== "")
      filterTasks = filterTasks.filter(
        (item) => item.categoryId === filters.categoryId
      );
    State = { ...filters, tasks: filterTasks };
    setState(State);
  };

  return (
    <>
      <Filters
        filters={{ projectId: state?.projectId, categoryId: state?.categoryId }}
        setFilters={(filters: FiltersParams) => onSetFilters(filters)}
      />
      <Paper className={css.Paper}>
        <TableContainer
          className={`${css.tableContainer} overviewTasksTable `}
          sx={{ backgroundColor: "#FFFFFF", borderRadius: 2 }}
        >
          <Table
            stickyHeader={true}
            style={{
              borderRadius: 3,
            }}
          >
            <Loading loadingFor={tasks} />
            <EmptyCaption loadingFor={tasks} caption={caption} img={img} />
            <TableHead
              style={{
                position: "relative",
                top: 0,
              }}
            >
              <TableRow
                sx={{
                  background: "white !important",
                  borderBottom: "2px solid #FAFAFB;",
                  paddingTop: 2,
                  zIndex: 1,
                }}
              >
                <TableCell style={cssHeadTableCell}>Status</TableCell>
                <TableCell style={cssHeadTableCell}>Task Name</TableCell>
                <TableCell style={cssHeadTableCell}>Project Name</TableCell>
                <TableCell style={cssHeadTableCell}>Deadline</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.tasks &&
                state.tasks?.map((item, index) => {
                  const { _id, status, name, projectId, deadline } = item;
                  return (
                    <>
                      <TableRow
                        onClick={() => history.push(`/TasksBoard/${projectId}`)}
                        sx={{
                          ":hover": {
                            backgroundColor: "white !important",
                            boxShadow: "0px 10px 20px #0000001A",
                            transition: "all 0.5s ease-out !important",
                            WebkitAppearance: "none",
                            WebkitBoxShadow: "0px 10px 20px #0000001A",
                            position: "relative ",
                            zIndex: 0,
                          },
                        }}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={_id}
                      >
                        <TableCell
                          align="left"
                          style={{ padding: "20px" }}
                          className={
                            state.tasks.length - 1 === index
                              ? css.noBorderCell
                              : css.Cell
                          }
                        >
                          <Status status={status} />
                        </TableCell>
                        <TableCell
                          className={
                            state.tasks.length - 1 === index
                              ? css.noBorderCell
                              : css.Cell
                          }
                        >
                          {_.truncate(name, { omission: "...", length: 13 })}
                        </TableCell>
                        <TableCell
                          className={
                            state.tasks.length - 1 === index
                              ? css.noBorderCell
                              : css.Cell
                          }
                          align="left"
                        >
                          {_.truncate(
                            projects.find(
                              (project) => project._id === projectId
                            )?.name,
                            { omission: "...", length: 13 }
                          )}
                        </TableCell>
                        <TableCell
                          className={
                            state.tasks.length - 1 === index
                              ? css.noBorderCell
                              : css.Cell
                          }
                          align="left"
                        >
                          {deadline === null || deadline === ""
                            ? "-"
                            : moment(deadline).format("Do, M YYYY")}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default OverviewTasksTable;

const Style = makeStyles((theme: any) => ({
  Paper: {
    overFlow: "hidden",
  },
  Cell: {
    color: "#334D6E",
    margin: "0px",
    padding: "20px !important",
    textTransform: "capitalize",
    width: "130px",
    align: "left",
    cursor: "pointer",
    borderBottom: "1px solid #EBEFF2;",
    fontSize: "13px",
    whiteSpace: "nowrap",
  },
  noBorderCell: {
    whiteSpace: "nowrap",
    color: "#334D6E",
    margin: "0px",
    padding: "20px !imporant",
    textTransform: "capitalize",
    width: "130px",
    align: "left",
    cursor: "pointer",
    border: 0,
    fontSize: "13px",
  },
  tableContainer: {
    maxHeight: "350px",
    overflow: "scroll",
    padding: 0,
  },
}));
