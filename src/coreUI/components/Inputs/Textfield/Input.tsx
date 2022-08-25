import { TextField, Typography } from "@mui/material";
import * as React from "react";
import { Controller } from "react-hook-form";
import { InputProps } from "src/types/components/Inputs";
import { inputStyle } from "../styles";
import "./Input.css"

const Input: React.FC<InputProps> = ({
  name,
  control,
  register,
  state,
  placeholder,
  multiline,
  label,
  rows,
  id,
  dataTestId,
  required,
  type,
}) => {

  const style = inputStyle()();
  let labelClassName = 'label-input';

  return (
    <div id={id}>
      <Typography className={labelClassName}>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          return <TextField
            data-test-id={dataTestId}
            {...register(name, { required: required })}
            value={value}
            error={state?.error?.error?.details[0].path.includes(name)}
            id="outlined-error"
            className={multiline ? style.multilineInput : style.input}
            multiline={multiline ? multiline : undefined}
            rows={rows ? rows : undefined}
            placeholder={placeholder}
            onChange={onChange}
          />
        }}
      />
    </div>
  );
};

export default Input;
