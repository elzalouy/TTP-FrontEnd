import { Grid } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Badge from "src/coreUI/components/Badge/Badge";
import Button from "src/coreUI/components/Buttons/Button";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import Input from "src/coreUI/components/Inputs/Textfield/StyledInput";
import IMAGES from "../../../assets/img/Images";
// import Input from "../../../coreUI/components/Inputs/Textfield/Input";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { ToastWarning } from "../../../coreUI/components/Typos/Alert";
import {
  selectEditDepartment,
  updateDepartment,
} from "../../../models/Departments";
import { useAppSelector } from "../../../models/hooks";
import { toggleEditDepartment } from "../../../models/Ui";
import { selectUi } from "../../../models/Ui/UI.selectors";
import { editDepartmentSchema } from "../../../services/validations/department.schema";
import {
  editDepartmentInitState,
  IEditDepartmentProps,
  IEditDepartmentState,
} from "../../../types/views/Departments";
import "../../popups-style.css";

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
        {/* TODO rebuild the element */}
        <Controller
          name="name"
          control={control}
          render={(props) => (
            <Input
              label="Department name"
              type="text"
              value={props.field.value}
              onChange={props.field.onChange}
              placeholder={"department name"}
            />
          )}
        />
        <label className="popup-label-nt">Color</label>
        <Controller
          name="color"
          control={control}
          render={(props) => (
            <Select
              elementType="select"
              name="color"
              label="Select"
              onSelect={(e: any) => setValue(props.field.name, e.target.id)}
              selected={props.field.value}
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
        <Grid container justifyContent={"space-between"} pt={2}>
          <Grid item xs={8} lg={8}>
            <Controller
              name="team"
              control={control}
              render={(props) => (
                <Input
                  label="Teams"
                  type="text"
                  value={props.field.value}
                  onChange={props.field.onChange}
                  placeholder={"Team Name"}
                />
              )}
            />
          </Grid>
          <Grid item xs={4} lg={4} paddingLeft={2.8} marginTop={4.2}>
            <Button
              type="add"
              size="small"
              label="add"
              dataTestId="create-dep-add-team"
              disabled={watch().team.length <= 2}
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
                    onChange={() =>
                      onRemoveOldTeam(el?._id ? el._id : "", index)
                    }
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
      </PopUp>
    </>
  );
};

export default EditDepartment;
