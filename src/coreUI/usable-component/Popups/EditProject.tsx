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
  notNullorFalsy,
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
  const data = watch();
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
      editProject.projectStatus = status;
    }

    console.log(editProject, ": Data sent to dispatch action");

    dispatch(editProjectAction({ data: editProject, dispatch }));
    setShow("none");
    setUpdateDate(false);
    setTrigger(false);
  };

  if (typeof project?.projectStatus !== "undefined") console.log(project?.projectStatus, ": Current Status");
  if (typeof data?.status !== "undefined") console.log(data?.status, ": Updated Status");

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
  }

  const onSubmitEdit = () => {
    const result = showAlertBasedOnDate();
    console.log(result, ": On Submit Data");
    executeEditProject(result);
  };

  let formattedDeadline = moment(data.deadline).format("MM-DD-YYYY");
  let formattedToday = moment(new Date().toUTCString()).format("MM-DD-YYYY");
  let onTime = moment(formattedToday).isSame(formattedDeadline);
  let beforeDeadline = moment(formattedToday).isBefore(formattedDeadline);
  let afterDeadline = moment(formattedToday).isAfter(formattedDeadline);

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
          <p>{formattedDeadline}</p>
          <p>{formattedToday}</p>
          <p>{onTime}</p>
          <p>{beforeDeadline}</p>
          <p>{afterDeadline}</p>
        </div>
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
                    cancelText={""}
                    okText={""}
                    disableCloseOnSelect={false}
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
                          className="date"
                          {...params}
                          placeholder="Start Date"
                          onChange={params.onChange}
                          sx={editProjectStartDateStyles}
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
                          notNullorFalsy(watch().deadline) && (
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
