import { Button, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material'
import { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import PasswordInput from 'src/coreUI/components/Inputs/Textfield/PasswordInput'
import { selectLoading } from 'src/models/Auth'
import { useAppSelector } from 'src/models/hooks'
import { resetPMpassword } from 'src/models/PM'
import { IFormInputs } from 'src/types/components/Inputs'
import { IParam, IResetForm } from 'src/types/views/Auth'

const ResetForm: FC<IResetForm> = ({ failed, history }) => {

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm<IFormInputs>();
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [hidePassword, setHidePassword] = useState<boolean>(false);
    const [hideConfirmPassword, setHideConfirmPassword] =
        useState<boolean>(false);
    const loading = useAppSelector(selectLoading);
    const theme = useTheme();
    const { token } = useParams<IParam>();
    const SM = useMediaQuery(theme.breakpoints.down("sm"));
    const dispatch = useDispatch();


    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        if (data.newPassword && data.confirmNewPassword) {
            let pattern = new RegExp(data.newPassword);
            if (pattern.test(data.confirmNewPassword)) {
                setPasswordError(false);
                dispatch(
                    resetPMpassword({
                        data: {
                            id: `Bearer ${token}`,
                            password: data.newPassword,
                        },
                        token: token,
                    })
                );
                setTimeout(() => history.replace("/login"), 1200);
            } else {
                setPasswordError(true);
            }
        }
    };

    return (
        <>
            <Typography
                variant={"h2"}
                fontWeight={"900"}
                paddingTop={4}
                fontFamily={"Cairo"}
            >
                Reset Password
            </Typography>
            {failed.status && (
                <p className="error-text">
                    Setting new password was unsuccessful : {failed.message}
                </p>
            )}
            <PasswordInput
                name="newPassword"
                label="New Password"
                control={control}
                register={register}
                setVisiblity={setHidePassword}
                visible={hidePassword}
                minLength
                error={!!errors.newPassword}
            />
            {errors.newPassword?.type === "required" && (
                <p className="error-text">Please enter your new password</p>
            )}
            {errors.newPassword?.type === "minLength" && (
                <p className="error-text">Your password has less than 8 characters</p>
            )}
            {errors.newPassword?.message && (
                <p className="error-text">{errors.newPassword?.message}</p>
            )}
            <PasswordInput
                name="confirmNewPassword"
                label="New Password"
                control={control}
                register={register}
                setVisiblity={setHideConfirmPassword}
                visible={hideConfirmPassword}
                minLength
                error={!!errors.confirmNewPassword}
            />
            {errors.confirmNewPassword?.type === "required" && (
                <p className="error-text">
                    Please enter your new password again
                </p>
            )}
            {errors.confirmNewPassword?.type === "minLength" && (
                <p className="error-text">Your password has less than 8 characters</p>
            )}
            {passwordError && (
                <p className="error-text">
                    Your passwords do not match , Please Re-enter your new
                    password
                </p>
            )}
            <Button
                sx={{
                    width: "100%",
                    height: 40,
                    borderRadius: 1.5,
                    marginTop: 4,
                    textTransform: "none",
                    fontWeight: "bold",
                }}
                variant="contained"
                disableElevation
                onClick={handleSubmit(onSubmit)}
            >
                {loading ? (
                    <CircularProgress sx={{ color: "white", padding: "10px" }} />
                ) : (
                    "Confirm"
                )}
            </Button>
        </>
    )
}

export default ResetForm