import React, { useEffect, useState } from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../Popup/PopUp";
import "./popups-style.css";
import {
  Controller,
  FieldValue,
  FieldValues,
  useForm,
  UseFormWatch,
} from "react-hook-form";
import { useAppSelector } from "../../../redux/hooks";
import { selectClientsNames } from "../../../redux/Clients";
import { selectPMs } from "../../../redux/PM";
import {
  selectEditProject,
  editProject as editProjectAction,
} from "../../../redux/Projects";
import { useDispatch } from "react-redux";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { fireUpdateProjectHook } from "../../../redux/Ui";
import { TextField, TextFieldProps } from "@mui/material";
import SelectInput2 from "../Inputs/SelectInput2";
import DoneProjectConfirm from "./DoneProjectPopup";
import moment from "moment";
import { date } from "joi";
import {
  calculateStatusBasedOnDeadline,
  getStatus,
  getYesterdaysDate,
} from "../../../helpers/generalUtils";
import { toast } from "react-toastify";
import { validateDate } from "../../../services/validations/project.schema";

type Props = {
  show: string;
  setShow: any;
};

//SX Styles Object

const editProjectTitleStyles = {
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

const editProjectStartDateStyles = {
  cursor: "pointer",
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

const editProjectDeadlineStyles = {
  cursor: "pointer",
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

const EditProject: React.FC<Props> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const {
    control,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm();
  const clients = useAppSelector(selectClientsNames);
  const PMs = useAppSelector(selectPMs);
  const project = useAppSelector(selectEditProject);
  const [confirm, setConfirm] = useState<string>("none");
  const [trigger, setTrigger] = useState<boolean>(false);
  const [updateDate, setUpdateDate] = useState<boolean>(false);
  const [alert, setAlert] = useState<string>("");

  useEffect(() => {
    setValue("clientId", project?.clientId);
    setValue("projectManager", project?.projectManager?._id);
    setValue("deadline", project?.projectDeadline);
    setValue("name", project?.name);
    setValue("status", project?.projectStatus);
    setValue("startDate", project?.startDate);
  }, [project]);

  useEffect(() => {
    if (trigger) {
      let data = watch();
      executeEditProject(data);
    }
  }, [trigger]);

  const getPM = (id: string) => {
    let pm = PMs.find((pm) => pm._id === id);
    return pm?.name;
  };

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

  const executeEditProject = (data: any) => {
    let editProject = { ...project };

    if (alert === "Not Started" || alert === "inProgress") {
      data.status = "inProgress";
    }

    editProject.name = data.name;
    editProject.projectManager = data.projectManager;
    editProject.projectManagerName = PMs.find(
      (item) => item._id === data.projectManager
    )?.name;
    editProject.projectDeadline = data.deadline;
    editProject.clientId = data.clientId;
    editProject.projectStatus = data.status;
    editProject.startDate = data.startDate;

    if (editProject.projectStatus === "Done") {
      let status = calculateStatusBasedOnDeadline(editProject.projectDeadline);
      editProject.projectStatus = status;
    }

    dispatch(editProjectAction({ data: editProject, dispatch }));
    setShow("none");
    setTrigger(false);
  };

  const onSubmitEdit = () => {
    let data = watch();

    if (updateDate) {
      if (data.startDate === null || data.deadline === null) {
        data.status = "Not Started";
      } else {
        data.status = "inProgress";
      }
      executeEditProject(data);
      return;
    }

    if (data.startDate === null && data.deadline === null) {
      setAlert("Starting date and Deadline");
      if (data.status === "Done" || data.status === "inProgress") {
        setConfirm("flex");
      } else {
        setTrigger(true);
      }
    } else if (data.startDate === null && data.deadline !== null) {
      setAlert("Starting date");
      if (data.status === "Done" || data.status === "inProgress") {
        setConfirm("flex");
      } else {
        setTrigger(true);
      }
    } else if (data.startDate !== null && data.deadline === null) {
      setAlert("Deadline");
      if (data.status === "Done" || data.status === "inProgress") {
        setConfirm("flex");
      } else {
        setTrigger(true);
      }
    } else {
      setAlert("");
      if (data.status === "Done") {
        setConfirm("flex");
      } else if (data.status === "inProgress") {
        setAlert("inProgress");
        setConfirm("none");
        setTrigger(true);
      } else {
        setAlert("Not Started");
        setConfirm("none");
        setTrigger(true);
      }
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
              setValue("clientId", project?.clientId);
              setValue("projectManager", project?.projectManager?._id);
              setValue("deadline", project?.projectDeadline);
              setValue("name", project?.name);
              setValue("status", project?.projectStatus);
              setValue("startDate", project?.startDate);
            }}
          />
        </div>
        <p className="popup-title">Edit project</p>
        <div>
          <div className="inputs-grid">
            <div>
              <label className="popup-label">Project title</label>
              <Controller
                name="name"
                control={control}
                render={(props) => (
                  <TextField
                    id="outlined-error"
                    value={props.field.value}
                    sx={editProjectTitleStyles}
                    placeholder="Project name"
                    onChange={props.field.onChange}
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
                  <SelectInput2
                    label="Clients list"
                    handleChange={props.field.onChange}
                    selectText={
                      clients.find(
                        (item) => item.clientId === props.field.value
                      )?.clientName
                    }
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
            </div>
            <div>
              <label className="popup-label">Start date</label>
              <Controller
                name={"startDate"}
                control={control}
                render={(props) => (
                  <MobileDatePicker
                    inputFormat="YYYY-MM-DD"
                    value={props.field.value}
                    onChange={(e) => {
                      validateDate(
                        moment(e).toDate(),
                        "Start date has passed today's date" ,
                        getYesterdaysDate()
                      );
                      props.field.onChange(e);
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
                          placeholder="Start Date"
                          onChange={params.onChange}
                          sx={editProjectStartDateStyles}
                        />
                        {checkProjectStatus(project?.projectStatus) &&
                          watch().startDate !== null && (
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
                    onChange={(e) => {
                      validateDate(
                        moment(e).toDate(),
                        "Deadline has passed today's date" ,
                        getYesterdaysDate()
                      );
                      props.field.onChange(e);
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
                          sx={editProjectDeadlineStyles}
                        />
                        {checkProjectStatus(project?.projectStatus) &&
                          watch().deadline !== null && (
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
                render={(props) => (
                  <SelectInput2
                    label="Project status list"
                    handleChange={props.field.onChange}
                    selectText={getStatus(props.field.value)}
                    selectValue={props.field.value}
                    options={[
                      { value: "inProgress", text: "In Progress" },
                      { value: "Done", text: "Done" },
                    ].map((item, i) => {
                      return {
                        id: item.value,
                        value: item.value,
                        text: item.text,
                      };
                    })}
                  />
                )}
              />
            </div>
            <div>
              <label className="popup-label">Project manager</label>
              <Controller
                name="projectManager"
                control={control}
                render={(props) => (
                  <SelectInput2
                    label="Project managers list"
                    handleChange={props.field.onChange}
                    selectText={getPM(props.field.value)}
                    selectValue={props.field.value}
                    options={
                      PMs?.length > 0
                        ? PMs.map((item) => {
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
            </div>
          </div>
          <div className="controllers">
            <button
              className="controllers-done"
              onClick={() => {
                if (isDirty || updateDate) {
                  onSubmitEdit();
                } else {
                  setShow("none");
                }
              }}
            >
              Done
            </button>
          </div>
        </div>
      </PopUp>
    </>
  );
};

export default EditProject;
