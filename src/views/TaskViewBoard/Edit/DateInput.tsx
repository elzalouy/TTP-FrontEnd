import { TextField, TextFieldProps } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import * as React from "react";
import { Controller } from "react-hook-form";
import IMAGES from "../../../assets/img/Images";
import { DateInputProps } from "../../../types/views/BoardView";
import { validateDate } from "../../../services/validations/project.schema";
import { dateInputStyle } from "./styles";
import { getYesterdaysDate, notNullorFalsy } from "src/helpers/generalUtils";

const DateInput: React.FC<DateInputProps> = ({
  control,
  register,
  state,
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
          render={(props) => {
            return (
              <MobileDatePicker
                {...register(name)}
                inputFormat="YYYY-MM-DD"
                closeOnSelect
                value={props.field.value}
                onChange={(e: any) => {
                  validateDate(
                    moment(e).toDate(),
                    "Deadline has passed today's date",
                    getYesterdaysDate()
                  );
                  props.field.onChange(moment(e).toDate());
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
                    {notNullorFalsy(props.field.value) && (
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
                    )}
                  </div>
                )}
              />
            );
          }}
        />
      </div>
    </>
  );
};

export default DateInput;
