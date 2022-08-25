import { UseFormHandleSubmit } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import { IFormInputs } from "../components/Inputs";

export interface IFailed {
  status: number | string | boolean;
  message: string;
}

export interface IForgetForm {
  control: any;
  register: any;
  errors: any;
  onSubmit: any
  handleSubmit: UseFormHandleSubmit<IFormInputs>;
  history: RouteComponentProps["history"];
  loading: boolean | null;
}
