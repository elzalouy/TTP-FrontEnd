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
}

export interface IForgetForm {
  control: any;
  register: any;
  errors: any;
  history: RouteComponentProps["history"];
  onSubmit: any
  handleSubmit: UseFormHandleSubmit<IFormInputs>;
  loading: boolean | null;
}
export interface ILoginForm {
  failed: IFailed;
  setFailed: React.Dispatch<React.SetStateAction<IFailed>>;
  history: RouteComponentProps["history"];
}

export interface IResetForm {
  control: any;
  register: any;
  errors: any;
  failed: IFailed
  visible: {
    newPassword: boolean, confirmNewPassword: boolean
  };
  loading: boolean | null;
  passwordError: boolean;
  onSubmit: any
  handleSubmit: UseFormHandleSubmit<IFormInputs>;
  setVisible: {
    newPassword: React.Dispatch<React.SetStateAction<boolean>>,
    confirmNewPassword: React.Dispatch<React.SetStateAction<boolean>>
  };
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