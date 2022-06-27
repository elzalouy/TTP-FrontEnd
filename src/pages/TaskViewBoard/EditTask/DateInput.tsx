import * as React from "react";
import { Controller } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField, TextFieldProps } from "@mui/material";
import IMAGES from "../../../assets/img/Images";
import { dateInputStyle } from "./styles";

interface DateInputProps {
  name: string;
  control: any;
  register: any;
  state: any;
  setValue: any;
  placeholder: string;
}

const DateInput: React.FC<DateInputProps> = ({
  control,
  register,
  state,
  setValue,
  placeholder,
  name,
}) => {
  const style = dateInputStyle()();
  return (
    <Controller
      name={name}
      control={control}
      render={(props) => (
        <MobileDatePicker
          {...register(name)}
          inputFormat="YYYY-MM-DD"
          value={props.field.value}
          onChange={props.field.onChange}
          leftArrowButtonText="arrow"
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <TextField
                {...params}
                placeholder={placeholder}
                error={state.error.error?.details[0].path.includes(name)}
                onChange={params.onChange}
                value={params.value}
                className={style.textField}
              />
              <img
                className="closeIcon"
                src={IMAGES.closeicon}
                style={{
                  width: "10px",
                  height: "10px",
                  position: "absolute",
                  right: "13px",
                  bottom: "17px",
                }}
                alt="closeIcon"
                onClick={() => {
                  setValue("deadline", null);
                }}
              />
            </div>
          )}
        />
      )}
    />
  );
};

export default DateInput;

const editTaskDeadlineStyles = {
  width: "100%",
  paddingTop: 1,
  "& .MuiOutlinedInput-input": {
    height: "13px !important",
    borderRadius: "6px",
    background: "white !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "6px",
  },
};
