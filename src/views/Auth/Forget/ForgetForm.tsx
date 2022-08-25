import { Button, CircularProgress, Link, Typography } from '@mui/material'
import { FC } from 'react'
import Input from 'src/coreUI/components/Inputs/Textfield/Input'
import { IForgetForm } from 'src/types/views/Auth'



const ForgetForm: FC<IForgetForm> = ({ control, register, errors, handleSubmit, onSubmit, loading }) => {
    return (
        <>
            <Typography
                variant={"h2"}
                fontWeight={"900"}
                paddingTop={12}
                paddingBottom={4}
                fontFamily={"Cairo"}
                className="bold"
            >
                Forget Password
            </Typography>
            <Input
                name="email"
                label="Email Address"
                placeholder="Email Address"
                control={control}
                register={register}
                required
            />
            {errors.email?.type === "required" && (
                <p className="error-text">Please enter your email</p>
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
                    "Send"
                )}
            </Button>
    
        </>
    )
}

export default ForgetForm