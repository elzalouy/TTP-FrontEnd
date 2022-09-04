import { TextField, TextFieldProps } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import Joi from "joi";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import { dataTimePickerInputStyle } from "src/coreUI/themes";
import {
  calculateStatusBasedOnDeadline,
  getYesterdaysDate,
  notNullorFalsy,
} from "src/helpers/generalUtils";
import { validateDate, validateEditProject } from "src/services/validations/project.schema";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { selectClientOptions } from "../../../models/Clients";
import { useAppSelector } from "../../../models/hooks";
import { selectPMOptions, selectPMs } from "../../../models/PM";
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
    },
  });
  const data = watch();
  const PMs = useAppSelector(selectPMs);
  const statusOptions = useAppSelector(selectProjectStatusOptions);
  const pmOptions = useAppSelector(selectPMOptions);
  const clientOptions = useAppSelector(selectClientOptions);
  const [confirm, setConfirm] = useState<string>("none");
  const [trigger, setTrigger] = useState<boolean>(false);
  const [updateDate, setUpdateDate] = useState<boolean>(false);
  const [alert, setAlert] = useState<string>("");
  const [nameErr, setNameErr] = useState<{ error: Joi.ValidationError | undefined | boolean }>({ error: undefined });

  useEffect(() => {
    setValue("clientId", project?.clientId);
    setValue("projectManager", project?.projectManager?._id);
    setValue("deadline", project?.projectDeadline);
    setValue("name", project?.name);
    setValue("status", project?.projectStatus, { shouldDirty: false });
    setValue("startDate", project?.startDate);
  }, [project]);

  useEffect(() => {
    if (trigger) {
      executeEditProject(data);
    }
  }, [trigger]);

  const checkProjectStatus = (status: string | undefined) => {
    if (
      status === "deliver before deadline" ||
      status === "deliver on time" ||
      status === "late"
    ) {
      return false;
    } else {
      return true;
    }
  };

  const executeEditProject = (formData: any) => {
    let editProject = { ...project };

    if (alert === "Not Started" || alert === "inProgress") {
      formData.status = "inProgress";
    }

    editProject.name = formData.name;
    editProject.projectManager = formData.projectManager;
    editProject.projectManagerName = PMs.find(
      (item) => item._id === formData.projectManager
    )?.name;
    editProject.projectDeadline = formData.deadline;
    editProject.clientId = formData.clientId;
    editProject.projectStatus = formData.status;
    editProject.startDate = formData.startDate;

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
  };

  const showAlertBasedOnDate = () => {
    let onlyStartDateIsNull = data.startDate === null && data.deadline !== null;
    let onlyDeadlineIsNull = data.deadline === null && data.startDate !== null;
    let bothDatesAreNull = data.deadline === null && data.startDate === null;
    let bothDatesAreNotNull = data.deadline !== null && data.startDate !== null;
    let done = data.status === "Done";
    let inProgress = data.status === "inProgress";

    if (updateDate) {
      if (inProgress || done) {
        if (onlyDeadlineIsNull || onlyStartDateIsNull || bothDatesAreNull) {
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
      } else if (inProgress) {
        setConfirm("flex");
        data.status = "Not Started";
      } else {
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
      <PopUp show={show} minWidthSize="50vw">
        <div>
          <img
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={() => {
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
            }}
          />
        </div>
        <p className="popup-title">Edit project</p>
        {nameErr.error && (
          <p className="popup-error">Please fill a valid project name</p>
        )}
        <div>
          <div className="inputs-grid">
            <div>
              <Controller
                name="name"
                control={control}
                render={(props) => (
                  <Input
                    type={"text"}
                    value={props.field.value}
                    label="Project title"
                    placeholder="Project name"
                    error={nameErr.error ? "true" : undefined}
                    onChange={(e: any) => {
                      props.field.onChange(e);
                      let { error } = validateEditProject({ name: e.target.value });
                      if (error) {
                        setNameErr({ error: error });
                      } else {
                        setNameErr({ error: undefined });
                      }
                    }}
                  />
                )}
              />
            </div>
            <div>
              <label className="popup-label">Client name</label>
              <Controller
                name="clientId"
                control={control}
                render={(props) => (
                  <Select
                    name="editProjectClientId"
                    elementType="select"
                    onSelect={(e: any) => {
                      setValue(props.field.name, e.target.id);
                    }}
                    options={clientOptions}
                    selected={props.field.value}
                  />
                )}
              />
            </div>
            <div>
              <label className="popup-label">Start date</label>
              <Controller
                name={"startDate"}
                control={control}
                render={(props) => (
                  <MobileDatePicker
                    closeOnSelect
                    leftArrowButtonText="arrow"
                    inputFormat="YYYY-MM-DD"
                    value={props.field.value}
                    onChange={(e: any) => {
                      validateDate(
                        moment(e).toDate(),
                        "Start date has passed today's date",
                        getYesterdaysDate()
                      );
                      props.field.onChange(moment(e).toDate());
                    }}
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
                          placeholder="Start Date"
                          onChange={params.onChange}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={dataTimePickerInputStyle}
                        />
                        {checkProjectStatus(project?.projectStatus) &&
                          notNullorFalsy(watch().startDate) && (
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
                                setUpdateDate(true);
                              }}
                            />
                          )}
                      </div>
                    )}
                  />
                )}
              />
            </div>
            <div>
              <label className="popup-label">Deadline date</label>
              <Controller
                name={"deadline"}
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
                          placeholder="Deadline"
                          onChange={params.onChange}
                          sx={dataTimePickerInputStyle}
                        />
                        {checkProjectStatus(project?.projectStatus) &&
                          notNullorFalsy(watch().deadline) && (
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
                                setValue("deadline", null);
                                setUpdateDate(true);
                              }}
                            />
                          )}
                      </div>
                    )}
                  />
                )}
              />
            </div>
            <div>
              <label className="popup-label">Project Status</label>
              <Controller
                name="status"
                control={control}
                render={(props) => {
                  return (
                    <Select
                      label={
                        data.status
                          ? checkProjectStatus(data.status)
                            ? data.status
                            : "Done"
                          : "Project Status"
                      }
                      name="editProjectStatus"
                      elementType="select"
                      onSelect={(e: any) =>
                        setValue(props.field.name, e.target.id, {
                          shouldDirty: true,
                        })
                      }
                      options={statusOptions}
                      selected={props.field.value}
                    />
                  );
                }}
              />
            </div>
            <div>
              <label className="popup-label">Project manager</label>
              <Controller
                name="projectManager"
                control={control}
                render={(props) => (
                  <Select
                    options={pmOptions}
                    label="Project managers list"
                    onSelect={(e: any) =>
                      setValue(props.field.name, e.target.id)
                    }
                    elementType="select"
                    name="editProjectManager"
                    selected={props.field.value}
                  />
                )}
              />
            </div>
          </div>
          <div className="controllers">
            <Button
              size="large"
              type="main"
              label="Done"
              onClick={onSubmitEdit}
            />
          </div>
        </div>
      </PopUp>
    </>
  );
};

export default EditProject;
