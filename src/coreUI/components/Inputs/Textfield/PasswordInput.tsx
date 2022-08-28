import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { IPasswordInputProps } from "src/types/components/Inputs";
import "./Input.css";


const PasswordInput: FC<IPasswordInputProps> = ({ name, label, control, register, visible, setVisiblity, minLength, error, wrapper }) => {

    /* CUSTOM CONTROLLED PASSWORD INPUT */

    return (
        <div className={wrapper ? 'password-input-wrapper' : ''}>
            <label
                className='password-input-label'
            >
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <div className="password-container ">
                        <input
                            {...register(name, { required: true, minLength: minLength && 8 })}
                            type={visible ? "text" : "password"}
                            autoComplete="new-password"
                            className={error ? "password-input error-active" : "password-input"}
                            onChange={onChange}
                            placeholder="Password"
                        />
                        <IconButton
                            className="password-icon"
                            onClick={() => setVisiblity((state: any) => !state)}
                        >
                            {!visible ? (
                                <VisibilityOff style={{ color: "#b4b6c4" }} />
                            ) : (
                                <Visibility style={{ color: "#b4b6c4" }} />
                            )}
                        </IconButton>
                    </div>
                )}
            />
            <IconButton
                className="password-icon"
                onClick={() => setVisiblity((state: any) => !state)}
            >
                {!visible ? (
                    <VisibilityOff style={{ color: "#b4b6c4" }} />
                ) : (
                    <Visibility style={{ color: "#b4b6c4" }} />
                )}
            </IconButton>
        </div>
    );
};

export default PasswordInput;
