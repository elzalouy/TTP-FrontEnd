import { Grid, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import { ToastError } from "src/coreUI/components/Typos/Alert";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import { setProjectManagerId } from "src/helpers/generalUtils";
import { selectClientOptions } from "src/models/Clients/clients.selectors";
import { useAppSelector } from "src/models/hooks";
import { Manager, selectPMOptions, selectManagers } from "src/models/Managers";
import {
  createProject,
  editProject,
  ProjectsActions,
  selectLoading,
  selectNewProject,
} from "src/models/Projects";
import { selectUi } from "src/models/Ui/UI.selectors";
import { getUserTokenInfo } from "src/services/api";
import { validateCreateProject } from "src/services/validations/project.schema";
import { IJoiValidation, IProjectFormProps } from "src/types/views/Projects";
import DateInput from "src/views/TaskViewBoard/Edit/DateInput";

const ProjectForm: React.FC<IProjectFormProps> = ({
  setcurrentStep,
  currentStep,
  backTrigger,
  setBackTrigger,
}) => {
  const {
    register,
    watch,
    control,
    reset,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      projectManager: "",
      deadline: null,
      startDate: null,
      clientId: "",
      associateProjectManager: "",
    },
  });
  const dispatch = useDispatch();
  const loading = useAppSelector(selectLoading);
  const PMs = useAppSelector(selectManagers);
  const pmOptions = useAppSelector(selectPMOptions);
  const clientOptions = useAppSelector(selectClientOptions);
  const { createProjectPopup } = useAppSelector(selectUi);
  const newProject = useAppSelector(selectNewProject);

  React.useEffect(() => {
    if (currentStep === 0 && backTrigger) {
      setValue("name", newProject.project.name);
      setValue(
        "projectManager",
        setProjectManagerId(newProject.project.projectManager)
      );
      setValue("clientId", newProject.project.clientId);
      setValue("deadline", newProject.project.projectDeadline);
      setValue("startDate", newProject.project.startDate);
      if (newProject.project.associateProjectManager)
        setValue(
          "associateProjectManager",
          newProject.project?.associateProjectManager
        );
    }
  }, [newProject.project]);

  React.useEffect(() => {
    if (!backTrigger) {
      reset();
      setError({ error: undefined, value: undefined, warning: undefined });
    }
  }, [createProjectPopup, backTrigger]);

  const [validateError, setError] = React.useState<IJoiValidation>({
    error: undefined,
    value: undefined,
    warning: undefined,
  });

  //Declaring the data object globally in the component
  let data = watch();

  const handleOnEdit = () => {
    let newProjectData = { ...newProject.project };
    newProjectData.name = data.name;
    newProjectData.clientId = data.clientId;
    newProjectData.projectManager = setProjectManagerId(data.projectManager);
    newProjectData.projectDeadline = data.deadline;
    newProjectData.startDate = data.startDate;
    newProjectData.projectStatus =
      (data.deadline && data.startDate) !== null ? "inProgress" : "Not Started";
    newProjectData.associateProjectManager =
      data.associateProjectManager.length > 0
        ? data.associateProjectManager
        : null;
    //Dispatches edit project and sets this data as the new project data for the form, if user tries to come back and change the values
    dispatch(ProjectsActions.onUpdateNewProject(newProjectData));
    dispatch(editProject({ data: newProjectData, dispatch }));
  };

  const handleCreateProject = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let token = getUserTokenInfo();
    if (token !== null) {
      let project = {
        name: data.name,
        projectManager: data?.projectManager,
        projectManagerName: PMs.find(
          (item: Manager) => item._id === data?.projectManager
        )?.name,
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
        adminId: token?.id,
        associateProjectManager:
          data.associateProjectManager.length > 0
            ? data.associateProjectManager
            : null,
      };

      let isValid = validateCreateProject(project);

      if (isValid.error) {
        setError(isValid);
        ToastError(isValid.error.message);
      } else {
        project.name = `${
          clientOptions.find((item) => item.id === data.clientId)?.text
        }-${data?.name}`;
        dispatch(createProject({ data: project, setcurrentStep, dispatch }));
      }
    }
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //Back trigger decides which block to execute
    if (backTrigger) {
      //This block triggers edit and ensures the flags are reset
      if (isDirty) handleOnEdit();
      //The handle edit is only triggered if the values are changed!
      setcurrentStep(1);
      setBackTrigger(false);
    } else if (!backTrigger) {
      //This block handles the default create project
      handleCreateProject(e);
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
            dataTestId="create-project-name"
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
            dataTestId="create-project-client-select"
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
        <Grid item xs={12} sm={12} lg={6} md={6} paddingTop={1} paddingX={1.8}>
          <DateInput
            label={"Start date"}
            name="startDate"
            control={control}
            placeholder="Start date"
            register={register}
            dataTestId="create-project-date-input"
            setValue={setValue}
            tempError={validateError.error?.details[0].path.includes(
              "startDate"
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6} md={6} paddingTop={1} paddingX={1.8}>
          <DateInput
            label={"Deadline"}
            name="deadline"
            control={control}
            dataTestId="create-project-due-input"
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
            dataTestId="create-project-pm-select"
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
        <Grid item xs={12} sm={12} lg={6} md={6} paddingTop={1} paddingX={1.8}>
          <ControlledSelect
            name="associateProjectManager"
            control={control}
            label="Select"
            formLabel="Associate Project manager"
            dataTestId="create-project-apm-select"
            elementType="select"
            onSelect={(e: any) => {
              setError({
                error: undefined,
                value: undefined,
                warning: undefined,
              });
            }}
            error={
              validateError.error?.details[0]?.path?.includes(
                "associateProjectManager"
              )
                ? "true"
                : "false"
            }
            options={pmOptions.filter(
              (item) => item.id !== watch().projectManager
            )}
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
              dataTestId="submit-create-project"
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectForm;
