import Joi from "joi";
import { ToastError } from "../../coreUI/usable-component/Typos/Alert";
const createTaskSchema = Joi.object({
  projectId: Joi.string().required().min(4).messages({
    "string.base": "You should create project first",
    "string.empty": "You should create project first",
    "string.min": "You should create project first",
    "any.required": "You should create project first",
  }),
  name: Joi.string().required().min(4).max(50).messages({
    "string.base": "Task Name is required",
    "string.empty": "Task name should be string with min 4 chars",
    "string.min": "Task name length should be Min 4 chars",
    "string.max": "Task name length should be Max 50 chars",
    "any.required": "Task Name is required",
  }),
  categoryId: Joi.string().required().messages({
    "string.base": "Category is required",
    "string.empty": "Category should be selected",
    "any.required": "Category is required",
  }),
  subCategoryId: Joi.string().optional().allow("").messages({
    "string.base": "Sub Category is required",
    "string.empty": "Sub Category should be selected",
    "any.required": "Sub Category is required",
  }),
  listId: Joi.string().min(4).optional().allow("").messages({
    "string.base": "Team is required",
    "string.empty": "Team should be string with min 4 chars",
    "string.min": "Team length should be Min 4 chars",
    "string.max": "Team length should be Max 20 chars",
    "any.required": "Team is required",
  }),
  teamId: Joi.string().optional().allow(null).messages({
    "string.base": "Team is required",
    "string.empty": "Team should be selected",
    "string.min": "Team should be selected",
    "any.required": "Team is required",
  }),
  status: Joi.string().allow("inProgress", "Tasks Board").required().messages({
    "string.base": "Status is required",
    "string.empty": "Status should be string with min 4 chars",
    "string.min": "Status length should be Min 4 chars",
    "string.max": "Status length should be Max 20 chars",
    "any.required": "Status is required",
  }),
  start: Joi.date().required().messages({
    "any.required": "Task start date is required",
  }),
  deadline: Joi.date().optional().allow(null, "").messages({
    "any.required": "Task Deadline is required",
  }),
  boardId: Joi.string().required().min(4).messages({
    "string.base": "Department is required",
    "string.empty": "Department should be string with min 4 chars",
    "string.min": "Department length should be Min 4 chars",
    "string.max": "Department length should be Max 20 chars",
    "any.required": "Department is required",
  }),
  description: Joi.string().optional().allow("", null).messages({
    "string.base": "Description is required",
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  deliveryDate: Joi.any().allow(null),
  done: Joi.any().allow(null),
  turnoverTime: Joi.allow(null),
  attachedFiles: Joi.array().optional().allow(null),
});
export const editTaskSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({ "any.required": "Task id is required" }),
  name: Joi.string().optional().min(4).max(50).messages({
    "string.base": "Task Name is required",
    "string.empty": "Task name should be string with min 4 chars",
    "string.min": "Task name length should be Min 4 chars",
    "string.max": "Task name length should be Max 50 chars",
  }),
  categoryId: Joi.string().optional().messages({
    "string.base": "Category is required",
    "string.empty": "Category should be selected",
  }),
  cardId: Joi.string()
    .required()
    .messages({ "any.required": "Card id is required" }),
  subCategoryId: Joi.string().optional().allow(null, "").messages({
    "string.base": "Sub Category is required",
    "string.empty": "Sub Category should be selected",
  }),
  listId: Joi.string().optional().allow("").messages({
    "string.base": "Department is required",
    "string.empty": "Department should be string with min 4 chars",
    "string.min": "Department length should be Min 4 chars",
    "string.max": "Department length should be Max 20 chars",
  }),
  teamId: Joi.string().optional().allow(null).messages({
    "string.base": "Team is required",
    "string.empty": "Team should be selected",
    "string.min": "Team should be selected",
  }),
  status: Joi.string()
    .valid(
      "Tasks Board",
      "inProgress",
      "Review",
      "Cancled",
      "Done",
      "Late",
      "Shared",
      "Not Clear"
    )
    .optional()
    .messages({
      "string.base": "Status is required",
      "string.empty": "Status should be string with min 4 chars",
      "string.min": "Status length should be Min 4 chars",
      "string.max": "Status length should be Max 20 chars",
    }),
  deadline: Joi.date().optional().allow(null, "").messages({
    "any.required": "Task Deadline is required",
  }),
  boardId: Joi.string().optional().min(4).messages({
    "string.base": "Department is required",
    "string.empty": "Department should be string with min 4 chars",
    "string.min": "Department length should be Min 4 chars",
    "string.max": "Department length should be Max 20 chars",
    "any.required": "Department is required",
  }),
  attachedFiles: Joi.array().optional().allow(null),
  deleteFiles: Joi.array().optional().allow(null),
  description: Joi.string().optional().allow(""),
});
export const validateEditTask = (data: any) => {
  let { error, value, warning } = editTaskSchema.validate(data);
  if (error) {
    ToastError(error.message);
    return { error, value, warning };
  } else {
    let task = new FormData();
    if (data.attachedFiles) {
      let result = validateTaskFilesSchema(data.attachedFiles);
      if (result.error) {
        ToastError(result.error);
        return { FileError: "Files must not exceed 10 Migabyte" };
      }
      let newfiles: Array<any> = Array.from(data.attachedFiles);
      for (let i = 0; i < newfiles.length; i++) {
        task.append("attachedFiles", newfiles[i]);
      }
    }
    task.append("deleteFiles", JSON.stringify(data.deleteFiles));

    if (data.teamId !== null) task.append("teamId", data.teamId);
    task.append("id", data.id);
    task.append("name", data.name);
    task.append("categoryId", data.categoryId);
    task.append("subCategoryId", data.subCategoryId);
    task.append("status", data.status);
    task.append("deadline", data.deadline);
    task.append("cardId", data.cardId);
    task.append("boardId", data.boardId);
    task.append("listId", data.listId);
    task.append("description", data.description);
    return { FormDatatask: task };
  }
};
const valdiateCreateTask = (data: any) => {
  let { error, value, warning } = createTaskSchema.validate(data);
  if (error) {
    ToastError(error.message);
    return { error, value, warning };
  } else {
    let task = new FormData();
    if (data.attachedFiles) {
      let result = validateTaskFilesSchema(data.attachedFiles);
      if (result.error) {
        ToastError(result.error);
        return { FileError: "Files must not exceed 10 Migabyte" };
      }
      let newfiles: Array<any> = Array.from(data.attachedFiles);
      for (let i = 0; i < newfiles.length; i++) {
        task.append("attachedFiles", newfiles[i]);
      }
    }
    if (data.teamId !== null) task.append("teamId", data.teamId);
    task.append("name", data.name);
    task.append("categoryId", data.categoryId);
    task.append("subCategoryId", data.subCategoryId);
    task.append("status", data.status);
    task.append("deadline", data.deadline);
    task.append("boardId", data.boardId);
    task.append("listId", data.listId);
    task.append("description", data.description);
    task.append("projectId", data.projectId);
    task.append("start", data.start);

    return { FormDatatask: task };
  }
};

export const validateTaskFilesSchema = (files: File[] | any[]) => {
  let response: {
    error: string | null;
    value: any;
  } | null = null;
  let totalSizeInBytes = 0;
  for (let i = 0; i < files.length; i++) {
    let item = files[i];
    if (item.size > 10000000) {
      response = {
        error: `The file ${item.name} has exceeded the max size 10 MB`,
        value: files,
      };
      break;
    }
    totalSizeInBytes += item.size;
    if (totalSizeInBytes >= 10000000) {
      response = {
        error: "Files has exceeded the max size 10 MB",
        value: files,
      };
      break;
    }
  }
  if (response !== null) return response;
  else return { error: null, value: files };
};

export { valdiateCreateTask };
