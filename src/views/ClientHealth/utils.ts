import {
  convertToCSV,
  getCancelationType,
  getTaskJournies,
  getTaskLeadTime,
  getTotalDifferenceFromTo,
  isMissedDelivery,
  totalUnClearTime,
} from "src/helpers/generalUtils";
import { Order, stateType } from "src/types/views/ClientHealth";
import { getJourneyLeadTime, getMeetingDeadline } from "../Statitics/utils";
import _ from "lodash";
import { Project, Task } from "src/types/models/Projects";
import { Client } from "src/models/Clients";
import { Category, SubCategory } from "src/models/Categories";
import { ITaskInfo, TaskJourniesDetails } from "src/types/views/Statistics";
import { Manager } from "src/models/Managers";
import { format } from "date-fns";

export const setJournies = (State: stateType) => {
  let tasksJournies = State.tasks.map((item) => getTaskJournies(item));
  tasksJournies = tasksJournies.map((item) => {
    item.journies = item.journies.map((journey) => {
      let leadTimeInHours = getJourneyLeadTime(journey);
      journey.leadTime = leadTimeInHours;
      return journey;
    });
    return item;
  });

  // flattening the journies in one array, for getting journeyLeadTime, _OfActive, hasDeadline,and journies length values.
  let flattened = _.flattenDeep(tasksJournies.map((i) => i.journies));
  State.organization._OfActive = flattened.filter(
    (i) =>
      !["Shared", "Done", "Cancled"].includes(
        i.movements[i.movements.length - 1].status
      )
  ).length;
  let revisedTasks = tasksJournies.filter((i) => i.journies.length > 1);
  let journiesLeadTime = flattened.map((j) => {
    return j.leadTime;
  });
  let sortedByCreatedAtTasks = _.orderBy(State.tasks, "cardCreatedAt", "asc");

  State.organization._OfRevision =
    _.flattenDeep(revisedTasks.map((i) => i.journies)).length -
    revisedTasks.length;
  State.organization._OfTasks = State.tasks.length;
  State.organization._ofProjects = State.projects.length;
  State.organization.averageTOD = _.sum(journiesLeadTime);
  State.organization.lastBrief = new Date(
    sortedByCreatedAtTasks[sortedByCreatedAtTasks.length - 1]?.cardCreatedAt
  ).getTime();
  let hasDeadline = flattened.filter((i) => i.journeyDeadline !== null);
  let meetDeadline = getMeetingDeadline(hasDeadline).notPassedDeadline.length;
  State.organization.journies = flattened.length;
  State.organization.meetDeadline = Math.floor(
    (meetDeadline / hasDeadline.length) * 100
  );
  return State;
};
export const setFilter = (
  State: stateType,
  allTasks: Task[],
  projects: Project[],
  boards: string[],
  date: Date,
  clients: Client[],
  subCategories: SubCategory[]
) => {
  // Filtering using the start and end date
  if (State.filter.startDate && State.filter.endDate) {
    State.projects = projects.filter(
      (t) =>
        State.filter.startDate &&
        State.filter.endDate &&
        new Date(t.startDate).getTime() >=
          new Date(State.filter.startDate).getTime() - 86400000 &&
        new Date(t.startDate).getTime() <=
          new Date(State.filter.endDate).getTime() + 86400000
    );
    // Filtering the tasks
    State.tasks = State.allTasks.filter((i) => {
      if (
        i.cardCreatedAt &&
        State.filter.startDate &&
        State.filter.endDate &&
        new Date(i.cardCreatedAt).getTime() >=
          new Date(State.filter.startDate).getTime() - 86400000 &&
        new Date(i.cardCreatedAt).getTime() <=
          new Date(State.filter.endDate).getTime() + 86400000
      )
        return i;
    });
  }

  let allSubCategoriesIds = subCategories.map((i) => i._id);
  if (State.filter.categories) {
    let catsIds = State.filter.categories.map((i) => i.id);
    State.tasks = State.tasks.filter(
      (item) => catsIds.includes(item.categoryId) || !item.categoryId
    );
  }

  if (State.filter.subCategories && State.filter.subCategories.length > 0) {
    let subsIds = State.filter.subCategories.map((i) => i.id);
    State.tasks = State.tasks.filter((item) => {
      if (item.subCategoryId && subsIds.includes(item.subCategoryId))
        return item;
      if (!allSubCategoriesIds.includes(item.subCategoryId)) return item;
    });
  }

  let tasksIds = State.tasks.map((i) => i._id);
  let journies = State.allJournies.filter((i) => tasksIds.includes(i.id));
  State.journies = journies;
  State.cells = _.orderBy(
    clients.map((client) => {
      let notFilteredClientTasks = _.orderBy(
        State.tasks.filter((t: ITaskInfo) => t.clientId === client._id),
        "createdAt",
        "asc"
      );
      let clientProjects = State.projects.filter(
        (i) => i.clientId === client._id
      );
      let clientTasks = State.tasks.filter(
        (task) => task.clientId === client._id
      );
      let clientJourniesPerTask = clientTasks.map((i) => getTaskJournies(i));
      let clientJournies = _.flattenDeep(
        clientJourniesPerTask.map((i) => i.journies)
      );
      clientJournies = clientJournies.map((j) => {
        return {
          ...j,
          leadTime: getJourneyLeadTime(j),
        };
      });
      let averageLeadTime = _.sum(clientJournies.map((i) => i.leadTime));
      let hasDeadline = clientJournies.filter(
        (i) => i.journeyDeadline !== null
      );
      let meetingDeadline = Math.floor(
        (getMeetingDeadline(hasDeadline).notPassedDeadline.length /
          hasDeadline.length) *
          100
      );
      let revisionJournies = clientJourniesPerTask.filter(
        (j) => j.journies.length > 1
      );
      let length = revisionJournies.length;
      let flattenedRevisionJournies =
        _.flattenDeep(revisionJournies.map((i) => i.journies)).length - length;
      let lastBrief = new Date(
        notFilteredClientTasks[notFilteredClientTasks.length - 1]
          ?.cardCreatedAt ??
          notFilteredClientTasks[notFilteredClientTasks.length - 1]?.createdAt
      ).getTime();
      lastBrief = _.isNaN(lastBrief) ? 0 : lastBrief;
      let _OfActive = clientJournies.filter(
        (i) =>
          !["Done", "Cancled", "Shared"].includes(
            i.movements[i.movements.length - 1].status
          )
      ).length;
      return {
        clientName: client.clientName,
        meetDeadline: !_.isNaN(meetingDeadline) ? meetingDeadline : 0,
        _OfRevision: flattenedRevisionJournies,
        lastBrief: lastBrief,
        averageTOD: averageLeadTime ?? 0,
        _OfTasks: clientTasks.length,
        _ofProjects: clientProjects.length,
        clientId: client._id,
        _OfActive,
        journies: clientJournies.length,
      };
    }),
    State.orderBy,
    "desc"
  ).filter((i) => i._ofProjects > 0 || i._OfTasks > 0);
  State.order = Order.desc;
  State.loading = false;
  return State;
};

