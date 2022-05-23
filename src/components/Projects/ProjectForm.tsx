import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { selectClientsNames } from "../../redux/Clients/clients.selectors";
import { useAppSelector } from "../../redux/hooks";
import { getPMs, selectPMs } from "../../redux/PM";
import { createProject } from "../../redux/Projects";
import { useDispatch } from "react-redux";
import { getAllClients } from "../../redux/Clients";
import {
  Button,
  ButtonBase,
  Grid,
  Input,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { selectUser } from "../../redux/Auth";
import SelectInput2 from "../../coreUI/usable-component/Inputs/SelectInput2";
// import { Restore } from "@mui/icons-material";

import moment from "moment";
import { validateCreateProject } from "../../helpers/validation";
import { toast } from "react-toastify";
import Joi from "joi";

interface ProjectFormProps {
  setcurrentStep: any;
  setShow: any;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  setShow,
  setcurrentStep,
}) => {
  const { register, watch, control, reset } = useForm({
    defaultValues: {
      name: "",
      projectManager: "",
      deadline: "",
      startDate: "",
      clientId: "",
    },
  });
  // const showPop = useSelector(createProjectPopup)
  const dispatch = useDispatch();
  const clients = useAppSelector(selectClientsNames);
  const user = useAppSelector(selectUser);
  const PMs = useAppSelector(selectPMs);

  React.useEffect(() => {
    reset();
  }, [setShow]);
  const [validateError, setError] = React.useState<{
    error: Joi.ValidationError | undefined;
    value: any;
    warning: Joi.ValidationError | undefined;
  }>({ error: undefined, value: undefined, warning: undefined });
  const onsubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let data = watch();
    let project = {
      name: data?.name,
      projectManager: data?.projectManager,
      projectManagerName: PMs.find((item) => item._id === data?.projectManager)
        ?.name,
      projectDeadline: moment(data?.deadline).toDate(),
      startDate: moment(data?.startDate).toDate(),
      clientId: data?.clientId,
      numberOfFinishedTasks: 0,
      numberOfTasks: 0,
      projectStatus: "inProgress",
      completedDate: null,
      adminId: user?._id,
    };
    let isValid = validateCreateProject(project);
    if (isValid.error) {
      setError(isValid);
      toast(isValid.error.message);
    } else dispatch(createProject({ data: project, setcurrentStep }));
  };
  return (
    <>
      <Grid className="projectFormContainer" container justifyContent={"space-between"}>
        <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
          <label className="label-project">Project title</label>
          <br />
          <Controller
            control={control}
            name="name"
            render={(props) => (
              <TextField
                className="textfield"
                error={validateError.error?.details[0]?.path?.includes("name")}
                id="outlined-error"
                {...register("name")}
                sx={{
                  width: "100%",
                  marginTop: 1,
                  "& .MuiOutlinedInput-input": {
                    height: "13px !important",
                    borderRadius: "6px",
                    background: "white !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "6px",
                  },
                }}
                placeholder="Project name"
                onChange={props.field.onChange}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
          <label className="label-project">Client name</label>
          <br />
          <Controller
            name="clientId"
            control={control}
            render={(props) => (
              <SelectInput2
                error={validateError.error?.details[0].path.includes(
                  "clientId"
                )}
                handleChange={props.field.onChange}
                selectText={
                  clients.find((item) => item.clientId === props.field.value)
                    ?.clientName
                }
                {...register("clientId")}
                selectValue={props.field.value}
                options={
                  clients
                    ? clients?.map((item) => {
                        return {
                          id: item.clientId,
                          value: item.clientId,
                          text: item.clientName,
                        };
                      })
                    : []
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={3} md={3} paddingX={1.8} paddingY={3.5}>
          <label className="label-project">Start Date</label>
          <br />
          <Controller
            name="startDate"
            control={control}
            render={(props) => (
              <MobileDatePicker
               
                inputFormat="YYYY-MM-DD"
                value={props.field.value}
                onChange={props.field.onChange}
                leftArrowButtonText="arrow"
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps
                ) => (
                  <TextField
                  className="date"
                    {...params}
                    error={validateError.error?.details[0].path.includes(
                      "startDate"
                    )}
                    {...register("name")}
                    defaultValue=""
                    onChange={params.onChange}
                    sx={{
                      paddingTop: 1,
                      "& .MuiOutlinedInput-input": {
                        height: "13px !important",
                        borderRadius: "6px",
                        background: "white !important",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "6px",
                      },
                    }}
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={3} md={3} paddingX={1.8} paddingY={3.5}>
          <label className="label-project">Deadline date</label>
          <br />
          <Controller
            name="deadline"
            control={control}
            render={(props) => (
              <MobileDatePicker
                
                inputFormat="YYYY-MM-DD"
                value={props.field.value}
                onChange={props.field.onChange}
                leftArrowButtonText="arrow"
                renderInput={({
                  className,
                  classes,
                  sx,
                  style,
                  ...params
                }: any) => (
                  <TextField
                    {...params}
                    className="date"
                    error={validateError.error?.details[0].path.includes(
                      "deadline"
                    )}
                    {...register("deadline")}
                    sx={{
                      paddingTop: 1,
                      "& .MuiOutlinedInput-input": {
                        height: "13px !important",
                        borderRadius: "6px",
                        background: "white !important",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "6px",
                      },
                    }}
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8} paddingY={3.5}>
          <label className="label-project">Project manager</label>
          <br />
          <Controller
            name="projectManager"
            control={control}
            render={(props) => (
              <SelectInput2
                error={validateError.error?.details[0].path.includes(
                  "projectManager"
                )}
                handleChange={props.field.onChange}
                selectText={
                  PMs.find((item) => item._id === props.field.value)?.name
                }
                {...register("projectManager")}
                selectValue={props.field.value}
                options={
                  PMs
                    ? PMs?.map((item) => {
                        return {
                          id: item._id,
                          value: item._id,
                          text: item.name,
                        };
                      })
                    : []
                }
              />
            )}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          lg={6}
          md={6}
          paddingX={1.8}
          paddingY={2}
          marginBottom={1}
        >
          <ButtonBase
            className="cancelBtn"
            onClick={() => {
              setcurrentStep(0);
              setShow("none");
            }}
          >
            Cancel
          </ButtonBase>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          lg={6}
          md={6}
          paddingX={1.8}
          textAlign="right"
          marginBottom={1}
          paddingY={2}
        >
          <Button
            type="button"
            variant="contained"
            className="blackBtn"
            onClick={onsubmit}
            sx={{
              "@ .MuiButtonBase-root": {
                width: "100%",
              },
            }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectForm;
