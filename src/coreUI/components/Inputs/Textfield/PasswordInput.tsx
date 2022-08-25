import { VisibilityOff, Visibility } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { FC } from 'react'
import { Controller } from 'react-hook-form';
import { PasswordInputProps } from 'src/types/components/Inputs';


const PasswordInput: FC<PasswordInputProps> = ({name, label, control, register, visible, setVisiblity, minLength }) => {

    console.log(setVisiblity);
    

    return (
        <>
            <Typography
                variant={"h5"}
                fontWeight={"700"}
                paddingTop={3.5}
                fontFamily={"Cairo"}
                color="#000000"
            >
                {label}
            </Typography>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <div className="password-container">
                        <input
                            {...register(name, { required: true, minLength: minLength && 8 })}
                            type={visible ? "text" : "password"}
                            autoComplete="new-password"
                            className="password-input"
                            onChange={onChange}
                            placeholder="Password"
                        />
                        <IconButton
                            className="password-icon"
                            onClick={() => setVisiblity((state) => !state)}
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
        </>
    )
}

export default PasswordInput