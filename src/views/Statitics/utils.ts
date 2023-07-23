import _ from "lodash";
import { getDifBetweenDates, getTaskJournies } from "src/helpers/generalUtils";
import { Task, TaskMovement } from "src/types/models/Projects";
import { Journey } from "src/types/views/Statistics";

export const getJourneyLeadTime = (journey: Journey) => {
  let journeyLeadTime = 0;
  let sharedIndex = journey.movements.findIndex((i) => i.status === "Shared");
  let start = journey.movements[0].movedAt;
  let end = sharedIndex >= 0 ? journey.movements[sharedIndex].movedAt : null;
  if (end && start) {
    let diff = getDifBetweenDates(new Date(start), new Date(end));
    journeyLeadTime = diff.totalHours;
  } else return 0;
  return journeyLeadTime;
};

export const get_TLT = (tasks: Journey) => {};
