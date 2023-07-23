import { Grid } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
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
import CreateUpdateTeams from "./CreateUpdateTeams";
import CreateUpdateSideLists from "./CreateUpdateSideList";

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
        lists: selectedDepartment.sideLists ?? [],
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
    if (state.addTeams) {
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

  const onChangeNewLists = (index?: number) => {
    if (state.addLists && state.addLists.length >= 0) {
      let lists = [...state.addLists];
      let list = watch().list;
      if (index !== undefined) _.remove(lists, (item) => item === lists[index]);
      else lists.push(list);
      setState({ ...state, addLists: lists });
    }
    resetField("list");
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

  const onRemoveOldList = (id: string, index: number) => {
    let lists = [...state.lists];
    let removeLists = state.removeLists ? [...state?.removeLists] : [];
    if (id !== undefined && id !== "") {
      lists = lists.filter((item) => item._id !== id);
      removeLists.push(id);
    }
    setState({ ...state, removeLists, lists });
  };

  const handleSubmit = async () => {
    setState({ ...state, loading: true });
    let data = watch();
    let department = {
      name: data.name,
      color: data.color,
      removeTeams: state.removeTeams,
      addTeams: state.addTeams,
      addSideLists: state.addLists,
      removeSideLists: state.removeLists,
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
        <div style={{ position: "relative" }}>
          <div className="closeIconContainer" onClick={onClose}>
            <img
              className="closeIcon"
              width="9"
              height="9"
              src={IMAGES.closeicon}
              alt="closeIcon"
            />
          </div>
          <p className="popup-title">Edit department</p>
        </div>
        <Grid item lg={12} sm={12} xs={12} md={12}>
          <ControlledInput
            name="name"
            label={"Department name"}
            placeholder={"Department name"}
            type="text"
            onChange={(e: any) => {
              setState({ ...state, error: { error: undefined } });
            }}
            error={state.error.error?.message ? "true" : undefined}
            control={control}
          />
        </Grid>
        <ControlledSelect
          name="color"
          control={control}
          optionsType="list"
          label="Select"
          formLabel="color"
          elementType="select"
          onSelect={(e: any) => setValue("color", e.target.id)}
          options={getDepartmentOptions(state.colors)}
        />
        <CreateUpdateTeams
          teams={state.teams}
          onRemoveOldTeam={onRemoveOldTeam}
          onChangeNewTeams={onChangeNewTeams}
          disabled={watch().team.length < 2}
          addTeams={state.addTeams ?? []}
          control={control}
        />
        <CreateUpdateSideLists
          lists={state.lists}
          control={control}
          disabled={watch().list.length <= 2}
          addLists={state.addLists ?? []}
          onRemoveOldList={onRemoveOldList}
          onChangeNewLists={onChangeNewLists}
        />
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
