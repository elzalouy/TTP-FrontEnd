import * as React from "react";
import { Controller } from "react-hook-form";
{
  /* Select > label, name, control, register, state, handleChange, selectText,selectValue,options */
}
interface SelectProps {
  label: string;
  name: string;
  control: any;
  register: any;
  state: any;
  handleChange?: any;
  selectText: string | undefined;
  selectValue: string | undefined;
  options: any;
  dataTestId?: string;
}

const Select: React.FC<SelectProps> = ({
  control,
  name,
  state,
  selectText,
  options,
  label,
  register,
  handleChange,
  dataTestId,
}) => {
  return (
    <div>
      <label className="label-project">{label}</label>
      <br />
      <Controller
        name={name}
        control={control}
        render={(props) => (
          // TODO rebuild ui elemnts
          <></>
          // <SelectInput2
          //   {...register(name)}
          //   label={label}
          //   id={dataTestId}
          //   error={state.error.error?.details[0].path.includes("listId")}
          //   handleChange={handleChange ? handleChange : props.field.onChange}
          //   selectText={selectText}
          //   selectValue={props.field.value}
          //   options={options}
          // />
        )}
      />
    </div>
  );
};

export default Select;
