import { Grid } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Badge from "src/coreUI/components/Badge/Badge";
import Button from "src/coreUI/components/Buttons/Button";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import { getDepartmentOptions } from "src/helpers/generalUtils";
import IMAGES from "../../../assets/img/Images";
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
        <Grid item lg={12} sm={12} xs={12} md={12}>
          <ControlledInput
            name="name"
            label={"Department name"}
            placeholder={"Department name"}
            type="text"
            control={control}
          />
        </Grid>
        <ControlledSelect
          name="color"
          control={control}
          label="Select"
          formLabel="color"
          elementType="select"
          onSelect={(e: any) => setValue("color")}
          options={getDepartmentOptions(state.colors)}
        />
        <Grid container justifyContent={"space-between"} pt={2}>
          <Grid item xs={9} lg={9}>
            <ControlledInput
              name="team"
              label={"Teams"}
              placeholder="Team name"
              type="text"
              control={control}
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
