import {
  convertToCSV,
  daysAndHours,
  getCancelationType,
  getTotalDifferenceFromTo,
  isMissedDelivery,
  totalUnClearTime,
} from "src/helpers/generalUtils";
import { stateType } from "src/types/views/ClientHealth";
import { getMeetingDeadline } from "../Statitics/utils";
import _ from "lodash";
import { Client } from "src/models/Clients";
import { SubCategory } from "src/models/Categories";
import {
  ITaskInfo,
  Journey,
  Journies,
  TaskJourniesDetails,
} from "src/types/views/Statistics";
import { format } from "date-fns";
import { Project } from "src/types/models/Projects";
import categories from "src/services/endpoints/categories";

export const setTableOrganizationRow = (State: stateType) => {
  let journies = State.journies;
  State.organization._OfActive = journies.filter(
    (i) =>
      !["Shared", "Done", "Cancled"].includes(
        i.movements[i.movements.length - 1].status
      )
  ).length;
  let revisionJournies = journies.filter(
    (i) => i.revision === true && i.index > 0
  );
  let journiesLeadTime = journies.map((j) => {
    return j.leadTime;
  });
  let sortedByCreatedAtTasks = _.orderBy(State.tasks, "cardCreatedAt", "asc");
  State.organization._OfRevision = revisionJournies.length;
  State.organization._OfTasks = State.tasks.length;
  State.organization._ofProjects = State.projects.length;
  State.organization.averageTOD = _.sum(journiesLeadTime);
  State.organization.lastBrief = new Date(
    sortedByCreatedAtTasks[sortedByCreatedAtTasks.length - 1]?.cardCreatedAt
  ).getTime();
  let hasDeadline = journies.filter((i) => i.journeyDeadline !== null);
  let meetDeadline = getMeetingDeadline(hasDeadline).notPassedDeadline.length;
  State.organization.journies = journies.length;
  State.organization.meetDeadline = Math.floor(
    (meetDeadline / hasDeadline.length) * 100
  );
  return State;
};

export const updateState = (
  State: stateType,
  clients: Client[],
  subCategories: SubCategory[],
  orderBy: string
) => {
  State.tasks = State.allTasks;

  State.journies = State.allJournies.filter((i) => i.projectManager);
  State.projects = State.allProjects;
  // Filtering using the start and end date
  if (State.filter.startDate && State.filter.endDate) {
    let start = new Date(State.filter.startDate).getTime();
    let end = new Date(State.filter.endDate).getTime() + 86400000;
    State.journies = State.journies.filter((i) => {
      if (
        i.movements &&
        i.movements[0].movedAt &&
        State.filter.startDate &&
        State.filter.endDate &&
        ((new Date(i.startedAt).getTime() >= start &&
          new Date(i.startedAt).getTime() <= end) ||
          (i.journeyFinishedAtDate &&
            new Date(i.journeyFinishedAtDate).getTime() >= start &&
            new Date(i.journeyFinishedAtDate).getTime() <= end) ||
          (!i.journeyFinishedAtDate && new Date(i.startedAt).getTime() <= end))
      )
        return i;
    });
  }
  if (State.filter.categories.length > 0) {
    let catsIds = State.filter.categories.map((i) => i.id);
    State.journies = State.journies.filter(
      (item) => catsIds.includes(item.categoryId) || !item.categoryId
    );
  } else
    State.journies = State.journies.filter(
      (i) => i.categoryId === null || !i.categoryId
    );

  let allSubCategoriesIds = subCategories.map((i) => i._id);
  if (State.filter.subCategories.length > 0) {
    let subsIds = State.filter.subCategories.map((i) => i.id);
    State.journies = State.journies.filter((item) => {
      if (item.subCategoryId && subsIds.includes(item.subCategoryId))
        return item;
      if (!allSubCategoriesIds.includes(item.subCategoryId)) return item;
    });
  } else
    State.journies = State.journies.filter(
      (i) =>
        !i.subCategoryId ||
        i.subCategoryId === null ||
        !allSubCategoriesIds.includes(i.subCategoryId)
    );

  let ids = _.uniq(State.journies.map((i) => i.taskId));
  let clientsIds = _.uniq(State.journies.map((i) => i.clientId));
  let projectsIds = _.uniq(State.journies.map((i) => i.projectId));
  State.projects = State.allProjects.filter((i) => projectsIds.includes(i._id));
  State.tasks = State.tasks.filter((i) => ids.includes(i._id));
  State.clients = clients.filter((i) => clientsIds.includes(i._id));
  State = onSetCells(State, clients, orderBy);
  State = setTableOrganizationRow(State);
  State.loading = false;
  return State;
};

