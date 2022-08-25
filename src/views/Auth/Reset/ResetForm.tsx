import { Button, CircularProgress, Typography } from '@mui/material'
import { FC } from 'react'
import PasswordInput from 'src/coreUI/components/Inputs/Textfield/PasswordInput'
import { IResetForm } from 'src/types/views/Auth'

const ResetForm: FC<IResetForm> = ({ control, register, errors, failed, visible, setVisible, onSubmit, handleSubmit, passwordError, loading }) => {


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
                setVisiblity={setVisible.newPassword}
                visible={visible.newPassword}
                minLength
            />
            {errors.newPassword?.type === "required" && (
                <p className="error-text">Please enter your new password</p>
            )}
            {errors.newPassword?.message && (
                <p className="error-text">{errors.confirmNewPassword?.message}</p>
            )}
            {errors.newPassword?.message && (
                <p className="error-text">{errors.newPassword?.message}</p>
            )}
            <PasswordInput
                name="confirmNewPassword"
                label="New Password"
                control={control}
                register={register}
                setVisiblity={setVisible.confirmNewPassword}
                visible={visible.confirmNewPassword}
                minLength
            />
            {errors.confirmNewPassword?.type === "required" && (
                <p className="error-text">
                    Please enter your new password again
                </p>
            )}
            {errors.confirmNewPassword?.message && (
                <p className="error-text">{errors.confirmNewPassword?.message}</p>
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