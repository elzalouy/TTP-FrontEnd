import { useState } from "react";
import "./Input.css";
type elementType = "input-style" | "login-style";
type InputProps = {
  type: string;
  placeholder: string;
  onChange: any;
  elementType?: elementType;
  value?: string;
  error?: string;
  label?: string;
};
const Input = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  elementType,
  ...props
}: InputProps) => {
  const [state, setState] = useState({ type: type });
  const onChangeType = () => {
    setState({ type: state.type === "text" ? "password" : "text" });
  };
  return (
    <fieldset id="usable-input">
      <p className="input-label">{label}</p>
      <input
        className="input"
        type={state.type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        data-error={error}
        data-type={elementType}
        {...props}
      />
      {/* TODO will add an eye icon using fontAwesome icons */}
      {/* {type && <i className="fa-solid fa-eye" onClick={onChangeType}></i>} */}
    </fieldset>
  );
};

export default Input;
