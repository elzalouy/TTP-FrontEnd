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
import { ToastError, ToastWarning } from "src/coreUI/components/Typos/Alert";
import { getDifBetweenDates } from "src/helpers/generalUtils";
import { isDate } from "lodash";

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
    loading: false,
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
      State.status =
        project.projectStatus === "Not Started"
          ? [defaultStatus[1]]
          : project.projectStatus === "In Progress"
          ? [defaultStatus[2]]
          : [defaultStatus[1]];
      State.AssociatePMs = managers?.filter(
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
    const diff = getDifBetweenDates(today, deadline);
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

      deliveryDate: data.projectStatus === "Done" ? new Date(Date.now()) : null,
    };
    if (data.projectStatus === "Done") {
      if (diff.difference.days === 0 && diff.isLate)
        editData.projectStatus = "delivered on time";
      else if (diff.difference.days > 1 && diff.isLate)
        editData.projectStatus = "delivered after deadline";
      else editData.projectStatus = "delivered before deadline";
    } else editData.projectStatus = data.projectStatus;
    editData.startDate =
      data.startDate !== "" ? new Date(data.startDate).toDateString() : null;
    if (editData.startDate === null && editData.projectStatus !== "Not Started")
      return ToastWarning(
        "Start date should be a value, so you can move the project"
      );
    if (editData.startDate === null) editData.projectStatus = "Not Started";
    const validate = validateEditProject(editData);
    if (!validate.error) {
      setState({ ...state, formData: editData });
      if (
        editData?.projectStatus &&
        !isDate(data.projectDeadline) &&
        DoneStatusList.includes(editData.projectStatus)
      )
        return ToastError(
          "Project Deadline should be selected to move project to Done."
        );
      if (
        editData?.projectStatus &&
        DoneStatusList.includes(editData?.projectStatus)
      ) {
        return setState({
          ...state,
          loading: true,
          alertPopupDiplay: "flex",
          formData: { ...editData },
        });
      } else {
        setState({ ...state, loading: true, formData: { ...editData } });
        return dispatch(
          editProjectAction({
            data: editData,
            setShow: (value: string) => {
              setState({ ...state, loading: false });
              setShow(value);
            },
          })
        );
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
          setState({ ...state, loading: false, alertPopupDiplay: "none" });
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
              onSelect={(e: any) => {
                setValue("projectStatus", e.target.id);
              }}
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
                  AssociatePMs: managers?.filter((item) => item.id !== e.id),
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
            disabled={state.loading}
            label="Done"
            onClick={onSubmit}
            dataTestId="edit-project-submit-btn"
            loading={state.loading}
          />
        </div>
      </PopUp>
    </>
  );
};

export default EditProject;
