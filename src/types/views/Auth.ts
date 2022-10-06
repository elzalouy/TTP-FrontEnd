import { UseFormHandleSubmit } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import { IFormInputs } from "../components/Inputs";

export interface IFailed {
  status: number | string | boolean;
  message: string;
}

export interface IForgetFormWrapper {
  history: RouteComponentProps["history"];
  visible: boolean;
  failed: IFailed;
}

export interface IForgetForm {
  control: any;
  register: any;
  errors: any;
  history: RouteComponentProps["history"];
  onSubmit: any;
  handleSubmit: UseFormHandleSubmit<IFormInputs>;
  loading: boolean | null;
  failed: IFailed;
}

export interface IResetForm {
  failed: IFailed;
  history: RouteComponentProps["history"];
}

export interface IUpdateForm {
  history: RouteComponentProps["history"];
  failed: IFailed;
}

export interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

export interface IParam {
  token: string;
}
