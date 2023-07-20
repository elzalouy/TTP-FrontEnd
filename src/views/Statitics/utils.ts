import _ from "lodash";
import { getDifBetweenDates, getTaskJournies } from "src/helpers/generalUtils";
import { Task, TaskMovement } from "src/types/models/Projects";

export const getTaskLeadTime = (journies: TaskMovement[][]) => {
  let journeyLeadTime = journies.map((journey) => {
    let sharedIndex = journey.findIndex((i) => i.status === "Shared");
    let start = journey[0].movedAt;
    let end = sharedIndex >= 0 ? journey[sharedIndex].movedAt : null;
    if (end && start) {
      let diff = getDifBetweenDates(new Date(start), new Date(end));
      return diff.totalHours;
    } else return 0;
  });
  return journeyLeadTime;
};

export const get_TLT_ByComparisonTasks = (tasks: Task[]) => {
  let allTasksJournies = tasks.map((item) => getTaskJournies(item));
  let TltPerTask = allTasksJournies.map((item) => {
    let TaskJourniesTLT = getTaskLeadTime(item.journies);
    return _.sum(TaskJourniesTLT);
  });
  let totalTasksTLTAverage = _.sum(TltPerTask) / tasks.length;
  return totalTasksTLTAverage;
};
