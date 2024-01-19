import * as React from "react";
import { useDispatch } from "react-redux";
import { openConnection } from "../../services/socket.io";
import { selectUser } from "../../models/Auth";
import { clientsActions, getAllClients } from "../../models/Clients";
import {
  departmentsActions,
  getAllDepartments,
} from "../../models/Departments";
import { useAppSelector } from "../../models/hooks";
import {
  getAllProjects,
  getAllTasks,
  ProjectsActions,
  selectProjectsState,
  selectTasks,
} from "../../models/Projects";
import { selectUi } from "../../models/Ui/UI.selectors";
import { getAllCategories } from "../../models/Categories";
import { getAllMembers } from "../../models/TechMember";
import { getNotifications, getUnNotified } from "../../models/Notifications";
import { ToastSuccess } from "../components/Typos/Alert";
import {
  selectStatisticsFilterDefaults,
  setProjectsStatistics,
  setTasksStatistics,
} from "src/models/Statistics";
import { Project } from "src/types/models/Projects";

type Props = {
  children: any;
};

const AppHooks: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const {
    projects,
    setTasksStatisticsHook,
    setProjectsStatisticsHook,
    loading,
  } = useAppSelector(selectProjectsState);
  const { boards, date } = useAppSelector(selectStatisticsFilterDefaults);
  const tasks = useAppSelector(selectTasks);
  const [updateTaskData, setUpdateTaskData] = React.useState<any>(null);
  const [createTaskData, setCreateTaskData] = React.useState<any>(null);
  const [deleteTaskData, setDeleteTaskData] = React.useState<any>(null);
  const [newDepartment, setNewDepartment] = React.useState<any>(null);
  const user = useAppSelector(selectUser);
  const {
    newProjectHook,
    updateProjectHook,
    deleteTasksHook,
    deleteProjectHook,
    createTeamHook,
    updateDepartmentHook,
    createDepartmentHook,
    deleteDepartmentHook,
    deleteTeamHook,
    createProjectHook,
    deleteCategoryHook,
    createCategoryHook,
  } = useAppSelector(selectUi);

  React.useEffect(() => {
    if (createProjectHook !== undefined) {
      dispatch(getAllProjects(null));
      dispatch(getAllTasks(null));
    }
  }, [createProjectHook]);

  React.useEffect(() => {
    // create category hook
    if (createCategoryHook !== undefined) {
      dispatch(getAllCategories(null));
      dispatch(getAllDepartments(null));
      dispatch(getAllMembers(null));
    }
  }, [createCategoryHook]);

  React.useEffect(() => {
    // delete team hook
    if (deleteTeamHook !== undefined) {
      dispatch(getAllDepartments(null));
      dispatch(getAllMembers(null));
    }
  }, [deleteTeamHook]);

  React.useEffect(() => {
    // delete category hook
    if (deleteCategoryHook !== undefined) {
      dispatch(getAllCategories(null));
      dispatch(getAllDepartments(null));
    }
  }, [deleteCategoryHook]);

  React.useEffect(() => {
    // new project hook
    if (newProjectHook !== undefined) {
      dispatch(getAllClients(null));
      dispatch(getAllTasks(null));
      dispatch(getAllProjects(null));
    }
  }, [newProjectHook]);

  // update project hook
  React.useEffect(() => {
    if (updateProjectHook !== undefined) {
      dispatch(getAllClients(null));
      dispatch(getAllProjects(null));
    }
  }, [updateProjectHook]);

  // Delete task hook
  React.useEffect(() => {
    if (deleteTasksHook !== undefined) {
      dispatch(getAllTasks(null));
    }
  }, [deleteTasksHook]);

  // Delete project hook
  React.useEffect(() => {
    if (deleteProjectHook !== undefined) {
      dispatch(getAllProjects(null));
      dispatch(getAllClients(null));
    }
  }, [deleteProjectHook]);

  // new Tech member to department
  React.useEffect(() => {
    if (createTeamHook !== undefined) {
      dispatch(getAllDepartments(null));
    }
  }, [createTeamHook]);

  // update Depertment
  React.useEffect(() => {
    if (updateDepartmentHook !== undefined) {
      dispatch(getAllDepartments(null));
    }
  }, [updateDepartmentHook]);

  // create department hook
  React.useEffect(() => {
    if (createDepartmentHook !== undefined) {
      dispatch(getAllDepartments(null));
    }
  }, [createDepartmentHook]);

  // delete Department hook
  React.useEffect(() => {
    if (deleteDepartmentHook !== undefined) {
      dispatch(getAllDepartments(null));
      dispatch(getAllTasks(null));
    }
  }, [deleteDepartmentHook]);

  React.useEffect(() => {
    (async () => {
      if (updateTaskData !== null) {
        await dispatch(ProjectsActions.updateTaskData(updateTaskData));
        setUpdateTaskData(null);
      }
    })();
  }, [updateTaskData]);

  // create task hook fired
  React.useEffect(() => {
    if (createTaskData !== null) {
      dispatch(ProjectsActions.onCreateTaskData(createTaskData));
      setCreateTaskData(null);
    }
  }, [createTaskData]);

  // delete task event from backend
  React.useEffect(() => {
    if (deleteTaskData !== null) {
      dispatch(ProjectsActions.deleteTask(deleteTaskData));
    }
  }, [deleteTaskData]);

  // new department
  React.useEffect(() => {
    if (newDepartment?._id) {
      dispatch(departmentsActions.replaceDepartment(newDepartment));
    }
  }, [newDepartment]);

  React.useEffect(() => {
    if (!loading) {
      let userProjects: Project[] =
        user?.role === "PM"
          ? projects.filter((item) => item.projectManager === user._id)
          : projects;
      dispatch(
        setProjectsStatistics({ user: user, projects: userProjects, tasks })
      );
    }
  }, [setProjectsStatisticsHook, loading]);

  // set statistics hook
  React.useEffect(() => {
    if (!loading) {
      let userProjects: Project[] =
        user?.role === "PM"
          ? projects.filter((item) => item.projectManager === user._id)
          : projects;
      dispatch(
        setTasksStatistics({
          user,
          projects: userProjects,
          tasks,
        })
      );
    }
  }, [setTasksStatisticsHook, boards, date, loading]);

  React.useEffect(() => {
    if (user?._id) {
      let socket = openConnection(user);
      socket.on("create-task", (data: any) => {
        setCreateTaskData(data);
      });
      socket.on("update-task", (data: any) => {
        setUpdateTaskData(data);
      });
      socket.on("delete-task", (data: any) => {
        setDeleteTaskData(data);
      });
      // it should delete the department from the store
      socket.on("new-department-error", () => {});
      socket.on("new-department", (data) => {
        setNewDepartment(data);
      });
      socket.on("notification-update", (data: any) => {
        dispatch(getUnNotified(null));
        dispatch(getNotifications(`/0/10`));
      });
      socket.on("create-client", (client) => {
        ToastSuccess("New Client created");
        dispatch(clientsActions.createClient(client));
      });
      socket.on("delete-project", (project) => {
        dispatch(ProjectsActions.deleteProjectByIO(project));
      });
      socket.on("update-projects", (project) => {
        dispatch(ProjectsActions.updateProjectByIO(project));
      });
    }
  }, [user, dispatch]);

  return <>{props.children}</>;
};
export default AppHooks;
