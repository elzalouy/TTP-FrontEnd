import { FC } from 'react'
import { Controller } from "react-hook-form";
import { IControlledContainer } from 'src/types/components/Containers';
import Input from '../../Inputs/Textfield/StyledInput';

const ControlledInput: FC<IControlledContainer> = ({ name, control, label, type, placeholder,required,elementType,error}) => {

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required:required
            }}
            render={(props) => (
                <Input
                    label={label}
                    type={type}
                    value={props.field.value}
                    onChange={props.field.onChange}
                    placeholder={placeholder}
                    elementType={elementType}
                    error={error}
                />
            )}
        />
    )
}

export default ControlledInput