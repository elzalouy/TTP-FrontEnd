import Joi from "joi";

export const EditCleintSchema = (clientNames: string[]) =>
  Joi.object({
    clientName: Joi.string()
      .required()
      .invalid(clientNames)
      .min(2)
      .label("Client Name")
      .messages({ "base.invalied": "The client name already existed before" }),
    image: Joi.any().optional().label("Client Image"),
    _id: Joi.string().required().label("Client Id"),
    createdAt: Joi.string().optional(),
  });
