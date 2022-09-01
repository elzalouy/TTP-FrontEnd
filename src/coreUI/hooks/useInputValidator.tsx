import Joi from "joi";
import { useEffect } from "react";

/**
 * useInputValidator
 *
 * It gives the boolean value for error check inside the inputs , you can pass the schema, validate the values and recieve a boolean from this hook
 *
 * @param JoiObjectSchema Mutable Reference Object passed to control its current node
 * @param Value Value - This can be any data object that is to be validated
 * @returns {Object} Returns an object with boolean and error message
 */

export function useInputValidator(
  object: Joi.ObjectSchema<any>,
  values: any // Any because we can reuse this hook for all pages
) {
  const { error } = object.validate(values); //Validate inputs

  if (error === undefined) {
    return {
      message: "",
      isValid: true,
    }; //The error value is undefined if no errors
  } else {
    return {
      message: error,
      isValid: false,
    }; //The error value is true in all other cases considering the types mentioned
  }
}
