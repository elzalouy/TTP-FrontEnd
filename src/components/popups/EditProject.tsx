import React, { useEffect } from "react";
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
import { fireUpdateProjectHook } from "../../redux/Ui";

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

    dispatch(editProjectAction({ data: editProject, dispatch }));
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
                    value={props.field.value}
                    className="popup-input"
                    type="text"
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
                  <select
                    value={props.field.value}
                    className="popup-select"
                    onChange={props.field.onChange}
                  >
                    <option>Select</option>
                    {clients &&
                      clients.map((item, i) => (
                        <option value={item.clientId} key={i}>
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
                    value={props.field.value}
                    className="popup-input"
                    type="date"
                    onChange={props.field.onChange}
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
                  <select
                    value={props.field.value}
                    className="popup-select"
                    onChange={props.field.onChange}
                  >
                    <option>Select</option>
                    {[
                      { value: "inProgress", text: "In Progress" },
                      { value: "late", text: "Late" },
                      { value: "deliver on time", text: "deliver on time" },
                      {
                        value: "delivered after deadline",
                        text: "delivered after deadline",
                      },
                      {
                        value: "deliver before deadline",
                        text: "deliver before deadline",
                      },
                    ].map((item, i) => (
                      <option value={item.value} key={i}>
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
                    value={props.field.value}
                    onChange={props.field.onChange}
                    className="popup-select"
                  >
                    <option value=""> Select</option>
                    {PMs?.length > 0 &&
                      PMs.map((item, i) => (
                        <option value={item?._id} key={i}>
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
                    maxLength={75}
                    className="popup-textarea"
                    rows={3}
                    placeholder="Write about your project"
                    onChange={props.field.onChange}
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
