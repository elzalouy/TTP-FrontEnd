import Joi from "joi";

export interface IProjectFormProps {
  setcurrentStep: any;
  setShow: any;
  currentStep:any;
  backTrigger:any;
  setBackTrigger:any;
  //Here any is the type because behavior is not clear to me : TODO
}

export interface IJoiValidation {
  error: Joi.ValidationError | undefined;
  value: any;
  warning: Joi.ValidationError | undefined;
}