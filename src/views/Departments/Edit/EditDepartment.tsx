import _ from "lodash";
import React from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import Input from "../../../coreUI/components/Inputs/Textfield/Input";
import SelectInput2 from "../../../coreUI/components/Inputs/SelectInput2";
import { selectUi } from "../../../models/Ui/UI.selectors";
import { useDispatch } from "react-redux";
import { ToastWarning } from "../../../coreUI/components/Typos/Alert";
import { useAppSelector } from "../../../models/hooks";
import { toggleEditDepartment } from "../../../models/Ui";
import { editDepartmentSchema } from "../../../services/validations/department.schema";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import {
  selectEditDepartment,
  updateDepartment,
} from "../../../models/Departments";
import {
  editDepartmentInitState,
  IEditDepartmentProps,
  IEditDepartmentState,
} from "../../../types/views/Departments";
import "../../popups-style.css";
import Button from "src/coreUI/components/Buttons/Button";
import Badge from "src/coreUI/components/Badge/Badge";

const EditDepartment = ({ Show, setShow }: IEditDepartmentProps) => {
  const dispatch = useDispatch();
  // toggleEditDepartment > editDepartmentData
  const selectedDepartment = useAppSelector(selectEditDepartment);
  const { editDepartmentPopup } = useAppSelector(selectUi);
  const [state, setState] = useState<IEditDepartmentState>(
    editDepartmentInitState
  );
  const { register, control, watch, resetField, setValue, reset } = useForm({
    defaultValues: state.formData,
  });

  useEffect(() => {
    if (
      selectedDepartment &&
      selectedDepartment.name &&
      selectedDepartment.color &&
      selectedDepartment.teams
    ) {
      setValue("name", selectedDepartment?.name);
      setValue("color", selectedDepartment?.color);
      setState({
        ...state,
        teams: selectedDepartment?.teams.filter(
          (item) => item.isDeleted === false
        ),
      });
    }
  }, [selectedDepartment, editDepartmentPopup]);

  const onClose = () => {
    onInitState();
    dispatch(toggleEditDepartment("none"));
  };

  const onInitState = () => {
    reset();
    setState(editDepartmentInitState);
  };

  const onChangeNewTeams = (index?: number) => {
    if (state.addTeams && state.removeTeams) {
      let teams = [...state.addTeams];
      let team = watch().team;
      if (index !== undefined) _.remove(teams, (item) => item === teams[index]);
      else teams.push(team);
      setState({
        ...state,
        addTeams: teams,
      });
    }
    resetField("team");
  };
  const onRemoveOldTeam = (id: string, index: number) => {
    // Remove old team
    let teams = [...state.teams];
    let removeTeams = state.removeTeams ? [...state?.removeTeams] : [];
    if (id !== "" && id !== undefined)
      teams = teams.filter((item) => item._id !== id);
    removeTeams.push(id);
    setState({ ...state, removeTeams: removeTeams, teams: teams });
  };
  const handleSubmit = async () => {
    setState({ ...state, loading: true });
    let data = watch();
    let department = {
      name: data.name,
      color: data.color,
      removeTeams: state.removeTeams,
      addTeams: state.addTeams,
    };

    let validation = editDepartmentSchema(
      state.teams.map((item) => item.name)
    ).validate(department);
    if (validation.error) {
      setState({ ...state, error: validation });
      ToastWarning(validation.error.details[0].message);
    } else {
      await dispatch(
        updateDepartment({
          id: selectedDepartment?._id,
          data: department,
          onInitState,
          dispatch,
          stopLoading: () => setState({ ...state, loading: false }),
        })
      );
    }
  };

  return (
    <>
      <PopUp
        show={editDepartmentPopup}
        minWidthSize="30vw"
        maxWidthSize="300px"
      >
        <div>
          <img
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={onClose}
          />
        </div>
        <p className="popup-title">Edit department</p>
        <Input
          name="name"
          control={control}
          register={register}
          label={"Department name"}
          placeholder={"department name"}
          state={state}
          id="editDepartmentName"
        />
        <label className="popup-label-nt">Color</label>
        <Controller
          name="color"
          control={control}
          render={(props) => (
            <SelectInput2
              label="Colors list"
              handleChange={props.field.onChange}
              selectText={props.field.value}
              selectValue={props.field.value}
              {...register("color")}
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
        <Grid
          container
          alignItems="center"
          pt={2}
        >
          <Grid item xs={9} lg={9}>
            <Input
              name="team"
              control={control}
              register={register}
              label={"Teams"}
              state={state}
              id="editDepartmentTeams"
            />
          </Grid>
          <Grid item xs={3} lg={3} sx={{ paddingLeft: "10px", marginTop: "24px" }}>
            <Button
              type="add"
              size="small"
              label="add"
              dataTestId="create-dep-add-team"
              disabled={(watch().team.length <= 2)}
              onClick={() => onChangeNewTeams()}
            />
          </Grid>
        </Grid>
        <div className="names-container">
          {selectedDepartment &&
            state.teams &&
            state?.teams.map((el, index) => {
              if (el)
                return (
                  <Badge
                    name={el.name}
                    index={index}
                    onChange={() => onRemoveOldTeam(el?._id ? el._id : "", index)}
                  />
                );
            })}
          {state.addTeams &&
            state?.addTeams.map((el, index) => {
              if (el)
                return (
                  <Badge
                    name={el}
                    index={index}
                    onChange={() => onChangeNewTeams(index)}
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
            onClick={handleSubmit}
            loading={state.loading}
          />
        </div>
      </PopUp >
    </>
  );
};

export default EditDepartment;
