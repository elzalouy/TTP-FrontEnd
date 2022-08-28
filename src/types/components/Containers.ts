import { Control, UseFormSetValue } from "react-hook-form";
import { IFilterProps, IInputProps } from "./Inputs";

export interface ITableContainerProps {
  title: string;
  outTitled: boolean;
  expanded: boolean;
  setExpanded?: any;
  bgColor: string;
};

export interface IControlledInput extends IInputProps {
  name: string;
  control: Control<any, any>;
  required?: boolean;
}

export interface IControlledSelect extends IFilterProps {
  name: string;
  control: Control<any, any>;
  setValue: UseFormSetValue<any>
  formLabel: string;
}