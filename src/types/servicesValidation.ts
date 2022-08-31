import Joi from "joi";

export interface IJoiValidation {
  error: Joi.ValidationError | undefined;
  value: any;
  warning: Joi.ValidationError | undefined;
}

export const initJoiValidationError = {
  error: undefined,
  value: undefined,
  warning: undefined,
};
