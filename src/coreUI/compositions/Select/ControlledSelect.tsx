import { FC, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { IControlledSelect } from "src/types/components/Containers";
import Select from "../../components/Inputs/SelectFields/Select";

const ControlledSelect: FC<IControlledSelect> = ({
  name,
  control,
  options,
  formLabel,
  elementType,
  filter,
  textTruncate,
  label,
  onSelect,
  setValue,
  selected,
  message,
  dataTestId,
  error,
  optionsType,
}) => {
  return (
    <>
      {formLabel && <label className="popup-label">{formLabel}</label>}
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <Select
            elementType={elementType}
            name={filter ? `${filter.page}` + props.field.name : name}
            label={label}
            onSelect={(e: any) => {
              if (setValue) {
                //Should dirty prop makes the field dirty on change used to handle change in status
                setValue(
                  props.field.name,
                  optionsType === "dialog" ? e.id : e.target.id,
                  { shouldDirty: true }
                );
              }
              onSelect(e);
            }}
            selected={selected ? selected : props.field.value}
            options={options}
            textTruncate={textTruncate}
            message={message}
            error={error} // it shouldn't be removed
            dataTestId={dataTestId}
            optionsType={optionsType}
          />
        )}
      />
    </>
  );
};

export default ControlledSelect;
