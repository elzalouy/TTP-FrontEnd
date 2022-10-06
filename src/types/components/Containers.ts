import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormSetValue,
  UseFormStateReturn,
} from "react-hook-form";
import { IFilterProps, IInputProps } from "./Inputs";

export interface ITableContainerProps {
  title: string;
  outTitled: boolean;
  expanded: boolean;
  setExpanded?: any;
  bgColor: string;
  children: any;
}

export interface IControlledInput extends IInputProps {
  name: string;
  control: Control<any, any>;
  required?: boolean;
}

export interface IControlledSelect extends IFilterProps {
  name: string;
  control: Control<any, any>;
  setValue?: UseFormSetValue<any>;
  formLabel?: string;
  filter?: {
    onHandleChangeFilter: (e: any) => void;
    onChangeFilter: (e: any, props: UseFormProps) => void;
    page: "projects-" | "tasks-";
  };
}

export type UseFormProps = {
  field: ControllerRenderProps<FieldValues, any>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
};

type overFlow = "visible" | "hidden" | "clip" | "scroll" | "auto";
export interface IPopup {
  show: string;
  children: any;
  color?: string;
  minWidthSize?: string;
  maxWidthSize?: string;
  maxHeight?: string;
  overFlowY?: overFlow;
  margin?: string;
  containerClassName?: string;
}
