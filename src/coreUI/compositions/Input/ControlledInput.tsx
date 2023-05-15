import { FC } from "react";
import { Controller } from "react-hook-form";
import { IControlledInput } from "src/types/components/Containers";
import Input from "../../components/Inputs/Textfield/Input";

const ControlledInput: FC<IControlledInput> = ({
  name,
  control,
  label,
  type,
  placeholder,
  required,
  elementType,
  error,
  onChange,
  dataTestId,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required,
      }}
      render={(props) => (
        <Input
          label={label}
          type={type}
          value={props.field.value}
          dataTestId={dataTestId}
          onChange={(e: any) => {
            props.field.onChange(e);
            if (onChange) onChange(e);
          }}
          placeholder={placeholder}
          elementType={elementType}
          error={error}
        />
      )}
    />
  );
};

export default ControlledInput;
