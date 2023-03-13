import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import { SelectDialog } from "src/coreUI/components/Inputs/SelectDialog/SelectDialog";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import { validateEditProject } from "src/services/validations/project.schema";
import DateInput from "src/views/TaskViewBoard/Edit/DateInput";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { selectClientDialogData } from "../../../models/Clients";
import { useAppSelector } from "../../../models/hooks";
import { selectPMOptions } from "../../../models/Managers";
import { editProject as editProjectAction } from "../../../models/Projects";
import "../../popups-style.css";
import DoneProjectConfirm from "./DoneProjectPopup";
import { DoneStatusList, Project } from "src/types/models/Projects";
import { ToastError } from "src/coreUI/components/Typos/Alert";

type Props = {
  show: string;
  setShow: any;
  project?: Project;
};

type FormState = {
  clientId: string;
  projectManager: string;
  projectDeadline: any;
  name: string;
  projectStatus: string;
  startDate: any;
  associateProjectManager: string;
};
const EditProjectStatus = ["Not Started", "In Progress", "Done"];
/**
 * Edit Project Comonent
 * Edit project form makes the user able to edit
 *  - Project Name
 *  - Project Manager
 *  - Associate Project Manager
 *  - Project's Start Date
 *  - Project's End Date
 *  - Project's status
 *  - Project's Client
 *
 * Edit Project Rules
 *  - Start date, deadline, and associate project manager is not required
 *  - if the project's start date is selected and the status was "Not Started", project's status should be "In Progress"
 *  - if the status changed from in progress to Done, it should have a deadline also before going to execute the action.
 */
