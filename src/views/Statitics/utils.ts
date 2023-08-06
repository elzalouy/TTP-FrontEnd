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
export const getJourneyReviewTime = (journey: Journey) => {
  let journeyReviewTime = 0;
  let reviewIndex = journey.movements.findIndex((i) => i.status === "Review");
  let nextIndex = reviewIndex + 1;
  let start = journey.movements[reviewIndex]?.movedAt;
  let end = journey.movements[nextIndex]?.movedAt;
  if (journey.movements[nextIndex] && reviewIndex && start && end) {
    let diff = getDifBetweenDates(new Date(start), new Date(end));
    journeyReviewTime = diff.totalHours;
    return journeyReviewTime;
  } else return journeyReviewTime;
};

export const getJourneySchedulingTime = (journey: Journey) => {
  let inProgressMove = journey.movements[1];
  if (inProgressMove && inProgressMove.status === "In Progress") {
    let start = journey.movements[0]?.movedAt;
    let end = inProgressMove?.movedAt;
    if (start && end) {
      let diff = getDifBetweenDates(new Date(start), new Date(end));
      return diff.totalHours;
    } else return 0;
  } else return 0;
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
