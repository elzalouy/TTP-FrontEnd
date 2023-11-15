import Joi from "joi";
import { Project } from "../models/Projects";

export interface IProjectFormProps {
  setcurrentStep: any;
  setShow: any;
  currentStep: any;
  backTrigger: any;
  setBackTrigger: any;
  //Here any is the type because behavior is not clear to me : TODO
}

export interface IJoiValidation {
  error: Joi.ValidationError | undefined;
  value: any;
  warning: Joi.ValidationError | undefined;
}

export type Options = {
  id: string;
  text: string;
  value: string;
  image?: string;
}[];

export type ProjectsPageState = {
  inProgressProjects: Project[];
  doneProjects: Project[];
  filteredProjects: Project[];
  projects: Project[];
  notStarted: Project[];
  inProgressShow: boolean;
  doneShow: boolean;
  notStartedShow: boolean;
};
