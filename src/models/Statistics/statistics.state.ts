import { Project, Task } from "../../types/models/Projects";

export interface StatisticsInterface {
  loading: boolean;
  OM: {
    taskboard: Task[][] | null;
    taskBoardLength: number;
    review: Task[][] | null;
    reviewLength: number;
    shared: Task[][] | null;
    sharedLength: number;
    inProgress: Task[] | null;
    inProgressLength: number;
    tasksCloseToDeadline: Task[] | null;
    projectsCloseToDeadlines: Project[] | null;
  };
  PM: {
    inProgress: Task[][] | null;
    review: Task[][] | null;
    reviewLength: number;
    sharedLength: number;
    shared: Task[] | null;
    tasksCloseToDeadline: Task[] | null;
    projectsCloseToDeadlines: Project[] | null;
    projects: Project[] | null;
  };
}

const StatisticsState: StatisticsInterface = {
  loading: true,
  OM: {
    taskboard: null,
    taskBoardLength: 0,
    inProgress: null,
    review: null,
    reviewLength: 0,
    shared: null,
    sharedLength: 0,
    projectsCloseToDeadlines: null,
    tasksCloseToDeadline: null,
    inProgressLength: 0,
  },
  PM: {
    projects: null,
    inProgress: null,
    sharedLength: 0,
    shared: null,
    review: null,
    reviewLength: 0,
    tasksCloseToDeadline: null,
    projectsCloseToDeadlines: null,
  },
};
export const initialStatisticsState: StatisticsInterface = {
  loading: false,
  OM: {
    taskboard: [],
    taskBoardLength: 0,
    inProgress: [],
    review: [],
    reviewLength: 0,
    shared: [],
    sharedLength: 0,
    projectsCloseToDeadlines: [],
    tasksCloseToDeadline: [],
    inProgressLength: 0,
  },
  PM: {
    projects: [],
    inProgress: [],
    sharedLength: 0,
    shared: [],
    review: [],
    reviewLength: 0,
    tasksCloseToDeadline: [],
    projectsCloseToDeadlines: [],
  },
};
export default StatisticsState;
