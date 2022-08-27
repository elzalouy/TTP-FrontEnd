import { CircularProgress } from '@mui/material'
import { FC } from 'react'
import { IButton } from 'src/types/components/Inputs'
import "./Button.css"

const Button: FC<IButton> = ({ size, type, loading, disabled, onClick, label ,dataTestId,form}) => {

    let className = "button-" + size + " " + type;
    let disabledClassName = "button-" + size + " " + type + " " + "disabled";

    return (
        <button
            onClick={onClick}
            type={form?.type ? form.type : "button"}
            form={form?.name ? form.name : ""}
            data-test-id={dataTestId}
            className={disabled ? disabledClassName : className}
        >
            {
                loading ?
                    <CircularProgress 
                    className='button-loading'/>
                    :
                    label
            }
        </button>
    )
}

export default Button