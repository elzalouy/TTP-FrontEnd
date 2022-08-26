import { CircularProgress } from '@mui/material'
import { FC } from 'react'
import { IButton } from 'src/types/components/Inputs'
import "./Button.css"

const Button: FC<IButton> = ({ size, type, loading, disabled, onClick, label }) => {

    let className = "button-" + size + " " + type;
    let disabledClassName = "button-" + size + " " + type + " " + "disabled";

    return (
        <button
            onClick={onClick}
            className={disabled ? disabledClassName : className}
        >
            {
                loading ?
                    <CircularProgress />
                    :
                    label
            }
        </button>
    )
}

export default Button