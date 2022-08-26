import { UseFormHandleSubmit } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import { IIFormInputs } from "../components/Inputs";

export interface IFailed {
  status: number | string | boolean;
  message: string;
}

export interface IForgetFormWrapper {
  history: RouteComponentProps["history"];
  visible: boolean;
  failed:IFailed
}

export interface IForgetForm {
  control: any;
  register: any;
  errors: any;
  history: RouteComponentProps["history"];
  onSubmit: any
  handleSubmit: UseFormHandleSubmit<IIFormInputs>;
  loading: boolean | null;
  failed:IFailed
}
export interface ILoginForm {
  failed: IFailed;
  setFailed: React.Dispatch<React.SetStateAction<IFailed>>;
  history: RouteComponentProps["history"];
}

export interface IResetForm {
  failed: IFailed
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