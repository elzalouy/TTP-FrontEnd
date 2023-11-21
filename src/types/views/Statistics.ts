import { Client } from "src/models/Clients";
import { Manager } from "src/models/Managers";
import { Category } from "src/models/Categories";
import { Task, TaskMovement } from "../models/Projects";
import { IDepartmentState, ITeam } from "../models/Departments";

export type Journey = {
  name?: string;
  clientId?: string;
  projectManager?: string;
  categoryId: string;
  taskId: string;
  index: number;
  movements: TaskMovement[];
  leadTime?: number;
  teamId?: string;
  sharedAtMonth?: string;
  sharedAt?: string;
  reviewAt?: string;
  reviewAtMonth?: string;
  journeyFinishedAt: string | null;
  journeyFinishedAtDate?: Date | null;
  revision: boolean;
  startedAt: Date | string;
  startedAtMonth?: Date | string;
  unique: boolean;
  boardId: string;
  journeyDeadline: Date | null;
  cardCreatedAt: Date | string;
  journeyDeadlines: (Date | string)[];
};
export type Journies = Journey[];
export interface ITaskInfo extends Task {
  clientId?: string;
  projectManager?: string;
}

export type TaskJourniesDetails = {
  id: string;
  name: string;
  journeyIndex: number;
  projectName: string;
  clientName: string;
  categoryName: string;
  subCategoryName: string;
  status: string;
  projectManager: string;
  startDate: string;
  dueDate: string;
  movementsCount: number;
  journeyLeadTime: string;
  journeyProcessingTime: string;
  journeySchedulingTime: string;
  journeyUnClearCounts: number;
  journeyUnClearTime: string;
  journeyTurnAroundTime: string;
  journeyFullfilmentTime: string;
  journeyDeliveryTime: string;
  journeyClosingTime: string;
  journeyCanceled: boolean;
  journeyDisturbed: boolean;
  journeyFlagged: boolean;
  journeyLateScheduling: boolean;
  missedDelivery: boolean;
  journeyVerified: boolean;
  journeyUnHealthy: boolean;
  journeyClearBackTime: string;
  wrongOrMissingFulfillmentTimes: string;
  wrongOrMissingFulfillmentTime: string;
  commentsOrChangesTime: string;
  commentsOrChangesTimes: string;
  revisitingTime: string;
  revisitingTimes: string;
  revivedTime: string;
  revivedTimes: string;
  deliveryStatus: string;
};
export interface StateType {
  filterPopup: boolean;
  filter: {
    start: string | null;
    end: string | null;
  };
  data: DatasetType;
  options: any;
  comparisonBy: string;
  year?: number;
  quarter?: number;
}
export type TodByCategoryProps = {
  options: {
    teams: ITeam[];
    clients: Client[];
    managers: Manager[];
    categories: Category[];
    boards: IDepartmentState[];
    tasks: Task[];
  };
};

export type DatasetType = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    datasetData: {
      journies: Journey[];
      color: string;
      borderColor: string;
      comparisonId?: string;
      comparisonName?: string;
    }[];
    journies: Journies;
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    hoverBorderWidth: number;
    skipNull: boolean;
  }[];
};
