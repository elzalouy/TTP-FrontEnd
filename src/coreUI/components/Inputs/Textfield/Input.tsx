import * as React from "react";
import { Controller } from "react-hook-form";
import { IInputProps } from "src/types/components/Inputs";
import "./Input.css"

const Input: React.FC<IInputProps> = ({
  name,
  control,
  register,
  placeholder,
  label,
  id,
  dataTestId,
  required,
  error,
  wrapper,
  inputName,
  custom
}) => {

  /* CUSTOM INPUT FOR UNCONTROLLED FORMS */
  /* We need to have both cases here as we are not concentrating on refactoring yet */

  if (custom) {
    return (
      <div id={id} className={wrapper ? INPUT.wrapper_margin : INPUT.wrapper}>
        <label className={INPUT.label}>{label}</label>
        <input
          data-test-id={dataTestId}
          value={custom.value}
          className={error ? INPUT.error : INPUT.input}
          placeholder={placeholder}
          onChange={custom.onChangeEvent}
          name={inputName}
        />
      </div>
    );
  }

  /* INPUT FOR CONTROLLED FORMS USING REACT HOOK */

  if (name) return (
    <div id={id} className={wrapper ? INPUT.wrapper_margin : INPUT.wrapper}>
      <label className={INPUT.label}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          return <input
            data-test-id={dataTestId}
            {...register(name, { required: required })}
            value={value}
            className={error ? INPUT.error : INPUT.input}
            placeholder={placeholder}
            onChange={onChange}
            name={inputName}
          />
        }}
      />
    </div>
  );

  /* SKIP RETURN ERRORS */
  return null;
};

export default Input;


/* Classname configuration for readability */
const INPUT = {
  wrapper: "core-ui-textfield-wrapper",
  wrapper_margin: "core-ui-textfield-wrapper core-ui-textfield-wrapper-margin",
  label: "core-ui-textfield-label",
  input: "core-ui-textfield",
  error: "core-ui-textfield error-active"
}