import { RouteComponentProps } from "react-router";
import { ProjectManager } from "src/models/PM";
import { Project, Task } from "../models/Projects";

export interface IProjectsTableProps {
  progress?: boolean;
  status: string;
  expanded: boolean;
  condition?: number | boolean;
  projects?: Project[] | any;
  projectManagers: ProjectManager[];
  textSize: string;
  align: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
  dataTestIdQuote?: string;
}

export interface ITasksTableProps {
  tasks: Task[];
  projects: Project[];
  selects: any[];
  setAllSelected: (value: any) => any;
}

export interface IProjectManagersProps {
  cellsData: ProjectManager[];
}
