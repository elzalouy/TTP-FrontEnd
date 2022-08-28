import "./Input.css";
type elementType = "input";
type InputProps = {
  type: string;
  placeholder: string;
  onChange: any;
  elementType?: elementType;
  value?: string;
  error?: string;
  label?: string;
  props?: any;
};
const Input = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  elementType,
  props,
}: InputProps) => {
  return (
    <fieldset id="usable-input">
      <p className="input-label">{label}</p>
      <input
        className="input"
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        data-error={error}
        data-type={elementType}
        {...props}
      />
    </fieldset>
  );
};

export default Input;