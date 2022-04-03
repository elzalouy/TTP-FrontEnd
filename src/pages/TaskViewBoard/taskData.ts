import { v4 as uuidv4 } from "uuid";
import IMAGES from "../../assets/img/index";
export const InProgressTasks = [];
export const taskDataDone = [
  {
    id: uuidv4(),
    taskName: "Task Name",
    projectManager: "Project manager name",
    time: "2 days left",
    ttpTeam: "TTP project Team",
    team: " Al-shaqran team",
    header: "task-card-header-done",
    timeline: "task-card-timeline-done",
    footer: "task-card-footer-done",
    scheduleIcon: IMAGES.scheduleOrange,
  },
  {
    id: uuidv4(),
    taskName: "Task Name",
    projectManager: "Project manager name",
    time: "2 days left",
    ttpTeam: "TTP project Team",
    team: " Al-shaqran team",
    header: "task-card-header-done",
    timeline: "task-card-timeline-done",
    footer: "task-card-footer-done",
    scheduleIcon: IMAGES.scheduleOrange,
    picUrl: IMAGES.picTask,
  },
  {
    id: uuidv4(),
    taskName: "Task Name",
    projectManager: "Project manager name",
    time: "After 2 day",
    ttpTeam: "TTP project Team",
    team: " Al-shaqran team",
    header: "task-card-header-done",
    timeline: "task-card-timeline-done",
    footer: "task-card-footer-done",
    scheduleIcon: IMAGES.scheduleOrange,
  },
];
export const taskDataNotClear = [
  {
    id: uuidv4(),
    taskName: "Task Name",
    projectManager: "Project manager name",
    time: "14 days left",
    ttpTeam: "TTP project Team",
    team: " Al-shaqran team",
    header: "task-card-header-not-clear",
    timeline: "task-card-timeline-not-clear",
    footer: "task-card-footer-not-clear",
    scheduleIcon: IMAGES.scheduleNotClear,
  },
];
export const taskDataCanceled = [
  {
    id: uuidv4(),
    taskName: "Task Name",
    projectManager: "Project manager name",
    time: "Canceled",
    ttpTeam: "TTP project Team",
    team: " Al-shaqran team",
    header: "task-card-header-canceled",
    timeline: "task-card-timeline-canceled",
    footer: "task-card-footer-canceled",
    scheduleIcon: IMAGES.scheduleNotClear,
  },
  {
    id: uuidv4(),
    taskName: "Task Name",
    projectManager: "Project manager name",
    time: "Canceled",
    ttpTeam: "TTP project Team",
    team: " Al-shaqran team",
    header: "task-card-header-canceled",
    timeline: "task-card-timeline-canceled",
    footer: "task-card-footer-canceled",
    scheduleIcon: IMAGES.scheduleNotClear,
  },
];
export interface Itask {
  id: number;
  taskName: string;
  projectManager: string;
  time: string;
  ttpTeam: string;
  team: string;
}
