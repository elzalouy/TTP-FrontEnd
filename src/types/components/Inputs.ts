import React from "react";

export interface IInputProps {
  type: string;
  placeholder: string;
  onChange?: any;
  elementType?: "input-style" | "login-style";
  value?: string;
  error?: string;
  label?: string;
  dataTestId?: string;
  inputName?: string;
}

export interface IFilterProps {
  elementType: "filter" | "select";
  name: string;
  onSelect?: any;
  selected?: string;
  options:
    | {
        id: string;
        value: string;
        text: string;
      }[]
    | any;
  label?: string;
  textTruncate?: number;
  error?: string;
  message?: string;
  dataTestId?: string;
}

export interface IOptions {
  selectRef: React.MutableRefObject<HTMLFieldSetElement | null>;
  display: string;
  onSelect: any;
  elementType: string;
  options: { id: string; value: string; text: string }[];
  setShow: any;
  dataTestId?: string;
}

export interface ISearch {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  size: "custom" | "medium" | "small";
  style?: React.CSSProperties;
  className?: string;
}

export interface IButton {
  label: string;
  size: "x-small" | "large" | "medium" | "small";
  type: "main" | "delete" | "add" | "cancel";
  onClick?: (e: any) => any;
  loading?: boolean | null;
  disabled?: boolean;
  form?: {
    type: "button" | "submit" | "reset";
    name: string;
  };
  style?: React.CSSProperties;
  dataTestId?: string;
}

export interface IDateInputProps {
  name: string;
  control: any;
  register: any;
  setValue: any;
  placeholder: string;
  label: string;
  state?: any;
  tempError?: boolean;
  setUpdateDate?: React.Dispatch<React.SetStateAction<boolean>>;
  dataTestId?: string;
}

export interface IPasswordInputProps {
  name: string;
  label: string;
  control: any;
  register: any;
  visible: boolean;
  setVisiblity: React.Dispatch<React.SetStateAction<boolean>>;
  minLength: boolean;
  error?: boolean;
  wrapper?: boolean;
}

export interface IFormInputs {
  email: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}
