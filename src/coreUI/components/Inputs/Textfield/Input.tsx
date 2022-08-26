import { TextField, Typography } from "@mui/material";
import * as React from "react";
import { Controller } from "react-hook-form";
import { InputProps } from "src/types/components/Inputs";
import "./Input.css"

const Input: React.FC<InputProps> = ({
  name,
  control,
  register,
  placeholder,
  label,
  id,
  dataTestId,
  required,
  error
}) => {


  return (
    <div id={id} className="core-ui-textfield-wrapper">
      <label className="core-ui-textfield-label">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          return <input
            data-test-id={dataTestId}
            {...register(name, { required: required })}
            value={value}
            className={error ? "core-ui-textfield error-active":"core-ui-textfield"}
            placeholder={placeholder}
            onChange={onChange}
          />
        }}
      />
    </div>
  );
};

export default Input;
