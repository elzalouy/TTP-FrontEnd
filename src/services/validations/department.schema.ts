import Joi from "joi";

export const CreateDepartmantJoiSchema = Joi.object({
  name: Joi.string().required().min(2).label("Department Name"),
  color: Joi.string()
    .required()
    .valid(
      "blue",
      "orange",
      "green",
      "red",
      "purple",
      "pink",
      "lime",
      "sky",
      "grey"
    )
    .label("Department colors"),
  teams: Joi.array()
    .unique((a, b) => a.name === b.name)
    .required()
    .min(0)
    .label("Department teams"),
  totalInProgress: Joi.number(),
  totalDone: Joi.number(),
});
