import Joi from "joi";
import { ToastWarning } from "../../coreUI/usable-component/Typos/Alert";
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
  projectManagerName: Joi.string().required().min(2).max(50).messages({
    "string.base": "Project Manager Name  should be string",
    "string.empty": "Project Manager Name  is required",
    "string.min": "Project Manager Name length should be Min 2 chars",
    "string.required": "Project Manager is required",
  }),
  projectDeadline: Joi.date()
    .optional()
    .label("project deadline")
    .allow(null, "")
    .messages({
      "any.required": "Project Deadline is required",
    }),
  startDate: Joi.date()
    .label("start date")
    .optional()
    .allow(null, "")
    .messages({
      "any.required": "Project Start Date is required",
    }),
  clientId: Joi.string().required().min(2).max(50).messages({
    "any.required": "Client is required",
    "string.base": "Client should be string",
    "string.empty": "Client is required",
    "string.min": "Client length should be Min 2 chars",
  }),
  numberOfFinishedTasks: Joi.number().optional().allow(null, 0),
  numberOfTasks: Joi.number().optional().allow(null, 0),
  projectStatus: Joi.string()
    .optional()
    .allow("", null)
    .valid("inProgress", "Not Started"),
  completedDate: Joi.date().optional().allow(null),
  adminId: Joi.string().messages({
    "any.required": "Admin id is required for creating a project",
  }),
});
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
export { validateCreateProject };
