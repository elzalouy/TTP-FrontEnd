import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";
import { IFailed } from "../views/Auth";

export interface InputProps {
  name: string;
  control: any;
  register: any;
  label: string;
  state?: any;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  id?: string;
  dataTestId?: string;
  required?: boolean
  bold?: boolean;
  type?: boolean;
}

export interface DateInputProps {
  name: string;
  control: any;
  register: any;
  state: any;
  setValue: any;
  placeholder: string;
  label: string;
}

export interface PasswordInputProps {
  name: string;
  label: string
  control: any;
  register: any;
  visible: boolean;
  setVisiblity: React.Dispatch<React.SetStateAction<boolean>>;
  minLength?: {
    value: number;
    message: string;
  }
}

export interface IFormInputs {
  email: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string
}