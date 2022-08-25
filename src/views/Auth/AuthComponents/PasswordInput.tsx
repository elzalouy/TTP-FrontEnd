import { VisibilityOff, Visibility } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import React, { FC } from 'react'
import { Controller } from 'react-hook-form';
import { PasswordInputProps } from 'src/types/components/Inputs';


const PasswordInput: FC<PasswordInputProps> = ({ control, register, visible, setVisiblity }) => {

    return (
        <>
            <Typography
                variant={"h5"}
                fontWeight={"700"}
                paddingTop={3.5}
                fontFamily={"Cairo"}
                color="#000000"
            >
                Password
            </Typography>
            <Controller
                name="password"
                control={control}
                render={({ field: { onChange } }) => (
                    <div className="password-container">
                        <input
                            {...register("password", { required: true })}
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