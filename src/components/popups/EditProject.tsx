import React, { useEffect, useState } from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import "./popups-style.css";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import { selectClientsNames } from "../../redux/Clients";
import { selectPMs } from "../../redux/PM";
import {
  selectEditProject,
  editProject as editProjectAction,
} from "../../redux/Projects";
import { useDispatch } from "react-redux";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { fireUpdateProjectHook } from "../../redux/Ui";
import { TextField, TextFieldProps } from "@mui/material";
import SelectInput2 from "../../coreUI/usable-component/Inputs/SelectInput2";
import DoneProjectConfirm from "./DoneProjectPopup";
import moment from "moment";

type Props = {
  show: string;
  setShow: any;
};

export const getStatus = (status: string | undefined) => {
  if (status === "late") {
    return "Delivered Late";
  } else if (status === "deliver on time") {
    return "Delivered on time";
  } else if (status === "deliver before deadline") {
    return "Delivered earlier";
  } else if (status === "inProgress") {
    return "In Progress";
  } else if (status === "Done") {
    return "Done";
  }
};

const EditProject: React.FC<Props> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { control, watch, setValue } = useForm();
  const clients = useAppSelector(selectClientsNames);
  const PMs = useAppSelector(selectPMs);
  const project = useAppSelector(selectEditProject);
  const [confirm, setConfirm] = useState<string>("none");
  const [trigger, setTrigger] = useState<boolean>(false);

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

  const calculateStatusBasedOnDeadline = (data: any) => {
    let formattedDeadline = moment(project?.projectDeadline).format(
      "MM-DD-YYYY"
    );
    let formattedToday = moment(new Date().toUTCString()).format("MM-DD-YYYY");
    let onTime = moment(formattedToday).isSame(formattedDeadline);
    let beforeDeadline = moment(formattedToday).isBefore(formattedDeadline);
    let afterDeadline = moment(formattedToday).isAfter(formattedDeadline);
    if (afterDeadline) {
      return (data = "late");
    } else if (beforeDeadline) {
      return (data = "deliver before deadline");
    } else if (onTime) {
      return (data = "deliver on time");
    }
  };

  const getPM = (id: string) => {
    let pm = PMs.find((pm) => pm._id === id);
    return pm?.name;
  };

  const executeEditProject = (data: any) => {
    let editProject = { ...project };
    if (data.status === "Done") {
      let status = calculateStatusBasedOnDeadline(data.status);
      data.status = status;
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
    dispatch(editProjectAction({ data: editProject, dispatch }));
    setShow("none");
    setTrigger(false);
  };

  const onSubmitEdit = () => {
    let data = watch();
    if (data === project) {
      setShow("none");
      return;
    }
    if (data.status === "Done") {
      setConfirm("flex");
    } else {
      executeEditProject(data);
      setShow("none");
    }
  };

  return (
    <>
      <DoneProjectConfirm
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
            </div>

            <div>
              <label className="popup-label">Client name</label>
              <Controller
                name="clientId"
                control={control}
                render={(props) => (
                  <SelectInput2
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
              <label className="popup-label">Deadline date</label>
              <Controller
                name={"deadline"}
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
                        placeholder="Deadline"
                        onChange={params.onChange}
                        sx={{
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
                        }}
                      />
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
            <div>
              <label className="popup-label">Start date</label>
              <Controller
                name={"startDate"}
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
                        placeholder="Start Date"
                        onChange={params.onChange}
                        sx={{
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
                        }}
                      />
                    )}
                  />
                )}
              />
            </div>
          </div>
          <div className="controllers">
            <button
              className="controllers-cancel"
              onClick={() => {
                setShow("none");
              }}
            >
              Cancel
            </button>
            <button className="controllers-done" onClick={onSubmitEdit}>
              Done
            </button>
          </div>
        </div>
      </PopUp>
    </>
  );
};

export default EditProject;
