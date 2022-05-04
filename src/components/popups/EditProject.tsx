import React, { useEffect } from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
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

type Props = {
  show: string;
  setShow: any;
};

const EditProject: React.FC<Props> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { control, register, watch, setValue } = useForm();
  const clients = useAppSelector(selectClientsNames);
  const PMs = useAppSelector(selectPMs);
  const project = useAppSelector(selectEditProject);
  useEffect(() => {
    setValue("clientId", project?.clientId);
    setValue("projectManager", project?.projectManager?._id);
    setValue("deadline", project?.projectDeadline);
    setValue("name", project?.name);
    setValue("status", project?.projectStatus);
  }, [project]);
  const onSubmitEdit = () => {
    let data = watch();
    let editProject = { ...project };
    editProject.name = data.name;
    editProject.projectManager = data.projectManager;
    editProject.projectManagerName = PMs.find(
      (item) => item._id === data.projectManager
    )?.name;
    editProject.projectDeadline = data.deadline;
    editProject.clientId = data.clientId;
    editProject.projectStatus = data.status;
    dispatch(editProjectAction(editProject));
    setShow("none");
  };
  return (
    <>
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
                  <input
                    // {...props}
                    defaultValue={project?.name}
                    onChange={props.field.onChange}
                    className="popup-input"
                    type="text"
                    placeholder="Project name"
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
                  <select
                    defaultChecked
                    // {...props}
                    onChange={props.field.onChange}
                    className="popup-select"
                    defaultValue={project?.clientId}
                  >
                    <option>Select</option>
                    {clients &&
                      clients.map((item,i) => (
                        <option
                          selected={props.field.value === item.clientId}
                          value={item.clientId}
                          key={i}
                        >
                          {item.clientName}
                        </option>
                      ))}
                  </select>
                )}
              />
            </div>
            <div>
              <label className="popup-label">Deadline date</label>
              <Controller
                name={"deadline"}
                control={control}
                render={(props) => (
                  <input
                    // {...props}
                    defaultValue={
                      project?.projectDeadline
                        ? new Date(project?.projectDeadline).toISOString()
                        : new Date().toISOString()
                    }
                    onChange={props.field.onChange}
                    className="popup-input"
                    type="date"
                  />
                )}
              />
            </div>
            <div>
              <label className="popup-label">Project title</label>
              <Controller
                name="status"
                control={control}
                render={(props) => (
                  <select
                    className="popup-select"
                    // {...props}
                    onChange={props.field.onChange}
                    defaultValue={project?.projectStatus}
                  >
                    <option>Select</option>
                    {[
                      { value: "inProgress", text: "In Progress" },
                      { value: "late", text: "Late" },
                      { value: "delivered on time", text: "delivered on time" },
                      {
                        value: "delivered defore deadline",
                        text: "delivered defore deadline",
                      },
                    ].map((item,i) => (
                      <option
                        value={item.value}
                        selected={item.value === props.field.value}
                        key={i}
                      >
                        {item.value}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div>
              <label className="popup-label">Project manager</label>
              <Controller
                name="projectManager"
                control={control}
                render={(props) => (
                  <select
                    // {...props}
                    onChange={props.field.onChange}
                    className="popup-select"
                    defaultValue={project?.projectManager?._id}
                  >
                    <option value=""> Select</option>
                    {PMs?.length > 0 &&
                      PMs.map((item,i) => (
                        <option
                          selected={props.field.value === item._id}
                          value={item?._id}
                          key={i}
                        >
                          {item?.name}
                        </option>
                      ))}
                  </select>
                )}
              />
            </div>
            <div>
              <label className="popup-label">Description</label>
              <Controller
                name="description"
                control={control}
                render={(props) => (
                  <textarea
                    // {...props}
                    onChange={props.field.onChange}
                    maxLength={75}
                    className="popup-textarea"
                    rows={3}
                    placeholder="Write about your project"
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
