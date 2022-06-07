import { Project, Task } from "../Projects";

export interface StatisticsInterface {
  loading: boolean;
  OM: {
    Taskboard: Task[] | null;
    inProgress: Task[] | null;
    Review: Task[] | null;
    Shared: Task[] | null;
    projectsCloseToDeadlines: Project[] | null;
    TasksCloseToDeadline: Task[] | null;
  };
  PM: {
    projects: Project[] | null;
    inProgress: Task[] | null;
    Shared: Task[] | null;
    Review: Task[] | null;
    TasksCloseToDeadline: Task[] | null;
    projectsCloseToDeadlines: Project[] | null;
  };
}

const StatisticsState: StatisticsInterface = {
  loading: true,
  OM: {
    Taskboard: null,
    inProgress: null,
    Review: null,
    Shared: null,
    projectsCloseToDeadlines: null,
    TasksCloseToDeadline: null,
  },
  PM: {
    projects: null,
    inProgress: null,
    Shared: null,
    Review: null,
    TasksCloseToDeadline: null,
    projectsCloseToDeadlines: null,
  },
};
export default StatisticsState;
