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
    projects: number;
  };
  PM: {
    inProgress: Task[][] | null;
    review: Task[][] | null;
    reviewLength: number;
    sharedLength: number;
    shared: Task[] | null;
    tasksCloseToDeadline: Task[] | null;
    projectsCloseToDeadlines: Project[] | null;
    projects: number;
  };
  statisticsFilter: {
    date: Date;
    boards: string[];
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
    projects: 0,
  },
  PM: {
    projects: 0,
    inProgress: null,
    sharedLength: 0,
    shared: null,
    review: null,
    reviewLength: 0,
    tasksCloseToDeadline: null,
    projectsCloseToDeadlines: null,
  },
  statisticsFilter: {
    date: new Date("Fri Sep 01 2023"),
    boards: [],
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
    projects: 0,
  },
  PM: {
    projects: 0,
    inProgress: [],
    sharedLength: 0,
    shared: [],
    review: [],
    reviewLength: 0,
    tasksCloseToDeadline: [],
    projectsCloseToDeadlines: [],
  },
  statisticsFilter: {
    date: new Date("Fri Sep 01 2023"),
    boards: [],
  },
};
export default StatisticsState;
