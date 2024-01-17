import Joi from "joi";

export const EditCleintSchema = (clientNames: string[]) =>
  Joi.object({
    clientName: Joi.string()
      .required()
      .min(2)
      .invalid(...clientNames)
      .label("Client Name")
      .messages({ "any.invalid": "The client name already existed before" }),
    image: Joi.any().optional().label("Client Image"),
    _id: Joi.string().required().label("Client Id"),
    createdAt: Joi.string().optional(),
  });
