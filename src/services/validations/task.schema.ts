import Joi from "joi";
import { ToastError } from "../../coreUI/components/Typos/Alert";

export const createTaskSchema = Joi.object({
  projectId: Joi.string().required().min(4).messages({
    "string.base": "Project Id is required",
    "string.empty": "Project Id is required",
    "string.min": "Project Id is required",
    "any.required": "Project Id is required",
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
  listId: Joi.string().required().messages({
    "string.base": "You should select a department to get its default list",
    "string.empty": "You should select a department to get its default list",
    "any.required": "You should select a department to get its default list",
  }),
  boardId: Joi.string().required().min(4).messages({
    "string.base": "You should select a department",
    "string.empty": "You should select a department",
    "string.min": "You should select a department",
    "string.max": "You should select a department",
    "any.required": "You should select a department",
  }),
  status: Joi.string().valid("Tasks Board", "inProgress").required().messages({
    "string.base": "Status is required",
    "string.empty": "Status should be string with min 4 chars",
    "string.min": "Status length should be Min 4 chars",
    "string.max": "Status length should be Max 20 chars",
    "any.required": "Status is required",
  }),
  start: Joi.date().required().messages({
    "any.required": "Task start date is required",
  }),
  subCategoryId: Joi.string().optional().allow(null),
  teamId: Joi.string().optional().allow(null),
  deadline: Joi.date().optional().allow(null),
  description: Joi.string().optional().allow("", null),
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
  categoryId: Joi.string().required().messages({
    "string.base": "You should select a category",
    "string.empty": "You should select a category",
  }),
  cardId: Joi.string()
    .required()
    .messages({ "any.required": "Card id is required" }),
  subCategoryId: Joi.string().optional().allow(null, ""),
  listId: Joi.string().optional().allow(""),
  teamId: Joi.string().optional().allow(null),
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
    .optional(),
  deadline: Joi.date().optional().allow(null, ""),
  boardId: Joi.string().required().messages({
    "string.base": "You should select a department",
    "any.required": "You should select a department",
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

    task.append("id", data.id);
    task.append("cardId", data.cardId);
    task.append("name", data.name);
    task.append("categoryId", data.categoryId);
    task.append("status", data.status);
    task.append("boardId", data.boardId);
    task.append("listId", data.listId);

    if (data.deadline) task.append("deadline", data.deadline);
    if (data.subCategoryId) task.append("subCategoryId", data.subCategoryId);
    if (data.teamId) task.append("teamId", data.teamId);
    if (data.description) task.append("description", data.description);
    if (data.deleteFiles)
      task.append("deleteFiles", JSON.stringify(data.deleteFiles));

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
    task.append("categoryId", data.categoryId);
    task.append("name", data.name);
    task.append("status", data.status);
    task.append("boardId", data.boardId);
    task.append("projectId", data.projectId);
    task.append("start", data.start);
    if (data.deadline) task.append("deadline", data.deadline);
    if (data.teamId) task.append("teamId", data.teamId);
    if (data.subCategoryId) task.append("subCategoryId", data.subCategoryId);
    if (data.listId) task.append("listId", data.listId);
    if (data.description) task.append("description", data.description);

    return { FormDatatask: task };
  }
};

export const validateTaskFilesSchema = (files: File[]) => {
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
    if (!MimeTypes.includes(item.type)) {
      response = {
        error: `This file ${item.name} with type of file ${item.type} is not allowed.`,
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
const MimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg",
  "text/csv",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "image/gif",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "video/mp4",
  "video/3gpp",
  "video/quicktime",
  "video/x-ms-wmv",
  "video/x-msvideo",
  "video/mpeg",
  "video/dvd",
  "video/xvid",
  "video/x-flv",
  "video/x-f4v",
  "video/divx",
  "video/mov",
];
export { valdiateCreateTask };
