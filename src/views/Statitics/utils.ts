import { format } from "date-fns";
import _ from "lodash";
import {
  daysAndHours,
  getDifBetweenDates,
} from "src/helpers/generalUtils";
import { DatasetType, Journey } from "src/types/views/Statistics";

/**
 * Get the time this journey is taking from creating this task till it lands in Shared (last shared)
 * @param journey Journey movements
 * @returns journeyLeadTime : number (hours)
 */
export const getJourneyLeadTime = (journey: Journey) => {
  let journeyLeadTime = 0;
  let sharedMovements = journey.movements.filter((i) => i.status === "Shared");
  let lastSharedMovement =
    sharedMovements.length > 0
      ? sharedMovements[sharedMovements.length - 1]
      : null;
  let start = journey.movements[0].movedAt ?? null;
  let end = lastSharedMovement?.movedAt ?? null;
  if (end && start) {
    let diff = getDifBetweenDates(new Date(start), new Date(end));
    journeyLeadTime = diff.totalHours;
  } else return 0;
  return journeyLeadTime;
};

/**
 *
 * @param journey Journey
 * @returns number
 */
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
  let inProgressMove = journey.movements.find(
    (i) => i.status === "In Progress"
  );
  if (inProgressMove) {
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

type dataType = "hours" | "decimal";

export const getCsvFile = (data: DatasetType, type?: dataType) => {
  let bars = _.flattenDeep(
    data.datasets.map((item) => {
      // get the bars by the x axis (Categories)
      return item.datasetData.map((categoryData, index) => {
        let totalHours =
          type === "decimal" ? item.data[index] * 24 : item.data[index];
        let { days, hours } = daysAndHours(totalHours);
        return {
          barName: data.labels[index],
          comparison: categoryData.comparisonName,
          journies: categoryData.journies.length,
          timeOfDelivery: `${days}D - ${hours}H`,
        };
      });
    })
  );
  // every dataset has a label for the comparison and array of values with this label for all x axis ditribution.
  let comparisons = _.flattenDeep(
    // Each dataset has an array of its values and the particibated .
    data.datasets.map((item) => {
      let comparisonValues = _.flattenDeep(
        // every dataset has journies.
        item.datasetData.map((categoryData, index) => {
          let totalHours =
            type === "decimal" ? item.data[index] * 24 : item.data[index];
          let { days, hours } = daysAndHours(totalHours);
          return categoryData.journies.map((journey) => {
            let totalHours = journey.leadTime;
            let { days: journeyDays, hours: journeyHours } = daysAndHours(
              totalHours ?? 0
            );
            return {
              barName: data.labels[index],
              comparison: item.label,
              taskName: journey.name,
              taskId: journey.taskId,
              journeyMovementsCount: journey.movements.length,
              journeyStartedAt: journey.startedAt
                ? format(new Date(journey.startedAt), "dd MMMM yyyy hh:mm")
                : "",
              journeyScheduledAt: journey.scheduledAt
                ? format(new Date(journey.scheduledAt), "dd MMMM yyyy hh:mm")
                : "",
              journeyReviewAt: journey.reviewAt
                ? format(new Date(journey.reviewAt), "dd MMMM yyyy hh:mm")
                : "",
              journeySharedAt: journey.sharedAt
                ? format(new Date(journey.sharedAt), "dd MMMM yyyy hh:mm")
                : "",
              journeyFinishedAt:
                journey.journeyFinishedAtDate && journey.journeyFinishedAtDate
                  ? format(
                      new Date(journey.journeyFinishedAtDate),
                      "dd MMMM yyyy hh:mm"
                    )
                  : "",
              journeyDeadline: journey.journeyDeadline
                ? format(
                    new Date(journey.journeyDeadline),
                    "dd MMMM yyyy hh:mm"
                  )
                : "",

              journeyLeadTime: `${journeyDays}D - ${journeyHours}H`,
              datasetTOD: `${days}D - ${hours}H`,
            };
          });
        })
      );
      return comparisonValues;
    })
  );
  comparisons = _.orderBy(comparisons, "barName");
  bars = _.orderBy(bars, "barName");
  return { comparisons, bars };
};
