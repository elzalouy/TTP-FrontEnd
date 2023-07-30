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
  journeyFinishedAt: string | null;
  revision: boolean;
  startedAt?: Date | string;
  unique: boolean;
};
export type Journies = Journey[];
export interface ITaskInfo extends Task {
  clientId?: string;
  projectManager?: string;
}