const onSetCells = (State: stateType, clients: Client[], orderBy: string) => {
  State.cells = _.orderBy(
    clients.map((client) => {
      let notFilteredClientTasks = _.orderBy(
        State.tasks.filter((t) => t.clientId === client._id),
        "createdAt",
        "asc"
      );
      let clientProjects = State.projects.filter(
        (i) => i.clientId === client._id
      );
      let clientJournies = State.journies.filter(
        (i) => i.clientId === client._id
      );
      let averageLeadTime =
        _.sum(clientJournies.map((i) => i.leadTime)) / clientJournies.length;

      let estimatedJournies = clientJournies.filter(
        (i) => i.journeyDeadline !== null
      );
      let { notPassedDeadline } = getMeetingDeadline(estimatedJournies);
      let meetingDeadline = Math.floor(
        (notPassedDeadline.length / estimatedJournies.length) * 100
      );

      let revisionJournies = clientJournies.filter((j) => j.revision === true);
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
        _OfRevision: revisionJournies.length,
        lastBrief: lastBrief,
        averageTOD: averageLeadTime ?? 0,
        _OfTasks: notFilteredClientTasks.length,
        _ofProjects: clientProjects.length,
        clientId: client._id,
        _OfActive,
        journies: clientJournies.length,
      };
    }),
    orderBy,
    "desc"
  ).filter((i) => i._ofProjects > 0 || i._OfTasks > 0);
  State.loading = false;

  return State;
};
/**
 * Getting the projects data that should be inserted to the report.
 *
 * 1. the client health page filter and the global filter of the statistics will filter journeys and projects
 * 2. Filtering the projects will be based on the result of the filtration of the journies, so if we have 100 journeys then
 * The projects that these journies will be the only ones that should be inserted into the report.
 * @param journies Project Journies
 * @param projects all Projects needs to be existed in the report
 * @returns Array of data of the report
 */
export const getProjectsData = (journies: Journies, projects: Project[]) => {
  const data = _.flattenDeep(
    projects.map((i) => {
      let projectJournies = journies.filter((j) => j.projectId === i._id);
      let categories = _.uniqBy(
        projectJournies.map((i) => {
          return { categoryId: i.categoryId, categoryName: i.categoryName };
        }),
        "categoryId"
      );
      let projectTasks = _.uniqBy(projectJournies, "taskId");
      const projectData = {
        projectId: i._id,
        projectName: `"${i.name}"`,
        clientName: `"${projectJournies[0]?.clientName}"` ?? "",
        startingDate: i.startDate
          ? format(new Date(i.startDate), "dd MMMM yyyy HH:MM")
          : "",
        endingDate: i.projectDeadline
          ? format(new Date(i.projectDeadline), "dd MMMM yyyy HH:MM")
          : "",
        status: i.projectStatus ?? "",
        ownerCs: i.projectManagerName ?? "",
      };
      return categories.map((category) => {
        let categoryTasks = projectTasks.filter(
          (i) => i.categoryId === category.categoryId
        );
        let categoryJournies = projectJournies.filter(
          (i) => i.categoryId === category.categoryId
        );
        return {
          ...projectData,
          categoryName: category.categoryName ?? "",
          totalNumberOfTasks: categoryTasks.length.toString() ?? "",
          totalNumberOfJournies: categoryJournies?.length?.toString() ?? "",
          unique:
            projectJournies
              .filter(
                (i) => i.unique === true && i.categoryId === category.categoryId
              )
              .length.toString() ?? "",
          revised:
            projectJournies
              .filter(
                (i) =>
                  i.revision === true && i.categoryId === category.categoryId
              )
              .length.toString() ?? "",
        };
      });
    })
  );
  return data;
};

