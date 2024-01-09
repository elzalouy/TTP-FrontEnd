import { Client } from "src/models/Clients";
import { DialogOption } from "../components/SelectDialog";
import { Project } from "../models/Projects";
import { ITaskInfo, Journies } from "./Statistics";

export interface HeadCell {
  id: any;
  label: string;
  type: string;
}
export enum Order {
  "asc",
  "desc",
  false,
}

export const TeableHeaderCells: readonly HeadCell[] = [
  {
    id: "clientName",
    label: "Client Name",
    type: "string",
  },
  {
    id: "lastBrief",
    label: "Last Brief",
    type: "number",
  },
  {
    id: "_ofProjects",
    label: "# of Projects",
    type: "number",
  },
  {
    id: "_OfTasks",
    label: "# of Tasks",
    type: "number",
  },
  {
    id: "journies",
    label: "# of Journies",
    type: "number",
  },
  {
    id: "_OfRevision",
    label: "# of Revision",
    type: "number",
  },
  {
    id: "averageTOD",
    label: "Average TOD",
    type: "number",
  },
  {
    id: "_OfActive",
    label: "# of Active",
    type: "number",
  },
  {
    id: "meetDeadline",
    label: "Meet Deadline",
    type: "number",
  },
];

export type stateType = {
  popup: boolean;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: string;
  clients: Client[];
  allProjects: Project[];
  projects: Project[];
  allTasks: ITaskInfo[];
  tasks: ITaskInfo[];
  allTasksJournies: { id: string; name: string; journies: Journies }[];
  tasksJournies: { id: string; name: string; journies: Journies }[];
  allJournies: Journies;
  journies: Journies;
  cells: {
    clientId: string;
    clientName: string;
    lastBrief: number;
    _ofProjects: number;
    averageTOD: number;
    _OfRevision: number;
    meetDeadline: number;
    _OfTasks: number;
    _OfActive: number;
    journies: number;
  }[];
  organization: {
    lastBrief: number;
    _ofProjects: number;
    averageTOD: number;
    _OfRevision: number;
    meetDeadline: number;
    _OfTasks: number;
    _OfActive: number;
    journies: number;
  };
  filter: {
    startDate: string | null;
    endDate: string | null;
    categories: DialogOption[];
    subCategories: DialogOption[];
  };
};
