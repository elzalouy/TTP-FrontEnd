import { TextField, Typography } from "@mui/material";
import * as React from "react";
import { Controller } from "react-hook-form";
import { InputProps } from "../../../../interfaces/views/BoardView";
import { inputStyle } from "./styles";

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
  dataTest,
}) => {
  const style = inputStyle()();
  return (
    <div id={id}>
      <Typography className="label-project">{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <TextField
            data-test={dataTest}
            {...register(name)}
            value={props.field.value}
            error={state?.error?.error?.details[0].path.includes(name)}
            id="outlined-error"
            className={multiline ? style.multilineInput : style.input}
            multiline={multiline ? multiline : undefined}
            rows={rows ? rows : undefined}
            placeholder={placeholder}
            onChange={props.field.onChange}
          />
        )}
      />
    </div>
  );
};

export default Input;
