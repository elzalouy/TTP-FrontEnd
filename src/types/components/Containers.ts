import { Control } from "react-hook-form";

export interface ITableContainerProps {
  title: string;
  outTitled: boolean;
  expanded: boolean;
  setExpanded?: any;
  bgColor: string;
};

export interface IControlledContainer {
  name: string;
  placeholder: string;
  label: string;
  type: string
  control: Control<any,any>;
  required?: boolean;
  elementType?: "input-style" | "login-style";
  error?:string;
  dataTestId?:string
}