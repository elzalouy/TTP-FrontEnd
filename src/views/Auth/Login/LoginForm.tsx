import { Button, CircularProgress, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Input from 'src/coreUI/components/Inputs/Textfield/Input'
import PasswordInput from 'src/coreUI/components/Inputs/Textfield/PasswordInput'
import { selectLoading, signIn } from 'src/models/Auth'
import { useAppSelector } from 'src/models/hooks'
import { IFormInputs } from 'src/types/components/Inputs'
import { ILoginForm } from 'src/types/views/Auth'
import Ttp from "../../../assets/img/ttp_logo.png";


const LoginForm: FC<ILoginForm> = ({ failed, setFailed, history }) => {

    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
    } = useForm<IFormInputs>();
    const loading = useAppSelector(selectLoading);
    const dispatch = useDispatch();
    const [visible, setVisiblity] = useState<boolean>(false);
    const theme = useTheme();
    const SM = useMediaQuery(theme.breakpoints.down("sm"));
    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        dispatch(
            signIn({
                data: {
                    email: data.email,
                    password: data.password,
                },
                history,
            })
        );
        setFailed({
            message: "",
            status: false,
        });
    };

    return (
        <Grid
            item
            xs={12}
            sm={12}
            lg={6}
            md={6}
            height={"100%"}
            bgcolor={"white"}
            paddingX={SM ? 1 : 5}
            paddingTop={6}
            paddingBottom={4}
        >
            <img src={Ttp} alt="ttp" width="80" color="white" height="40" />
            <Typography
                variant={"h2"}
                fontWeight={"bolder"}
                paddingTop={4}
                paddingBottom={4}
                className="bold"
            >
                Login to your account
            </Typography>
            {failed.status && (
                <p className="error-text top-margin">Invalid Email Address or Password</p>
            )}
            <Input
                name="email"
                label="Email Address"
                placeholder="Email Address"
                control={control}
                register={register}
                required
            />
            {errors.email?.type === "required" && (
                <p className="error-text">Please enter your email address</p>
            )}
            <PasswordInput
                control={control}
                register={register}
                visible={visible}
                setVisiblity={setVisiblity}
                name="password"
                label="Password"
                minLength={false}
            />
            {errors.password?.type === "required" && (
                <p className="error-text">Please enter your password</p>
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
                    "Login"
                )}
            </Button>
            <Link
                sx={{
                    textDecoration: "none",
                    cursor: "pointer",
                    ":hover": {
                        textDecoration: "underline",
                    },
                }}
                onClick={() => history.push("/ForgetPassword")}
            >
                <Typography
                    textAlign={"center"}
                    variant={"h5"}
                    sx={{ fontWeight: "900" }}
                    paddingTop={3.5}
                    fontFamily={"Cairo"}
                    color="black"
                    className="bold"
                >
                    Forget Password?
                </Typography>
            </Link>
        </Grid>
    )
}

export default LoginForm