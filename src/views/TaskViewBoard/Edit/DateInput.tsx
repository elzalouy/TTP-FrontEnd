import { TextField, TextFieldProps } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import * as React from "react";
import { Controller } from "react-hook-form";
import { dataTimePickerInputStyle } from "src/coreUI/themes";
import { getYesterdaysDate, notNullorFalsy } from "src/helpers/generalUtils";
import { IDateInputProps } from "src/types/components/Inputs";
import IMAGES from "../../../assets/img/Images";
import { validateDate } from "../../../services/validations/project.schema";
import { dateInputStyle } from "./styles";

const DateInput: React.FC<IDateInputProps> = ({
  control,
  register,
  state,
  setValue,
  placeholder,
  name,
  label,
  tempError
}) => {

  const style = dateInputStyle()();

  let error = state ? state.error.error?.details[0].path.includes(name) : tempError;

  /* TODO : The error here will be removed , and replaced with props boolean error  */

  return (
    <>
      <div>
        <label className="label-project">{label}</label>
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
                      error={error}
                      onChange={params.onChange}
                      value={params.value}
                      sx={dataTimePickerInputStyle}
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
                          setValue(name, null);
                          /* I have replaced the "deadline" with name to make this function dynamic for all use case */
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