export const getCsvData = (tasks: ITaskInfo[]) => {
  let tasksJourniesDetails = _.flattenDeep(
    tasks.map((task) => {
      if (task) {
        let journies = getTaskJournies(task).journies;
        let taskJourniesDetails = journies.map((journey, index) => {
          let leadTime = getTaskLeadTime(journey.movements);
          let schedulingTime = getTotalDifferenceFromTo(
            "Tasks Board",
            "In Progress",
            journey.movements
          );
          let processingTime = getTotalDifferenceFromTo(
            "In Progress",
            "Shared",
            journey.movements
          );
          let unClear = totalUnClearTime(journey.movements);
          let turnAround = getTotalDifferenceFromTo(
            "Not Clear",
            "In Progress",
            journey.movements
          );
          let fulfillment = getTotalDifferenceFromTo(
            "In Progress",
            "Review",
            journey.movements
          );
          let delivery = getTotalDifferenceFromTo(
            "Review",
            "Shared",
            journey.movements
          );
          let closing = getTotalDifferenceFromTo(
            "Shared",
            "Done",
            journey.movements
          );
          let clearBack = getTotalDifferenceFromTo(
            "Not Clear",
            "Tasks Board",
            journey.movements
          );
          let cancelMoves = getCancelationType(journey.movements);
          let missedDelivery = isMissedDelivery(journey.movements);
          let wrongOrMissingFulfillment = getTotalDifferenceFromTo(
            "Review",
            "Tasks Board",
            journey.movements
          );
          let commentsTime = getTotalDifferenceFromTo(
            "Shared",
            "Tasks Board",
            journey.movements
          );
          let revisitingTime = getTotalDifferenceFromTo(
            "Done",
            "Tasks Board",
            journey.movements
          );
          let revivedTime = getTotalDifferenceFromTo(
            "Cancled",
            "Tasks Board",
            journey.movements
          );

          let journeyDetails: TaskJourniesDetails = {
            id: task._id,
            name: task.name,
            journeyIndex: index + 1,
            projectName: task?.projectName ?? "",
            clientName: task?.clientName ?? "",
            categoryName: task?.categoryName ?? "",
            subCategoryName: task?.subCategoryName ?? "",
            status: task.status ?? "",
            projectManager: task?.projectMangerName ?? "",
            startDate: task.start
              ? format(new Date(task.start), "dd MMMM yyyy HH:MM")
              : "",
            dueDate: journey.journeyDeadline
              ? format(new Date(journey.journeyDeadline), "dd MMMM yyyy HH:MM")
              : "",
            deliveryStatus: missedDelivery ? "Missed" : "On Time",
            movementsCount: journey.movements.length,
            journeyLeadTime: `${leadTime.difference.days}D / ${leadTime.difference.hours}H / ${leadTime.difference.mins}M`,
            journeyProcessingTime: `${processingTime.dif.difference.days}D / ${processingTime.dif.difference.hours}H / ${processingTime.dif.difference.mins}M`,
            journeySchedulingTime: `${schedulingTime.dif.difference.days}D / ${schedulingTime.dif.difference.hours}H / ${schedulingTime.dif.difference.mins}M`,
            journeyUnClearTime: `${unClear.difference.days}D / ${unClear.difference.hours}H / ${unClear.difference.hours}H / ${unClear.difference.mins}`,
            journeyUnClearCounts: unClear.times,
            journeyTurnAroundTime: `${turnAround.dif.difference.days}D / ${turnAround.dif.difference.hours}H /  ${turnAround.dif.difference.mins}M`,
            journeyFullfilmentTime: `${fulfillment.dif.difference.days}D / ${fulfillment.dif.difference.hours} / ${fulfillment.dif.difference.mins}M`,
            journeyDeliveryTime: `${delivery.dif.difference.days}D / ${delivery.dif.difference.hours}H / ${delivery.dif.difference.mins}M`,
            journeyClosingTime: `${closing.dif.difference.days}D / ${closing.dif.difference.hours}H /  ${closing.dif.difference.mins}M`,
            journeyCanceled: cancelMoves.includes("Canceled"),
            journeyDisturbed: cancelMoves.includes("Disturbed"),
            journeyFlagged: cancelMoves.includes("Flagged"),
            journeyLateScheduling:
              schedulingTime.dif.difference.days > 0 ? true : false,
            missedDelivery: missedDelivery,
            journeyVerified: unClear.times === 0 && turnAround.times === 0,
            journeyUnHealthy: unClear.times > 0 && turnAround.times > 0,
            journeyClearBackTime: `${clearBack.dif.difference.days}D / ${clearBack.dif.difference.hours}H  / ${clearBack.dif.difference.mins}M`,
            wrongOrMissingFulfillmentTime: `${wrongOrMissingFulfillment.dif.difference.days}D  / ${wrongOrMissingFulfillment.dif.difference.hours}H / ${wrongOrMissingFulfillment.dif.difference.mins}M`,
            commentsOrChangesTime: `${commentsTime.dif.difference.days}D / ${commentsTime.dif.difference.hours}H  / ${commentsTime.dif.difference.mins}M`,
            revisitingTime: `${revisitingTime.dif.difference.days}D / ${revisitingTime.dif.difference.hours}H  / ${revisitingTime.dif.difference.mins}M`,
            revivedTime: `${revivedTime.dif.difference.days}D / ${revivedTime.dif.difference.hours}H / ${revivedTime.dif.difference.mins}M`,
            wrongOrMissingFulfillmentTimes:
              wrongOrMissingFulfillment.times.toString(),
            commentsOrChangesTimes: commentsTime.times.toString(),
            revisitingTimes: revisitingTime.times.toString(),
            revivedTimes: revivedTime.times.toString(),
          };
          return journeyDetails;
        });
        return taskJourniesDetails;
      } else return [];
    })
  );
  return tasksJourniesDetails;
};

export const onDownloadTasksFile = (
  tasks: ITaskInfo[],
  formRef: React.RefObject<HTMLFormElement>
) => {
  let tasksJourniesDetails = getCsvData(tasks);
  if (
    tasksJourniesDetails &&
    tasksJourniesDetails.length > 0 &&
    formRef.current
  ) {
    let data = convertToCSV([...tasksJourniesDetails]);
    let dataBlob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.style.display = "none";
    link.download = "Tasks Master Report";
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }
};
