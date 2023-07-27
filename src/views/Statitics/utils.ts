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

export const getMeetingDeadline = (journies: Journey[]) => {
  let passedDeadline = journies.filter((i) => {
    let lastMovement = i.movements[i.movements.length - 1];
    let movedAt = new Date(lastMovement.movedAt);
    let journeyDeadline = lastMovement.journeyDeadline
      ? new Date(lastMovement.journeyDeadline)
      : movedAt;
    if (!lastMovement.journeyDeadline) return i;
    let difference = getDifBetweenDates(movedAt, journeyDeadline);
    if (difference.isLate && difference.totalHours > 24) return i;
  });

  let notPassedDeadline = journies.filter((i) => {
    let lastMovement = i.movements[i.movements.length - 1];
    let movedAt = new Date(lastMovement.movedAt);
    let journeyDeadline = lastMovement.journeyDeadline;
    if (journeyDeadline) {
      let difference = getDifBetweenDates(movedAt, new Date(journeyDeadline));
      if (
        difference.isLate === false ||
        (difference.isLate && difference.totalHours <= 24)
      )
        return i;
    }
  });
  return { passedDeadline, notPassedDeadline };
};
