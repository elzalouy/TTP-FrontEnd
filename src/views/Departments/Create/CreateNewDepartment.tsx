import { Grid } from "@mui/material";
import _ from "lodash";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Badge from "src/coreUI/components/Badge/Badge";
import Button from "src/coreUI/components/Buttons/Button";
import ControlledInput from "src/coreUI/components/Containers/Input/ControlledInput";
import ControlledSelect from "src/coreUI/components/Containers/Select/ControlledSelect";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import { getDepartmentOptions } from "src/helpers/generalUtils";
import IMAGES from "../../../assets/img/Images";
// import Input from "../../../coreUI/components/Inputs/Textfield/Input";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { ToastWarning } from "../../../coreUI/components/Typos/Alert";
import { createDepartment } from "../../../models/Departments";
import { CreateDepartmantJoiSchema } from "../../../services/validations/department.schema";
import {
  IcreateDepartmentInit,
  ICreateDepartmentProps,
  ICreateDepartmentState
} from "../../../types/views/Departments";
import "../../popups-style.css";


const CreateNewDepartment: React.FC<ICreateDepartmentProps> = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<ICreateDepartmentState>(
    IcreateDepartmentInit
  );
  const { control, watch, reset, resetField, setValue } = useForm({
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
        <ControlledInput
          name="name"
          label={"Department name"}
          placeholder={"Department name"}
          type="text"
          control={control}
          dataTestId="create-dep-Name"
        />
        <ControlledSelect
          name="color"
          control={control}
          label="Select"
          formLabel="label"
          elementType="select"
          setValue={setValue}
          options={getDepartmentOptions(state.colors)}
        />
        <Grid container alignItems="center" pt={2}>
          <Grid item xs={9} lg={9}>
            <ControlledInput
              name="team"
              label={"Teams"}
              placeholder="Team name"
              type="text"
              control={control}
              dataTestId="create-dep-teamName"
            />
          </Grid>
          <Grid
            item
            xs={3}
            lg={3}
            sx={{ paddingLeft: "10px", marginTop: "32px" }}
          >
            <Button
              type="add"
              size="small"
              label="add"
              dataTestId="create-dep-add-team"
              disabled={watch().team.length <= 2}
              onClick={() => onChangeTeams()}
            />
          </Grid>
        </Grid>
        <div className="names-container">
          {state.teams.map((el, index) => {
            return (
              <Badge
                name={el.name}
                index={index}
                onChange={() => onChangeTeams(index)}
              />
            );
          })}
        </div>
        <br />
        <div className="controllers">
          <Button
            type="main"
            size="large"
            label="done"
            dataTestId="create-dep-submit"
            onClick={onSubmit}
            loading={state.loading}
          />
        </div>
      </PopUp>
    </>
  );
};

export default CreateNewDepartment;