const EditProject: React.FC<Props> = ({ show, setShow, project }) => {
  const dispatch = useDispatch();
  const clients = useAppSelector(selectClientDialogData);
  const managers = useAppSelector(selectPMOptions);
  const { control, register, watch, setValue, reset } = useForm<FormState>();
  const [state, setState] = useState({
    status: EditProjectStatus.map((item) => {
      return { id: item, text: item, value: item };
    }),
    AssociatePMs: managers,
    alertPopupDiplay: "none",
    formData: {
      name: "",
      associateProjectManager: "",
      projectStatus: "",
      startDate: "",
      projectManager: "",
      projectDeadline: "",
      clientId: "",
      deliveryDate: typeof "" === "string" ? new Date() : null,
    },
  });

  useEffect(() => {
    let defaultStatus: {
        id: string;
        text: string;
        value: string;
      }[],
      State = { ...state };
    if (project?._id) {
      defaultStatus = EditProjectStatus.map((item) => {
        return { id: item, text: item, value: item };
      });
      State.status = project.startDate
        ? [defaultStatus[1], defaultStatus[2]]
        : State.status;
      State.AssociatePMs = managers.filter(
        (item) => item.id !== project.projectManager?._id
      );
      setState(State);
      reset({
        name: project?.name,
        associateProjectManager: project?.associateProjectManager
          ? project.associateProjectManager
          : "",
        projectStatus: DoneStatusList.includes(project?.projectStatus)
          ? "Done"
          : project?.projectStatus,
        startDate: project?.startDate ? new Date(project?.startDate) : "",
        projectManager: project?.projectManager,
        projectDeadline: project.projectDeadline
          ? new Date(project.projectDeadline)
          : "",
        clientId: project?.clientId,
      });
    }
  }, [project, managers]);

  const onSubmit = () => {
    let data = watch();
    let deadline = new Date(data?.projectDeadline);
    const today = new Date();

    let editData = {
      ...data,
      _id: project?._id,
      cardId: project?.cardId,
      boardId: project?.boardId,
      listId: project?.listId,
      projectManagerName: managers.find(
        (item: any) => item.id === data.projectManager
      )?.text,
      associateProjectManager: data?.associateProjectManager
        ? data.associateProjectManager
        : "",
      projectStatus:
        data.projectStatus === "Done"
          ? deadline.toDateString() === today.toDateString()
            ? "delivered on time"
            : deadline.getTime() > today.getTime()
            ? "delivered before deadline"
            : "delivered after deadline"
          : data.projectStatus,
      deliveryDate: data.projectStatus === "Done" ? new Date(Date.now()) : null,
    };

    editData.startDate =
      data.startDate !== "" ? new Date(data.startDate).toDateString() : null;
    editData.projectStatus =
      editData.projectStatus === "Not Started" && editData.startDate
        ? "In Progress"
        : "Not Started";
    editData.projectStatus =
      editData.projectStatus !== "Not Started" && !editData.startDate
        ? "Not Started"
        : editData.projectStatus;
    const validate = validateEditProject(editData);
    if (!validate.error) {
      setState({ ...state, formData: editData });
      switch (data.projectStatus) {
        case "Done":
          if (data.projectDeadline === "") {
            ToastError(
              "Project Deadline should be selected to move project to Done."
            );
            break;
          }
          if (
            project?.projectStatus &&
            !DoneStatusList.includes(project?.projectStatus)
          ) {
            setState({
              ...state,
              formData: editData,
              alertPopupDiplay: "flex",
            });
            break;
          } else dispatch(editProjectAction({ data: editData, setShow }));
          break;
        default:
          dispatch(editProjectAction({ data: editData, setShow }));
          break;
      }
    } else ToastError(validate.error.details[0].message);
  };

  return (
    <>
      <DoneProjectConfirm
        ok={true}
        show={state.alertPopupDiplay}
        setShow={(value: string) =>
          setState({ ...state, alertPopupDiplay: value })
        }
        onOk={() => {
          dispatch(editProjectAction({ data: state.formData, setShow }));
          setState({ ...state, alertPopupDiplay: "none" });
        }}
        okText={"End"}
        cancel={true}
        cancelText={"Cancel"}
        alert={"Are you sure you want to end this project ?"}
      />
      <PopUp show={show}>
        <div style={{ position: "relative" }}>
          <div className="closeIconContainer">
            <img
              className="closeIcon"
              width="9"
              height="9"
              src={IMAGES.closeicon}
              alt="closeIcon"
              onClick={() => setShow("none")}
            />
          </div>
        </div>
        <p className="popup-title">Edit project</p>
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
                    options={clients}
                    selected={clients.find(
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
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={3} md={3} paddingX={1.8}>
            <DateInput
              dataTestId="edit-project-due-date-input"
              label={"Deadline"}
              name="projectDeadline"
              control={control}
              placeholder="Deadline"
              register={register}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
            <ControlledSelect
              name="projectStatus"
              dataTestId="edit-project-status-input"
              control={control}
              optionsType="list"
              formLabel="Project Status"
              elementType="select"
              options={state.status}
              onSelect={(e: any) => setValue("projectStatus", e.target.id)}
              selected={
                state.status.find((item) => item.id === watch().projectStatus)
                  ?.id
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
            <ControlledSelect
              name="projectManager"
              control={control}
              label="Select"
              formLabel="Project manager"
              elementType="select"
              optionsType="dialog"
              options={managers}
              dataTestId="edit-project-associatePM"
              onSelect={(e: any) => {
                setValue("associateProjectManager", "");
                setValue("projectManager", e.id);
                setState({
                  ...state,
                  AssociatePMs: managers.filter((item) => item.id !== e.id),
                });
              }}
              selected={watch().projectManager}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6} paddingX={1.8}>
            <ControlledSelect
              name="associateProjectManager"
              control={control}
              label="Select"
              formLabel="Associate Project manager"
              elementType="select"
              options={state.AssociatePMs}
              optionsType="dialog"
              setValue={setValue}
              dataTestId="edit-project-associatePM"
              selected={watch().associateProjectManager}
              onSelect={(e: any) => {
                setValue("associateProjectManager", e.id);
              }}
            />
          </Grid>
        </Grid>
        <div className="controllers">
          <Button
            size="large"
            type="main"
            label="Done"
            onClick={onSubmit}
            dataTestId="edit-project-submit-btn"
          />
        </div>
      </PopUp>
    </>
  );
};

export default EditProject;
