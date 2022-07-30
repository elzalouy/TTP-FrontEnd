import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { selectClientsNames } from "../../../redux/Clients/clients.selectors";
import { useAppSelector } from "../../../redux/hooks";
import { getPMs, selectPMs } from "../../../redux/PM";
import {
  createProject,
  ProjectsActions,
  selectLoading,
} from "../../../redux/Projects";
import { useDispatch } from "react-redux";
import { getAllClients } from "../../../redux/Clients";
import {
  Alert,
  Button,
  ButtonBase,
  CircularProgress,
  Grid,
  Input,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { selectUser } from "../../../redux/Auth";
import SelectInput2 from "../Inputs/SelectInput2";
// import { Restore } from "@mui/icons-material";

import moment from "moment";
import { toast } from "react-toastify";
import Joi from "joi";
import { selectUi } from "../../../redux/Ui/UI.selectors";
import { generateID } from "../../../helpers/IdGenerator";
import IMAGES from "../../../assets/img/Images";
import {
  validateCreateProject,
  validateDate,
} from "../../../services/validations/project.schema";
import { ToastError, ToastWarning } from "../Typos/Alert";
import { getYesterdaysDate, notNullorFalsy } from "../../../helpers/generalUtils";

interface ProjectFormProps {
  setcurrentStep: any;
  setShow: any;
}
const ProjectForm: React.FC<ProjectFormProps> = ({ setcurrentStep }) => {
  const { register, watch, control, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      projectManager: "",
      deadline: null,
      startDate: null,
      clientId: "",
    },
  });
  // const showPop = useSelector(createProjectPopup)
  const dispatch = useDispatch();
  const loading = useAppSelector(selectLoading);
  const clients = useAppSelector(selectClientsNames);
  const PMs = useAppSelector(selectPMs);
  const { createProjectPopup } = useAppSelector(selectUi);

  React.useEffect(() => {
    reset();
  }, [createProjectPopup]);

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
      projectDeadline:
        data?.deadline !== "" && data?.deadline !== null
          ? moment(data?.deadline).toDate()
          : null,
      startDate:
        data?.startDate !== "" && data.startDate !== null
          ? moment(data?.startDate).toDate()
          : null,
      clientId: data?.clientId,
      numberOfFinishedTasks: 0,
      numberOfTasks: 0,
      projectStatus:
        (data.deadline && data.startDate) !== null
          ? "inProgress"
          : "Not Started",
      completedDate: null,
      adminId: localStorage.getItem("id"),
    };

    let isValid = validateCreateProject(project);

    if (isValid.error) {
      setError(isValid);
      ToastError(isValid.error.message);
    } else {
      dispatch(createProject({ data: project, setcurrentStep, dispatch }));
    }
  };

  return (
    <>
      <Grid
        className="projectFormContainer"
        container
        justifyContent={"space-between"}
      >
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
                sx={projectFormNameStyles}
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
                label="Clients list"
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
                cancelText={""}
                okText={""}
                disableCloseOnSelect={false}
                onChange={(e) => {
                  validateDate(
                    moment(e).toDate(),
                    "Start date has passed today's date" ,
                      getYesterdaysDate()
                  );
                  props.field.onChange(moment(e).toDate());
                }}
                leftArrowButtonText="arrow"
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps
                ) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <TextField
                      className="date"
                      {...params}
                      error={validateError.error?.details[0].path.includes(
                        "startDate"
                      )}
                      {...register("startDate")}
                      placeholder="Start Date"
                      onChange={params.onChange}
                      sx={projectFormStartDateStyles}
                    />
                    {notNullorFalsy(watch().startDate) && (
                      <img
                        className="closeIcon"
                        src={IMAGES.closeicon}
                        style={{
                          width: "10px",
                          height: "10px",
                          position: "absolute",
                          right: "13px",
                          bottom: "17px",
                        }}
                        alt="closeIcon"
                        onClick={() => {
                          setValue("startDate", null);
                        }}
                      />
                    )}
                  </div>
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
                cancelText={""}
                okText={""}
                disableCloseOnSelect={false}
                onChange={(e) => {
                  validateDate(
                    moment(e).toDate(),
                    "Deadline has passed today's date",
                      getYesterdaysDate()
                  );
                  props.field.onChange(moment(e).toDate());
                }}
                leftArrowButtonText="arrow"
                renderInput={({
                  className,
                  classes,
                  sx,
                  style,
                  ...params
                }: any) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <TextField
                      {...params}
                      className="date"
                      error={validateError.error?.details[0].path.includes(
                        "deadline"
                      )}
                      {...register("deadline")}
                      placeholder="Deadline"
                      sx={projectFormDeadlineStyles}
                    />
                    {notNullorFalsy(watch().deadline) && (
                      <img
                        className="closeIcon"
                        src={IMAGES.closeicon}
                        style={{
                          width: "10px",
                          height: "10px",
                          position: "absolute",
                          right: "13px",
                          bottom: "17px",
                        }}
                        alt="closeIcon"
                        onClick={() => {
                          setValue("deadline", null);
                        }}
                      />
                    )}
                  </div>
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
                label="Project managers list"
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
          xs={12}
          sm={12}
          lg={12}
          md={12}
          paddingX={1.8}
          justifyContent="center"
          alignItems={"center"}
          textAlign={"center"}
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
            {loading ? (
              <CircularProgress
                sx={{
                  color: "white",
                  width: "25px !important",
                  height: "25px !important",
                }}
              />
            ) : (
              "Next"
            )}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectForm;

//SX Styles Objects
const projectFormNameStyles = {
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
};

const projectFormStartDateStyles = {
  paddingTop: 1,
  "& .MuiOutlinedInput-input": {
    height: "13px !important",
    borderRadius: "6px",
    background: "white !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "6px",
  },
};

const projectFormDeadlineStyles = {
  paddingTop: 1,
  "& .MuiOutlinedInput-input": {
    height: "13px !important",
    borderRadius: "6px",
    background: "white !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "6px",
  },
};
