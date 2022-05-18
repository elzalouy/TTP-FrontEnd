export interface StatisticsInterface {
  loading: boolean;
  NoCompletedProjects: number | undefined;
  PercentCompletedProjects: number | undefined;
  NoCompletedTasks: number | undefined;
  PercentCompletedTasks: number | undefined;
  NoNewTasks: number | undefined;
  PercentNoNewTasks: number | undefined;
  NoCurruntProjects: number | undefined;
  PercentCurrentProjects: number | undefined;
}

const StatisticsState: StatisticsInterface = {
  loading: true,
  NoCompletedProjects: undefined,
  NoCompletedTasks: undefined,
  NoNewTasks: undefined,
  PercentCompletedProjects: undefined,
  PercentCompletedTasks: undefined,
  PercentNoNewTasks: undefined,
  NoCurruntProjects: undefined,
  PercentCurrentProjects: undefined,
};
export default StatisticsState;
