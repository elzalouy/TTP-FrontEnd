import { FC } from 'react'
import { Controller } from "react-hook-form";
import { IControlledSelect, UseFormProps } from 'src/types/components/Containers';
import Select from '../../Inputs/SelectFields/Select';


const ControlledSelect: FC<IControlledSelect> = ({
    name, control, options, formLabel, setValue, elementType, filter, textTruncate, label
}) => {

    const handleOnSelect = (e: any, props: UseFormProps) => {
        if (elementType === "select") {
            setValue(props.field.name, e.target.id);
        } else if (filter) {
            filter.onChangeFilter(e, props);
            filter.onHandleChangeFilter(e);
        }
    }

    return (
        <>
            {formLabel && <label className="popup-label-nt">{formLabel}</label>}
            <Controller
                name={name}
                control={control}
                render={(props) => (
                    <Select
                        elementType={elementType}
                        name={filter ? `${filter.page}` + props.field.name : name}
                        label={label}
                        onSelect={(e: any) => handleOnSelect(e, props)}
                        selected={props.field.value}
                        options={options}
                        textTruncate={textTruncate}
                    />
                )}
            />
        </>
    )
}

export default ControlledSelect