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
  onChange
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
          onChange={(e:any)=>{
            props.field.onChange(e);
            onChange(e);
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
