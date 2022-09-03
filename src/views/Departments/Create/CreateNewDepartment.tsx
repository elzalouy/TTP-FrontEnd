import { Box, Grid, Typography } from "@mui/material";
import _ from "lodash";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Badge from "src/coreUI/components/Badge/FormBadge";
import Button from "src/coreUI/components/Buttons/Button";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import { getDepartmentOptions } from "src/helpers/generalUtils";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { ToastWarning } from "../../../coreUI/components/Typos/Alert";
import { createDepartment } from "../../../models/Departments";
import { CreateDepartmantJoiSchema } from "../../../services/validations/department.schema";
import {
  IcreateDepartmentInit,
  ICreateDepartmentProps,
  ICreateDepartmentState,
} from "../../../types/views/Departments";
import "../../popups-style.css";

const addNewDepartmentContainerStyles = {
  py: 1,
  px: 1,
  width: "100%",
  height: 210,
  maxHeight: 350,
  borderRadius: 3,
};

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
      <Box
        sx={addNewDepartmentContainerStyles}
        className="add-new-cat"
        onClick={onOpenModal}
      >
        <img src={IMAGES.plus} alt="add" width={30} height={30} />
        <Typography fontSize={18} color={"#272727"}>
          Create new department
        </Typography>
      </Box>
      <PopUp
        show={state.show}
        minWidthSize="30vw"
        maxWidthSize="300px"
        maxHeight="640px"
        overFlowY="scroll"
      >
        <Grid padding={1}>
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
          <Grid item lg={12} sm={12} xs={12} md={12}>
            <ControlledInput
              name="name"
              label={"Department name"}
              placeholder={"Department name"}
              type="text"
              control={control}
              dataTestId="create-dep-Name"
            />
          </Grid>
          <ControlledSelect
            name="color"
            control={control}
            label="Select"
            formLabel="label"
            elementType="select"
            onSelect={(e: any) => setValue("color", e.target.id)}
            options={getDepartmentOptions(state.colors)}
          />
          <Grid container alignItems="center">
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
                disabled={watch().team.length < 2}
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
        </Grid>
      </PopUp>
    </>
  );
};

export default CreateNewDepartment;
