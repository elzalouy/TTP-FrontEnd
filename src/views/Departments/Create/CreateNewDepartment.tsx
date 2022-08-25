import React from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import Input from "../../../coreUI/components/Inputs/Textfield/Input";
import SelectInput2 from "../../../coreUI/components/Inputs/SelectInput2";
import { Box } from "@mui/system";
import { useState } from "react";
import { ToastWarning } from "../../../coreUI/components/Typos/Alert";
import { CircularProgress } from "@mui/material";
import { createDepartment } from "../../../models/Departments";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CreateDepartmantJoiSchema } from "../../../services/validations/department.schema";
import {
  IcreateDepartmentInit,
  ICreateDepartmentProps,
  ICreateDepartmentState,
} from "../../../types/views/Departments";
import "../../popups-style.css";
import _ from "lodash";
const CreateNewDepartment: React.FC<ICreateDepartmentProps> = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<ICreateDepartmentState>(
    IcreateDepartmentInit
  );
  const { register, control, watch, reset, resetField } = useForm({
    defaultValues: state.formData,
  });
  const onInitState = () => {
    setState(IcreateDepartmentInit);
    reset();
  };
  const onOpenModal = () => {
    let State = { ...state };
    setState({ ...State, show: "flex" });
  };
  const onCloseModal = () => {
    setState(IcreateDepartmentInit);
    reset();
  };

  const onChangeTeams = (index?: number) => {
    let teams = [...state.teams];
    let name = watch().team;
    if (index !== undefined) {
      _.remove(teams, teams[index]);
    } else teams.push({ name: name, listId: "", isDeleted: false });
    setState({ ...state, teams: teams });
    resetField("team");
  };

  const onSubmit = async () => {
    setState({ ...state, loading: true });
    let data = watch();
    let department = {
      name: data.name,
      color: data.color,
      teams: [...state.teams],
    };
    let validation = CreateDepartmantJoiSchema.validate(department);
    if (validation.error) {
      setState({ ...state, error: validation });
      ToastWarning(validation.error.details[0].message);
    } else {
      await dispatch(
        createDepartment({
          data: department,
          onInitState,
          reset,
          onSetLoading: (bool: boolean) =>
            setState({ ...state, loading: bool }),
        })
      );
    }
  };
  return (
    <>
      <div
        data-test-id="createDepartmentBtn"
        className="add-new-dep"
        onClick={onOpenModal}
      >
        <img src={IMAGES.plus} alt="add" />
        <p>Create new department</p>
      </div>
      <PopUp
        show={state.show}
        minWidthSize="30vw"
        maxWidthSize="300px"
        padding="30px"
      >
        <div>
          <img
            data-test-id="create-dep-close-modal"
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={onCloseModal}
          />
        </div>
        <p className="popup-title">Create new department</p>
        <Controller
          name="name"
          control={control}
          render={(props) => (
            <Input
              dataTestId="create-dep-Name"
              name="name"
              control={control}
              register={register}
              label={"Department name"}
              placeholder={"Department name"}
              state={state}
              id="editDepartmentName"
            />
          )}
        />
        <label className="popup-label-nt">Color</label>
        <Controller
          name="color"
          control={control}
          render={(props) => (
            <SelectInput2
              handleChange={props.field.onChange}
              label="Colors"
              {...register("color")}
              selectText={props.field.value}
              selectValue={props.field.value}
              options={
                state.colors
                  ? state.colors.map((color) => {
                      return {
                        id: color,
                        value: color,
                        text: color,
                      };
                    })
                  : []
              }
            />
          )}
        />
        {/* <label className="popup-label-nt">Teams</label> */}
        <Box sx={{ display: "inline-flex", width: "100%", paddingTop: 1 }}>
          <Box width={"75%"}>
            <Controller
              name="team"
              control={control}
              render={(props) => (
                <Input
                  dataTestId="create-dep-teamName"
                  name="team"
                  control={control}
                  register={register}
                  label={"Teams"}
                  state={state}
                  id="editDepartmentTeams"
                />
              )}
            />
          </Box>
          <Box height={"60%"} paddingTop={2}>
            <button
              data-test-id="create-dep-add-team"
              className="gray-btn"
              onClick={() => onChangeTeams()}
              disabled={watch().team.length <= 2}
              style={{
                background: watch().team.length > 2 ? "#ffc500" : "#b4b6c4",
              }}
            >
              Add
            </button>
          </Box>
        </Box>
        <div className="names-container">
          {state.teams.map((el, index) => {
            return (
              <div
                key={index}
                className="team-name-badge"
                onClick={(e) => onChangeTeams(index)}
              >
                <p className="name-of-badge">{el?.name}</p>
                <img
                  src={IMAGES.closeicon}
                  alt="close"
                  width="9px"
                  height="9px"
                  className="close-badge"
                />
              </div>
            );
          })}
        </div>
        <br />
        <div className="controllers">
          <button
            data-test-id="create-dep-submit"
            className="controllers-done"
            onClick={onSubmit}
          >
            {state.loading ? (
              <CircularProgress sx={{ color: "white", padding: "10px" }} />
            ) : (
              "Done"
            )}
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default CreateNewDepartment;
const submitBtn = {
  width: "100%",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
};
const createNewDepLoadingStyles = {
  color: "white",
  padding: "0px",
  height: "25px !important",
  width: "25px !important",
};