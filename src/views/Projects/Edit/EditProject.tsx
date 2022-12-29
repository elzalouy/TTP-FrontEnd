import { Grid } from "@mui/material";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import { SelectDialog } from "src/coreUI/components/Inputs/SelectDialog/SelectDialog";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import {
  calculateStatusBasedOnDeadline,
  checkProjectStatus,
  checkProjectStatusName,
} from "src/helpers/generalUtils";
import { validateEditProject } from "src/services/validations/project.schema";
import DateInput from "src/views/TaskViewBoard/Edit/DateInput";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import {
  selectClientDialogData,
  selectClientOptions,
} from "../../../models/Clients";
import { useAppSelector } from "../../../models/hooks";
import {
  Manager,
  selectPMOptions,
  selectManagers,
} from "../../../models/Managers";
import {
  editProject as editProjectAction,
  selectEditProject,
  selectProjectStatusOptions,
} from "../../../models/Projects";
import "../../popups-style.css";
import DoneProjectConfirm from "./DoneProjectPopup";

type Props = {
  show: string;
  setShow: any;
};

const EditProject: React.FC<Props> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const project = useAppSelector(selectEditProject);
  const {
    control,
    register,
    watch,
    setValue,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: {
      clientId: project?.clientId,
      projectManager: project?.projectManager?._id,
      deadline: project?.projectDeadline,
      name: project?.name,
      status: project?.projectStatus,
      startDate: project?.startDate,
      associateProjectManager: project?.associateProjectManager,
    },
  });
  const data = watch();
  const PMs = useAppSelector(selectManagers);
  const statusOptions = useAppSelector(selectProjectStatusOptions);
  const pmOptions = useAppSelector(selectPMOptions);
  const clientOptions = useAppSelector(selectClientDialogData);
  const [confirm, setConfirm] = useState<string>("none");
  const [trigger, setTrigger] = useState<boolean>(false);
  const [updateDate, setUpdateDate] = useState<boolean>(false);
  const [alert, setAlert] = useState<string>("");
  const [ApmOptions, setApmOptions] = useState(pmOptions);
  const [status, setStatusOptions] = useState(pmOptions);
  const [nameErr, setNameErr] = useState<{
    error: Joi.ValidationError | undefined | boolean;
  }>({ error: undefined });

  useEffect(() => {
    setValue("clientId", project?.clientId);
    setValue("projectManager", project?.projectManager?._id);
    setValue("deadline", project?.projectDeadline);
    setValue("name", project?.name);
    setValue("status", project?.projectStatus, { shouldDirty: false });
    setValue("startDate", project?.startDate);
    setValue("associateProjectManager", project?.associateProjectManager);
    setApmOptions(
      pmOptions.filter((item) => item.id !== watch().projectManager)
    );
  }, [project]);

  useEffect(() => {
    setStatusOptions(statusOptions);
  }, [statusOptions]);

  useEffect(() => {
    if (trigger) {
      executeEditProject(data);
    }
  }, [trigger]);

  const executeEditProject = (formData: any) => {
    let editProject = { ...project };
    if (alert === "Not Started" || alert === "In Progress") {
      formData.status = "In Progress";
    }

    editProject.name = formData.name;
    editProject.projectManager = formData.projectManager;
    editProject.projectManagerName = PMs.find(
      (item: Manager) => item._id === formData.projectManager
    )?.name;
    editProject.projectDeadline = formData.deadline;
    editProject.clientId = formData.clientId;
    editProject.projectStatus = formData.status;
    editProject.startDate = formData.startDate;
    editProject.associateProjectManager = formData.associateProjectManager;
    if (editProject.projectStatus === "Done") {
      let status = calculateStatusBasedOnDeadline(editProject.projectDeadline);
      if (![typeof status, status].includes("undefined")) {
        //Setting project status only if status is not undefined
        editProject.projectStatus = status;
      }
    }

    dispatch(editProjectAction({ data: editProject, dispatch }));
    setShow("none");
    setUpdateDate(false);
    setTrigger(false);
    setAlert("");
  };

  const handleNameChange = (e: any) => {
    let { error } = validateEditProject({ name: e.target.value });
    if (error) {
      setNameErr({ error: error });
    } else {
      setNameErr({ error: undefined });
    }
  };

  const showAlertBasedOnDate = () => {
    let onlyStartDateIsNull = data.startDate === null && data.deadline !== null;
    let onlyDeadlineIsNull = data.deadline === null && data.startDate !== null;
    let bothDatesAreNull = data.deadline === null && data.startDate === null;
    let bothDatesAreNotNull = data.deadline !== null && data.startDate !== null;
    let currentStatus = data.status;
    let done = checkProjectStatusName(currentStatus) === "Done";
    let inProgress = currentStatus === "In Progress";

    if (updateDate) {
      if (done) {
        if (onlyDeadlineIsNull) {
          setAlert("Deadline");
          setConfirm("flex");
        }
        data.status = "Not Started";
      }
      if (inProgress) {
        if (bothDatesAreNull || onlyStartDateIsNull) {
          //If at any point the user tries to clear date and set status to or from inprogess or done , It will set the status to not started
          data.status = "Not Started";
        }
      }
      //Exits the function and returns data
      return data;
    }

    if (bothDatesAreNull) {
      setAlert("Starting date and Deadline");
      if (done) {
        setConfirm("flex");
      } else if (inProgress) {
        setConfirm("flex");
        data.status = "Not Started";
      } else {
        setTrigger(true);
      }
    } else if (onlyStartDateIsNull) {
      setAlert("Starting date");
      if (done) {
        setConfirm("flex");
      } else if (inProgress) {
        setConfirm("flex");
        data.status = "Not Started";
      } else {
        setTrigger(true);
      }
    } else if (onlyDeadlineIsNull) {
      setAlert("Deadline");
      if (done) {
        setConfirm("flex");
      } else {
        setAlert("In Progress");
        setTrigger(true);
      }
    } else if (bothDatesAreNotNull) {
      setAlert("");
      if (done) {
        setConfirm("flex");
      } else if (inProgress) {
        setTrigger(true);
      } else {
        setAlert("Not Started");
        setTrigger(true);
        //Here the setTrigger when true triggers execute project not needing to return data
      }
    }
  };

  const closeIconOnClick = () => {
    setShow("none");
    reset();
    setValue("clientId", project?.clientId);
    setValue("projectManager", project?.projectManager?._id);
    setValue("deadline", project?.projectDeadline);
    setValue("name", project?.name);
    setValue("status", project?.projectStatus, {
      shouldDirty: false,
    });
    setValue("startDate", project?.startDate);
    setNameErr({ error: undefined });
  };

  const onSubmitEdit = () => {
    if (isDirty || updateDate) {
      if (nameErr.error === undefined) {
        const result = showAlertBasedOnDate();
        executeEditProject(result);
        reset();
      }
    } else {
      setShow("none");
      setNameErr({ error: undefined });
    }
  };

  return (
    <>
      <DoneProjectConfirm
        alert={alert}
        setAlert={setAlert}
        show={confirm}
        setShow={setConfirm}
        setTrigger={setTrigger}
      />
      <PopUp show={show}>
        <div style={{ position: "relative" }}>
          <div className="closeIconContainer" onClick={closeIconOnClick}>
            <img
              className="closeIcon"
              width="9"
              height="9"
              src={IMAGES.closeicon}
              alt="closeIcon"
            />
          </div>
        </div>
        <p className="popup-title">Edit project</p>
        {nameErr.error && (
          <p className="popup-error">Please fill a valid project name</p>
        )}
        <Grid
          className="projectFormContainer"
          alignItems={"flex-start"}
          container
          width={"100%"}
        >
          <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
            <ControlledInput
              dataTestId="edit-project-name-input"
              name="name"
              label="Project title"
              placeholder={"Project name"}
              type="text"
              control={control}
              error={nameErr.error ? "true" : undefined}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
            <Controller
              name="clientId"
              control={control}
              render={(props) => {
                return (
                  <SelectDialog
                    name="clientId"
                    label="Select Client"
                    placeholder="Select"
                    options={clientOptions}
                    selected={clientOptions.find(
                      (item) => item.id === watch().clientId
                    )}
                    setSelectedValue={setValue}
                    key={"selectClient"}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={3} md={3} paddingX={1.8}>
            <DateInput
              dataTestId="edit-project-date-input"
              label={"Start date"}
              name="startDate"
              control={control}
              placeholder="Start date"
              register={register}
              setValue={setValue}
              setUpdateDate={setUpdateDate}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={3} md={3} paddingX={1.8}>
            <DateInput
              dataTestId="edit-project-due-date-input"
              label={"Deadline"}
              name="deadline"
              control={control}
              placeholder="Deadline"
              register={register}
              setValue={setValue}
              setUpdateDate={setUpdateDate}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
            <ControlledSelect
              name="status"
              control={control}
              label={
                data.status
                  ? checkProjectStatus(data.status)
                    ? data.status
                    : "Done"
                  : "Project Status"
              }
              formLabel="Project Status"
              elementType="select"
              options={status}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
            <ControlledSelect
              name="projectManager"
              control={control}
              label="Select"
              formLabel="Project manager"
              elementType="select"
              options={pmOptions}
              setValue={setValue}
              onSelect={() => {
                setApmOptions(
                  pmOptions.filter((item) => item.id !== watch().projectManager)
                );
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
            <ControlledSelect
              name="associateProjectManager"
              control={control}
              label="Select"
              formLabel="Associate Project manager"
              elementType="select"
              options={ApmOptions}
              setValue={setValue}
            />
          </Grid>
        </Grid>
        <div className="controllers">
          <Button
            size="large"
            type="main"
            label="Done"
            onClick={onSubmitEdit}
            dataTestId="edit-project-submit-btn"
          />
        </div>
      </PopUp>
    </>
  );
};

export default EditProject;
