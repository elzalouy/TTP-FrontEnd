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
  sharedAt?: string;
  reviewAt?: string;
  reviewAtMonth?: string;
  journeyFinishedAt: string | null;
  journeyFinishedAtDate?: Date | null;
  revision: boolean;
  startedAt?: Date | string;
  startedAtMonth?: Date | string;
  unique: boolean;
  boardId: string;
};
export type Journies = Journey[];
export interface ITaskInfo extends Task {
  clientId?: string;
  projectManager?: string;
}
