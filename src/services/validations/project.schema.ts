import Joi from "joi";
import { ToastWarning } from "../../coreUI/components/Typos/Alert";
import { Task } from "src/types/models/Projects";

const createProjectSchema = Joi.object({
  name: Joi.string().required().min(4).messages({
    "string.base": "Project Name is required",
    "string.empty": "Project name should be string with min 4 chars",
    "string.min": "Project name length should be Min 4 chars",
    "string.max": "Project name length should be Max 20 chars",
    "any.required": "Project Name is required",
  }),
  projectManager: Joi.string().required().min(5).messages({
    "string.base": "Project Manager id is required",
    "string.empty": "Project Manager id should be string",
    "string.min": "Project Manager id length should be Min 4 chars",
    "any.required": "Project Manager is required",
  }),
  associateProjectManager: Joi.string().optional().min(5).allow(null).messages({
    "string.empty": "Project Manager id should be string",
    "string.min": "Project Manager id length should be Min 4 chars",
    "any.required": "Project Manager is required",
  }),
  projectManagerName: Joi.string().required().min(2).max(50).messages({
    "string.base": "Project Manager Name  should be string",
    "string.empty": "Project Manager Name  is required",
    "string.min": "Project Manager Name length should be Min 2 chars",
    "string.required": "Project Manager is required",
  }),
  projectDeadline: Joi.date().allow(null).label("project deadline"),
  clientId: Joi.string().required().min(2).max(50).messages({
    "any.required": "Client is required",
    "string.base": "Client should be string",
    "string.empty": "Client is required",
    "string.min": "Client length should be Min 2 chars",
  }),
  NoOfFinishedTasks: Joi.number().optional().allow(null, 0),
  NoOfTasks: Joi.number().optional().allow(null, 0),
  projectStatus: Joi.string()
    .optional()
    .allow("", null)
    .valid("In Progress", "Not Started"),
  completedDate: Joi.date().optional().allow(null),
  adminId: Joi.string().messages({
    "any.required": "Admin id is required for creating a project",
  }),
});
const validateProjectStatusSchema = (tasks: Task[], startDate: any) => {
  if (tasks.length > 0 && tasks.every((i) => i.status === "Done"))
    return Joi.string()
      .required()
      .valid(
        "delivered after deadline",
        "delivered before deadline",
        "delivered on time"
      )
      .invalid("Not Started", "In Progress")
      .messages({
        "string.base":
          "While all tasks finished, only the available status for this project is to Done",
        "any.only":
          "While all tasks finished, so you only can change the status to Done",
      });
  else if (startDate)
    return Joi.string()
      .required()
      .valid("In Progress", "Not Started")
      .invalid(
        "delivered after deadline",
        "delivered before deadline",
        "delivered on time"
      )
      .messages({
        "string.base":
          "While all tasks finished, only the available status for this project is to Done",
        "any.only":
          "While not all tasks had finished, you shouldn't move the project to done",
      });
  else
    return Joi.string()
      .required()
      .valid("Not Started")
      .invalid(
        "In Progress",
        "delivered after deadline",
        "delivered before deadline",
        "delivered on time"
      )
      .messages({
        "string.base": "Starting the project needs to set a task first.",
        "any.only": "Starting the project needs to set a task first.",
      });
};
const editProjectSchema = (tasks: Task[], startDate: any) =>
  Joi.object({
    _id: Joi.string().required().label("project id"),
    name: Joi.string().required().min(4).messages({
      "string.base": "Project Name is required",
      "string.empty": "Project name should be string with min 4 chars",
      "string.min": "Project name length should be Min 4 chars",
      "string.max": "Project name length should be Max 20 chars",
      "any.required": "Project Name is required",
    }),
    projectManager: Joi.string().required().min(5).messages({
      "string.base": "Project Manager id is required",
      "string.empty": "Project Manager id should be string",
      "string.min": "Project Manager id length should be Min 4 chars",
      "any.required": "Project Manager is required",
    }),
    associateProjectManager: Joi.string().optional().allow(null, "").messages({
      "string.empty": "Associate Project Manager should be string",
      "string.min": "Associate Project Manager length should be Min 4 chars",
      "any.required": "Associate Project Manager is required",
    }),
    projectManagerName: Joi.string().required().min(2).max(50).messages({
      "string.base": "Project Manager Name  should be string",
      "string.empty": "Project Manager Name  is required",
      "string.min": "Project Manager Name length should be Min 2 chars",
      "string.required": "Project Manager is required",
    }),
    projectDeadline: Joi.date().required().label("project deadline").messages({
      "any.required": "Project Deadline is required",
    }),
    clientId: Joi.string().required().min(2).max(50).messages({
      "any.required": "Client is required",
      "string.base": "Client should be string",
      "string.empty": "Client is required",
      "string.min": "Client length should be Min 2 chars",
    }),
    projectStatus: Joi.string()
      .optional()
      .allow("", null)
      .valid(
        "Not Started",
        "In Progress",
        "late",
        "delivered on time",
        "delivered before deadline",
        "delivered after deadline"
      ),
    startDate: Joi.date().optional().allow(null),
    deliveryDate: Joi.date().label("delivery date").optional().allow(null, ""),
    boardId: Joi.any(),
    listId: Joi.any(),
    cardId: Joi.any(),
  }).concat(
    Joi.object({
      projectStatus: () => validateProjectStatusSchema(tasks, startDate),
    })
  );

export const validateDate = (date: any, msg: any, greater: any) => {
  let dateSchema = Joi.object({
    date: Joi.date().greater(greater).message(msg).optional().allow(null, ""),
  });
  let result = dateSchema.validate({ date: date });
  if (result.error) ToastWarning(result.error.details[0].message);
};

const validateCreateProject = (data: any) => {
  let { error, value, warning } = createProjectSchema.validate(data);
  return { error, value, warning };
};

const validateEditProject = (data: any, tasks: Task[]) => {
  let { error, value, warning } = editProjectSchema(
    tasks,
    data.startDate
  ).validate(data);
  return { error, value, warning };
};

export { validateCreateProject, validateEditProject };