export const getJourniesData = (journies: Journies) => {
  let taskJourniesDetails = journies.map((journey, index) => {
    let leadTime = journey.leadTime;
    let { hours, days } = daysAndHours(leadTime ?? 0);
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
    let closing = getTotalDifferenceFromTo("Shared", "Done", journey.movements);
    let clearBack = getTotalDifferenceFromTo(
      "Not Clear",
      "Tasks Board",
      journey.movements
    );
    // TODO
    let cancelMoves = getCancelationType(journey.movements);
    let missedDelivery = isMissedDelivery(journey);
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
      taskId: journey.taskId,
      name: `"${journey.name}"` ?? "",
      projectId: journey.projectId ?? "",
      projectName: `"${journey?.projectName}"` ?? "",
      clientName: `"${journey?.clientName}"` ?? "",
      teamName: `"${journey.teamName}"` ?? "",
      projectManager: `"${journey?.projectManagerName}"` ?? "",
      taskJourniesCount: journies
        .filter((i) => i.taskId === journey.taskId)
        .length.toString(),
      journeyIndex: journey.index + 1,
      movementsCount: journey.movements.length,
      status: journey.movements[journey.movements.length - 1].status ?? "",
      categoryName: journey?.categoryName ?? "",
      subCategoryName: journey?.subCategoryName ?? "",
      startDate: journey.startedAt // journey start date
        ? format(new Date(journey.startedAt), "dd MMMM yyyy HH:MM")
        : "",
      dueDate: journey.journeyDeadline
        ? format(new Date(journey.journeyDeadline), "dd MMMM yyyy HH:MM")
        : "",
      journeyFinishedAt: journey.journeyFinishedAtDate
        ? format(journey.journeyFinishedAtDate, "dd MMMM yyyy HH:MM")
        : "",
      deliveryStatus: missedDelivery ? "Missed" : "On Time",
      journeyLeadTime: `${days}D / ${hours}H`,
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
};
export const getClientsData = (
  journies: Journey[],
  clients: Client[],
  projects: Project[],
  tasks: ITaskInfo[]
) => {
  const data = _.flattenDeep(
    clients.map((client) => {
      const clientJournies = _.sortBy(
        journies.filter((i) => i.clientId === client._id),
        "startedAt"
      );
      const clientTasks = tasks.filter((i) => i.clientId === client._id);
      let cleintCategories = _.uniqBy(
        clientJournies.map((i) => {
          return { categoryId: i.categoryId, categoryName: i.categoryName };
        }),
        "categoryId"
      );
      const clientProjects = projects.filter((i) => i.clientId === client._id);
      const averageLeadTime = daysAndHours(
        _.sum(clientJournies.map((j) => j.leadTime)) / clientJournies.length
      );
      let _OfActive = clientJournies.filter(
        (i) =>
          !["Done", "Cancled", "Shared"].includes(
            i.movements[i.movements.length - 1].status
          )
      ).length;
      let estimatedJournies = clientJournies.filter(
        (i) => i.journeyDeadline !== null
      );
      let { notPassedDeadline } = getMeetingDeadline(estimatedJournies);
      let meetingDeadline = Math.floor(
        (notPassedDeadline.length / estimatedJournies.length) * 100
      );

      const clientData = {
        clientName: `${client.clientName}`,
        lastBrief: clientTasks[clientTasks.length - 1]?.cardCreatedAt
          ? format(
              new Date(clientTasks[clientTasks.length - 1]?.cardCreatedAt),
              "dd MMMM yyyy HH:MM"
            )
          : "",
        numberOfProjects: clientProjects.length.toString() ?? "",
        numberOfTasks: clientTasks.length.toString() ?? "",
        numberOfJournies: clientJournies.length.toString() ?? "",
        numberOfRevision:
          clientJournies.filter((i) => i.revision === true).length.toString() ??
          "",
        averageTOD: `${averageLeadTime.days ?? 0} D / ${
          averageLeadTime.hours ?? 0
        } H`,
        numberOfActive: _OfActive ?? 0,
        meetDeadline: `${meetingDeadline} %`,
      };
      return cleintCategories.map((category) => {
        return {
          ...clientData,
          categoryName: `"${category.categoryName}"`,
          totalNumberOfJourniesPerCategory:
            clientJournies
              .filter((i) => i.categoryId === category.categoryId)
              .length.toString() ?? "",
          numberOfRevisionPerCategory:
            clientJournies
              .filter(
                (j) =>
                  j.categoryId === category.categoryId && j.revision === true
              )
              .length.toString() ?? "",
          numberOfUniquePerCategory:
            clientJournies
              .filter(
                (j) => j.categoryId === category.categoryId && j.unique === true
              )
              .length.toString() ?? "",
        };
      });
    })
  );
  return data;
};

export const onDownloadTasksFile = (
  journies: Journies,
  projects: Project[],
  clients: Client[],
  tasks: ITaskInfo[],
  formRef: React.RefObject<HTMLFormElement>
) => {
  let perJourniesData = getJourniesData(journies);
  let perProjectsData = getProjectsData(journies, projects);
  let perClientsData = getClientsData(journies, clients, projects, tasks);
  if (perJourniesData && perJourniesData.length > 0 && formRef.current) {
    let data = convertToCSV([...perJourniesData]);
    let dataBlob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.style.display = "none";
    link.download = "Client Health Report (Per Journies)";
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }
  if (perProjectsData && perProjectsData.length > 0 && formRef.current) {
    let data = convertToCSV([...perProjectsData]);
    let dataBlob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.style.display = "none";
    link.download = "Client Health Report (Per Projects)";
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }
  if (perClientsData && perClientsData.length > 0 && formRef.current) {
    let data = convertToCSV([...perClientsData]);
    let dataBlob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.style.display = "none";
    link.download = "Client Health Report (Per Clients)";
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }
};
