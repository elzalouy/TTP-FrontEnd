import { FC, useEffect } from "react";
import { IInputProps } from "src/types/components/Inputs";
import "./Input.css";

const Input: FC<IInputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  elementType,
  dataTestId,
  inputName,
  ...props
}) => {
  return (
    <fieldset className="core-ui-input-wrapper">
      <p className="core-ui-input-label">{label}</p>
      <input
        className="core-ui-input"
        name={inputName}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        data-error={error}
        data-test-id={dataTestId}
        data-type={elementType}
        {...props}
      />
      {/* TODO will add an eye icon using fontAwesome icons */}
      {/* {type && <i className="fa-solid fa-eye" onClick={onChangeType}></i>} */}
    </fieldset>
  );
};

export default Input;
