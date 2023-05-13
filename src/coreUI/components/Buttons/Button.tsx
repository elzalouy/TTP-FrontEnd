import { CircularProgress } from "@mui/material";
import { FC } from "react";
import { IButton } from "src/types/components/Inputs";
import "./Button.css";

const Button: FC<IButton> = ({
  size,
  type,
  loading,
  disabled,
  onClick,
  label,
  dataTestId,
  form,
  style,
}) => {
  let className = "button-" + size + " " + type;
  let disabledClassName = "button-" + size + " " + type + " " + "disabled";

  return (
    <button
      onClick={loading !== true ? onClick : () => {}}
      type={form?.type ? form.type : "button"}
      form={form?.name ? form.name : ""}
      data-test-id={dataTestId}
      className={disabled ? disabledClassName : className}
      disabled={loading ? loading : false}
      style={{ ...style }}
    >
      {loading === true ? (
        <CircularProgress className="button-loading" />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
