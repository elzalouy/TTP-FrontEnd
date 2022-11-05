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
  selectAllProjects,
  selectTasks,
} from "../../models/Projects";
import { selectUi } from "../../models/Ui/UI.selectors";
import { getAllCategories } from "../../models/Categories";
import { getAllMembers } from "../../models/TechMember";
import { getNotifications, getUnNotified } from "../../models/Notifications";
import { ToastSuccess } from "../components/Typos/Alert";
import {
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
  } = useAppSelector(selectAllProjects);
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
      console.log("create project hook fired");
      dispatch(getAllProjects(null));
      dispatch(getAllTasks(null));
    }
  }, [createProjectHook]);

  React.useEffect(() => {
    // create category hook
    if (createCategoryHook !== undefined) {
      console.log("create category hook fired");
      dispatch(getAllCategories(null));
      dispatch(getAllDepartments(null));
      dispatch(getAllMembers(null));
    }
  }, [createCategoryHook]);

  React.useEffect(() => {
    // delete team hook
    if (deleteTeamHook !== undefined) {
      console.log("delete team hook fired");
      dispatch(getAllDepartments(null));
      dispatch(getAllMembers(null));
    }
  }, [deleteTeamHook]);

  React.useEffect(() => {
    // delete category hook
    if (deleteCategoryHook !== undefined) {
      console.log("delete category hook fired");
      dispatch(getAllCategories(null));
      dispatch(getAllDepartments(null));
    }
  }, [deleteCategoryHook]);

  React.useEffect(() => {
    // new project hook
    if (newProjectHook !== undefined) {
      console.log("new project hook fired");
      dispatch(getAllClients(null));
      dispatch(getAllTasks(null));
      dispatch(getAllProjects(null));
    }
  }, [newProjectHook]);

  // update project hook
  React.useEffect(() => {
    if (updateProjectHook !== undefined) {
      console.log("update project hook fired.");
      dispatch(getAllClients(null));
      dispatch(getAllProjects(null));
    }
  }, [updateProjectHook]);

  // Delete task hook
  React.useEffect(() => {
    if (deleteTasksHook !== undefined) {
      console.log("delete tasks hook fired.");
      dispatch(getAllTasks(null));
    }
  }, [deleteTasksHook]);

  // Delete project hook
  React.useEffect(() => {
    if (deleteProjectHook !== undefined) {
      console.log("delete project hook fired.");
      dispatch(getAllProjects(null));
      dispatch(getAllClients(null));
    }
  }, [deleteProjectHook]);

  // new Tech member to department
  React.useEffect(() => {
    if (createTeamHook !== undefined) {
      console.log("new member hook fired.");
      dispatch(getAllDepartments(null));
    }
  }, [createTeamHook]);

  // update Depertment
  React.useEffect(() => {
    if (updateDepartmentHook !== undefined) {
      console.log("update department hook fired.");
      dispatch(getAllDepartments(null));
    }
  }, [updateDepartmentHook]);

  // create department hook
  React.useEffect(() => {
    if (createDepartmentHook !== undefined) {
      console.log("create department hook fired.");
      dispatch(getAllDepartments(null));
    }
  }, [createDepartmentHook]);

  // delete Department hook
  React.useEffect(() => {
    if (deleteDepartmentHook !== undefined) {
      console.log("delete department hook fired.");
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
      console.log("new department socket fired");
      dispatch(departmentsActions.replaceDepartment(newDepartment));
    }
  }, [newDepartment]);

  React.useEffect(() => {
    if (!loading) {
      let userProjects: Project[] = [];
      if (user?.role !== "PM") userProjects = projects;
      else
        userProjects = projects.filter(
          (item) =>
            item.projectStatus &&
            item.projectManager?._id === user?._id &&
            ![
              "deliver on time",
              "deliver before deadline",
              "delivered after deadline",
            ].includes(item?.projectStatus)
        );
      dispatch(setProjectsStatistics({ user: user, projects: userProjects }));
    }
  }, [setProjectsStatisticsHook]);

  // set statistics hook
  React.useEffect(() => {
    if (!loading) {
      let userProjects: Project[] = [];
      if (user?.role !== "PM") userProjects = projects;
      else
        userProjects = projects.filter(
          (item) =>
            item.projectStatus &&
            item.projectManager?._id === user?._id &&
            ![
              "deliver on time",
              "deliver before deadline",
              "delivered after deadline",
            ].includes(item?.projectStatus)
        );
      dispatch(
        setTasksStatistics({
          user,
          projects: userProjects,
          tasks,
        })
      );
    }
  }, [setTasksStatisticsHook]);

  React.useEffect(() => {
    if (user?._id) {
      let socket = openConnection(user);
      socket.on("create-task", (data: any) => {
        console.log(" create task socket fired.", data);
        setCreateTaskData(data);
      });
      socket.on("update-task", (data: any) => {
        console.log(" update task socket fired.", data);
        setUpdateTaskData(data);
      });
      socket.on("delete-task", (data: any) => {
        console.log(" delete task socket fired.", data);
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
        console.log("create client socket event fired", client);
        ToastSuccess("New Client created");
        dispatch(clientsActions.createClient(client));
      });
      socket.on("delete-project", (project) => {
        console.log({ project });
        dispatch(ProjectsActions.deleteProjectByIO(project));
      });
      socket.on("update-projects", (project) => {
        console.log({ update: project });
        dispatch(ProjectsActions.updateProjectByIO(project));
      });
    }
  }, [user, dispatch]);

  return <>{props.children}</>;
};
export default AppHooks;
