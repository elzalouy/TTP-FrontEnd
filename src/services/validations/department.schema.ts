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
    .items({
      _id: Joi.object().optional().label("teams._id"),
      name: Joi.string()
        .required()
        .min(2)
        .max(62)
        .label("department teams's name")
        .messages({
          "any.required": "Department Team name is required",
          "string.min":
            "Department team name should contains at least 2 char, and max 61 chars.",
          "string.max":
            "Department team name should contains at least 2 char, and max 61 chars.",
          "any.invalid": "Department teams should have a unique names",
        }),
      listId: Joi.string().required().label("teams.listId").allow(""),
      isDeleted: Joi.boolean()
        .label("teams.isDeleted")
        .required()
        .default(false),
    })
    .unique((a, b) => a.name === b.name)
    .required()
    .label("department teams"),
});

export const editDepartmentSchema = (teams: string[]) => {
  return Joi.object({
    name: Joi.string().required().max(64).min(2).label("Department name"),
    color: Joi.string().min(2).max(64).required().label("Department color"),
    addTeams: Joi.array()
      .items(
        Joi.string()
          .invalid(...teams)
          .label("department teams's name")
          .messages({
            "any.invalid": "Department teams should have a unique names",
          })
      )
      .optional(),
    removeTeams: Joi.array().items(Joi.string()).optional(),
  });
};
