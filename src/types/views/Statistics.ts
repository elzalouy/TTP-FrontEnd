import { Task, TaskMovement } from "../models/Projects";

export type Journey = {
  clientId?: string;
  projectManager?: string;
  categoryId: string;
  taskId: string;
  index: number;
  movements: TaskMovement[];
  taskLeadTime?: number;
  teamId?: string;
  sharedAtMonth?: string;
  journeyDeadline?: string;
};
export type Journies = Journey[];
export interface ITaskInfo extends Task {
  clientId?: string;
  projectManager?: string;
}
