import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Joi from "joi";
import moment from "moment";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import { ToastError } from "src/coreUI/components/Typos/Alert";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import { selectClientOptions } from "src/models/Clients/clients.selectors";
import { useAppSelector } from "src/models/hooks";
import { selectPMOptions, selectPMs } from "src/models/PM";
import { createProject, selectLoading } from "src/models/Projects";
import { selectUi } from "src/models/Ui/UI.selectors";
import {
  validateCreateProject
} from "src/services/validations/project.schema";
import { IProjectFormProps } from "src/types/views/Projects";
import DateInput from "src/views/TaskViewBoard/Edit/DateInput";


// create
const ProjectForm: React.FC<IProjectFormProps> = ({ setcurrentStep, clearErr }) => {
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
  const PMs = useAppSelector(selectPMs);
  const pmOptions = useAppSelector(selectPMOptions);
  const clientOptions = useAppSelector(selectClientOptions);
  const { createProjectPopup } = useAppSelector(selectUi);
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    reset();
  }, [createProjectPopup]);

  React.useEffect(() => {
    if (clearErr) {
      setError({ error: undefined, value: undefined, warning: undefined });
    }
  }, [clearErr])

  const [validateError, setError] = React.useState<{
    error: Joi.ValidationError | undefined;
    value: any;
    warning: Joi.ValidationError | undefined;
  }>({ error: undefined, value: undefined, warning: undefined });
  let data = watch();

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
          <ControlledInput
            name="name"
            label="Project title"
            placeholder={"Project name"}
            type="text"
            control={control}
            error={
              validateError.error?.details[0]?.path?.includes("name")
                ? "true"
                : "false"
            }
            onChange={(e: any) => {
              setError({
                error: undefined,
                value: undefined,
                warning: undefined,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
          <ControlledSelect
            name="clientId"
            control={control}
            label="Select"
            formLabel="client"
            elementType="select"
            onSelect={(e: any) => {
              setError({
                error: undefined,
                value: undefined,
                warning: undefined,
              });
            }}
            error={
              validateError.error?.details[0]?.path?.includes("clientId")
                ? "true"
                : "false"
            }
            options={clientOptions}
            setValue={setValue}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={3} md={3} paddingTop={1} paddingX={1.8}>
          <DateInput
            label={"Start date"}
            name="startDate"
            control={control}
            placeholder="Start date"
            register={register}
            setValue={setValue}
            tempError={validateError.error?.details[0].path.includes(
              "startDate"
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={3} md={3} paddingTop={1} paddingX={1.8}>
          <DateInput
            label={"Deadline"}
            name="deadline"
            control={control}
            placeholder="Deadline"
            register={register}
            setValue={setValue}
            tempError={validateError.error?.details[0].path.includes(
              "deadline"
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6} md={6} paddingTop={1} paddingX={1.8}>
          <ControlledSelect
            name="projectManager"
            control={control}
            label="Select"
            formLabel="Project manager"
            elementType="select"
            onSelect={(e: any) => {
              setError({
                error: undefined,
                value: undefined,
                warning: undefined,
              });
            }}
            error={
              validateError.error?.details[0]?.path?.includes("projectManager")
                ? "true"
                : "false"
            }
            options={pmOptions}
            setValue={setValue}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={12}
          md={12}
          paddingX={1.8}
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          textAlign={"center"}
          marginBottom={1}
          paddingY={2}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              size="medium"
              type="main"
              label="Next"
              loading={loading}
              onClick={onSubmit}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectForm;
