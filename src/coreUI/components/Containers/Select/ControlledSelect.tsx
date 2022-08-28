import { FC } from 'react'
import { Controller } from "react-hook-form";
import { IControlledSelect } from 'src/types/components/Containers';
import Select from '../../Inputs/SelectFields/Select';


const ControlledSelect: FC<IControlledSelect> = ({
    name, control, options,formLabel,setValue
}) => {


    return (
        <>
            <label className="popup-label-nt">{formLabel}</label>
            <Controller
                name={name}
                control={control}
                render={(props) => (
                    <Select
                        elementType="select"
                        name="color"
                        label="Select"
                        onSelect={(e:any)=>setValue(props.field.name,e.target.id)}
                        selected={props.field.value}
                        options={options}
                    />
                )}
            />
        </>
    )
}

export default ControlledSelect