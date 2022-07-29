import * as React from "react";
import { Controller } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField, TextFieldProps } from "@mui/material";
import IMAGES from "../../../assets/img/Images";
import { dateInputStyle } from "./styles";
import { DateInputProps } from "../../../interfaces/views/BoardView";
import { validateDate } from "../../../services/validations/project.schema";
import moment from "moment";
import { getYesterdaysDate } from "../../../helpers/generalUtils";
// now we can consider it a reusable component and moved it (think of my brother) #EzatElzalouy
const DateInput: React.FC<DateInputProps> = ({
  control,
  register,
  state, // should be the error
  setValue,
  placeholder,
  name,
  label,
}) => {
  const style = dateInputStyle()();
  return (
    <>
      <div>
        <label className="label-project">{label}</label>
        <br />
        <Controller
          name={name}
          control={control}
          render={(props) => (
            <MobileDatePicker
              {...register(name)}
              inputFormat="YYYY-MM-DD"
              cancelText={""}
              okText={""}
              disableCloseOnSelect={false}
              value={props.field.value}
              onChange={(e: any) => {
                validateDate(
                  moment(e).toDate(),
                  "Deadline has passed today's date" ,
                    getYesterdaysDate()
                );
                props.field.onChange(e);
              }}
              leftArrowButtonText="arrow"
              renderInput={(
                params: JSX.IntrinsicAttributes & TextFieldProps
              ) => (
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
      </div>
    </>
  );
};

export default DateInput;
