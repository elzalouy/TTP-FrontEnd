import { RouteComponentProps } from "react-router";
import { Manager } from "src/models/Managers";
import { Project, Task } from "../models/Projects";

export interface IProjectsTableProps {
  progress?: boolean;
  status: string;
  expanded: boolean;
  condition?: number | boolean;
  projects?: Project[] | any;
  projectManagers: Manager[];
  textSize: string;
  editProject: any;
  deleteProject: any;
  align: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  dataTestIdQuote?: string;
}

export interface ITasksTableProps {
  tasks: Task[];
  projects: Project[];
  selects: any[];
  setAllSelected: (value: any) => any;
}
