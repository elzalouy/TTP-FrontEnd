import { Button, Grid, Link, Typography } from "@mui/material";
import Ttp from "../../assets/img/ttp_logo.png";
import { Controller, useForm } from "react-hook-form";
import Input from "../../coreUI/usable-component/Inputs/Input";
import { RouteComponentProps } from "react-router";
import Person from "../../assets/img/person.png";

interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

const Forget: React.FC<Props> = ({ history }) => {
  const { register, watch, control } = useForm();

  return (
    <Grid
      container
      height={"100%"}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      alignContent={"center"}
      marginTop={5}
    >
      <Grid
        item
        xs={11}
        sm={11}
        md={8}
        lg={8}
        height={550}
        container
        direction="row"
        sx={{
          boxShadow: "0px 60px 350px 20px #888888;",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          md={6}
          height={"100%"}
          bgcolor={"white"}
          paddingX={5}
          paddingTop={6}
          paddingBottom={4}
        >
          <img src={Ttp} alt="ttp" width="80" color="white" height="40" />
          <Typography
            variant={"h2"}
            fontWeight={"900"}
            paddingTop={4}
            fontFamily={"Cairo"}
          >
            Forget Password
          </Typography>
          <Typography
            variant={"h5"}
            fontWeight={"700"}
            paddingTop={3.5}
            fontFamily={"Cairo"}
            color="#000000"
          >
            Email Address
          </Typography>
          <Controller
            name="email"
            control={control}
            render={(props) => (
              <Input
                {...props}
                visible
                setVisible
                value={props.field.value}
                onChangeValue={(e: React.ChangeEvent) => {
                  e.preventDefault();
                  props.field.onChange(e);
                }}
                type="email"
                placeholder="Email Address"
              />
            )}
          />
          <Button
            sx={{
              width: "100%",
              height: 40,
              borderRadius: 1.5,
              marginTop: 10,
              fontWeight: "bold",
              textTransform: "none",
            }}
            variant="contained"
            disableElevation
            onClick={() => {
              history.push("/Overview");
            }}
          >
            Send
          </Button>
        </Grid>
        <Grid
          item
          display={{ xs: "none", sm: "none", lg: "block", md: "block" }}
          xs={0}
          sm={0}
          md={6}
          lg={6}
          bgcolor={"black"}
          textAlign={"center"}
          paddingTop={20}
        >
          <img src={Person} className="Image" alt="" style={{ width: "60%" }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Forget;
