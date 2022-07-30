import React from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/usable-component/Popup/PopUp";
import Input from "../../../coreUI/usable-component/Inputs/Dashboard/Input";
import SelectInput2 from "../../../coreUI/usable-component/Inputs/SelectInput2";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { selectedDepart } from "../../../redux/Departments/departments.selectors";
import { CircularProgress } from "@mui/material";
import { selectAllMembers } from "../../../redux/TechMember/techMembers.selectors";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  updateDepartment,
  selectDepartmentLoading,
  departmentsActions,
} from "../../../redux/Departments";
import "../../../coreUI/usable-component/Popups/popups-style.css";
import {
  editDepartmentInitState,
  IEditDepartmentProps,
  IEditDepartmentState,
} from "../../../interfaces/views/Departments";
import { selectUi } from "../../../redux/Ui/UI.selectors";
import { toggleEditDepartment } from "../../../redux/Ui";

const EditDepartment: React.FC<IEditDepartmentProps> = ({ Show, setShow }) => {
  const dispatch = useDispatch();
  const { editDepartmentPopup } = useAppSelector(selectUi);
  const [state, setState] = useState<IEditDepartmentState>(
    editDepartmentInitState
  );
  const { register, control, watch, reset, resetField } = useForm({
    defaultValues: state.formData,
  });
  const onClose = () => {
    dispatch(toggleEditDepartment("none"));
  };
  const onInitState = () => {
    setState(editDepartmentInitState);
  };
  const onAddNewTeam = () => {
    let team = watch().team;
    setState({
      ...state,
      department: {
        ...state.department,
        teams: [...state.department.teams, { name: team }],
      },
    });
    resetField("team");
  };
  const onRemoveTeam = (name: string) => {
    let teams = [...state.department.teams];
    teams = teams.filter((item) => item.name !== name);
    setState({
      ...state,
      department: { ...state.department, teams: teams },
    });
  };
  const handleSubmit = async () => {
    // 1. set loading
    setState({ ...state, loading: true });
    let data = watch();
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
        <label className="popup-label-nt">Department name</label>
        <Controller
          name="name"
          control={control}
          render={(props) => (
            <Input
              name="name"
              control={control}
              register={register}
              label={"Department name"}
              placeholder={"department name"}
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
              label="Colors list"
              handleChange={props.field.onChange}
              selectText={state.department.color}
              selectValue={state.department.color}
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
        <label className="popup-label-nt">Teams</label>
        <div className="add-teams-section">
          <Controller
            name="team"
            control={control}
            render={(props) => (
              <Input
                name="team"
                control={control}
                register={register}
                label={"Teams"}
                state={state}
                id="editDepartmentTeams"
              />
            )}
          />
          <button
            className="orange-btn"
            onClick={onAddNewTeam}
            disabled={watch().team.length <= 2}
            style={{
              background: watch().team.length >= 2 ? "#ffc500" : "#b4b6c4",
            }}
          >
            Add
          </button>
        </div>
        <div className="names-container">
          {state.department.teams.map((el, index) => {
            if (el) {
              return (
                <div
                  className="team-name-badge"
                  key={index}
                  onClick={(e) => onRemoveTeam(el.name)}
                >
                  <p className="name-of-badge">{el.name}</p>
                  <img
                    src={IMAGES.closeicon}
                    alt="close"
                    width="9px"
                    height="9px"
                    className="pointer"
                  />
                </div>
              );
            }
          })}
        </div>
        <br />
        <div className="controllers">
          <button className="controllers-done" onClick={() => handleSubmit()}>
            {state.loading ? (
              <CircularProgress sx={{ color: "white", padding: "0px" }} />
            ) : (
              "Done"
            )}
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default EditDepartment;
