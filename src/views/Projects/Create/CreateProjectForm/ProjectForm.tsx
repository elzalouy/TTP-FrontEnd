import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { selectClientsNames } from "src/models/Clients/clients.selectors";
import { useAppSelector } from "src/models/hooks";
import { selectPMs } from "src/models/PM";
import { createProject, selectLoading } from "src/models/Projects";
import { useDispatch } from "react-redux";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import Joi from "joi";
import { selectUi } from "src/models/Ui/UI.selectors";
import IMAGES from "src/assets/img/Images";
import {
  validateCreateProject,
  validateDate,
} from "src/services/validations/project.schema";
import { ToastError } from "src/coreUI/components/Typos/Alert";
import { getYesterdaysDate, notNullorFalsy } from "src/helpers/generalUtils";
import moment from "moment";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import Input from "src/coreUI/components/Inputs/Textfield/StyledInput";
import { dataTimePickerInputStyle } from "src/coreUI/themes";

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
        alignItems={"flex-start"}
        container
      >
        <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
          <Controller
            control={control}
            name="name"
            render={(props) => (
              <Input
                label="Project title"
                type="text"
                placeholder="Project name"
                onChange={props.field.onChange}
                error={
                  validateError.error?.details[0]?.path?.includes("name")
                    ? "true"
                    : "false"
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
          <label className="label-project">Client name</label>
          <Controller
            name="clientId"
            control={control}
            render={(props) => (
              <Select
                elementType="select"
                name="client"
                label="Select"
                onSelect={(e: any) => setValue(props.field.name, e.target.id)}
                selected={props.field.value}
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
                error={
                  validateError.error?.details[0]?.path?.includes("clientId")
                    ? "true"
                    : "false"
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={3} md={3} paddingTop={1} paddingX={1.8}>
          <label className="label-project">Start Date</label>
          <Controller
            name="startDate"
            control={control}
            render={(props) => (
              <MobileDatePicker
                inputFormat="YYYY-MM-DD"
                value={props.field.value}
                closeOnSelect
                onChange={(e) => {
                  validateDate(
                    moment(e).toDate(),
                    "Start date has passed today's date",
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
                      sx={dataTimePickerInputStyle}
                      className={"date"}
                      {...params}
                      error={validateError.error?.details[0].path.includes(
                        "startDate"
                      )}
                      {...register("startDate")}
                      placeholder="Start Date"
                      onChange={params.onChange}
                      InputProps={{
                        readOnly: true,
                      }}
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
                          bottom: "19px",
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
        <Grid item xs={12} sm={12} lg={3} md={3} paddingTop={1} paddingX={1.8}>
          <label className="label-project">Deadline date</label>
          <Controller
            name="deadline"
            control={control}
            render={(props) => (
              <MobileDatePicker
                inputFormat="YYYY-MM-DD"
                value={props.field.value}
                closeOnSelect
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
                      sx={dataTimePickerInputStyle}
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
        <Grid item xs={12} sm={12} lg={6} md={6} paddingTop={1} paddingX={1.8}>
          <label className="label-project">Project manager</label>
          <Controller
            name="projectManager"
            control={control}
            render={(props) => (
              <Select
                elementType="select"
                name="createProject-projectManager"
                label="Select"
                onSelect={(e: any) => setValue(props.field.name, e.target.id)}
                selected={props.field.value}
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
                error={
                  validateError.error?.details[0]?.path?.includes(
                    "projectManager"
                  )
                    ? "true"
                    : "false"
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