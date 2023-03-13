import { TextField, TextFieldProps } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import * as React from "react";
import { Controller } from "react-hook-form";
import { dataTimePickerInputStyle } from "src/coreUI/themes";
import { notNullorFalsy } from "src/helpers/generalUtils";
import { IDateInputProps } from "src/types/components/Inputs";
import IMAGES from "../../../assets/img/Images";

const DateInput: React.FC<IDateInputProps> = ({
  control,
  register,
  state,
  setValue,
  placeholder,
  name,
  label,
  tempError,
  setUpdateDate,
  dataTestId,
  message,
}) => {
  let error = state
    ? state.error.error?.details[0].path.includes(name)
    : tempError;

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
                      data-test-id={dataTestId}
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
                          bottom: "20px",
                        }}
                        alt="closeIcon"
                        onClick={() => {
                          if (setUpdateDate) {
                            /* This trigger is used inside edit project to make the form state dirty on submit */
                            setUpdateDate(true);
                          }

                          setValue(name, "");
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
