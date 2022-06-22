import React, { useEffect } from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../Popup/PopUp";
import "./popups-style.css";
import { useState } from "react";
import { color } from "@mui/system";
import { selectAllMembers } from "../../../redux/techMember/techMembers.selectors";
import { useAppSelector } from "../../../redux/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  createDepartment,
  selectAllDepartments,
  selectDepartmentLoading,
} from "../../../redux/Departments";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import SelectInput2 from "../Inputs/SelectInput2";
import { register } from "../../../utils/serviceWorkerRegistration";
import { generateID } from "../../../helpers/IdGenerator";
import { CircularProgress } from "@mui/material";

type Props = {};

const CreateNewDepartment: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const department = useSelector(selectAllDepartments);
  const depLoading = useAppSelector(selectDepartmentLoading);
  const [Show, setShow] = useState("none");
  const [Data, setData] = useState<string>("Select Team");
  const [Names, setNames] = useState<string[]>([]);
  const [formData, setFormData] = useState<{
    name: string;
    color: string;
    teams: { _id: string; name: string }[];
    mainBoard: boolean;
    totalInProgress: number;
    totalDone: number;
  }>({
    name: "",
    color: "blue",
    teams: [],
    mainBoard: false,
    totalInProgress: 0,
    totalDone: 0,
  });

  useEffect(() => {
    setFormData({
      name: "",
      color: "blue",
      teams: [],
      mainBoard: false,
      totalInProgress: 0,
      totalDone: 0,
    });
    setNames([]);
    setData("");
  }, [Show]);
  const { name, color, teams, mainBoard } = formData;
  const { register, control } = useForm();
  let teamsData = useAppSelector(selectAllMembers);

  const handleSelectTeam = () => {
    // let value = e.target.value;
    let teamData = Data.split(",");
    if (!Names.includes(teamData[1])) {
      setNames([...Names, teamData[1]]);
      setFormData({
        ...formData,
        teams: [...teams, { _id: teamData[0], name: teamData[1] }],
      });
      setData("");
    }
  };

  const getTeamName = (value: string) => {
    let target = value.split(",");
    return target[1];
  };

  const handleRemoveTeam = (index: number) => {
    Names.splice(index, 1);
    setNames([...Names]);
    setFormData({
      ...formData,
      teams: teams.splice(index, 1),
    });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.name) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, color: e.target.value });
    }
  };

  const handleSubmit = async () => {
    let checkMatch = department.find((dep: any) => dep.name === formData.name);
    if (!checkMatch) {
      dispatch(
        createDepartment({
          data: formData,
          dispatch,
          setNames,
          setData,
          setShow,
        })
      );
      setFormData({
        name: "",
        color: "",
        teams: [],
        mainBoard: false,
        totalInProgress: 0,
        totalDone: 0,
      });
    } else {
      toast.error("Department name already exist", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
    }
  };

  return (
    <>
      <div
        className="add-new-dep"
        onClick={() => {
          setShow("flex");
        }}
      >
        <img src={IMAGES.plus} alt="add" />
        <p>Create new department</p>
      </div>
      <PopUp
        show={Show}
        minWidthSize="30vw"
        maxWidthSize="300px"
        padding="30px"
      >
        <div>
          <img
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={() => {
              setShow("none");
            }}
          />
        </div>

        <p className="popup-title">Create new department</p>

        <label className="popup-label-nt">Department name</label>
        <input
          className="popup-input"
          type="text"
          placeholder="Department name"
          name="name"
          onChange={handleChange}
          value={name}
        />

        <label className="popup-label-nt">Color</label>
        {/*   <select
          className="popup-select"
          name="color"
          onChange={handleChange}
          value={formData.color}
        >
          {colors.map((item: string, i: number) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select> */}
        <Controller
          name="CreateDepartmentColors"
          control={control}
          render={(props) => (
            <SelectInput2
              handleChange={handleChange}
              selectText={color}
              {...register("color")}
              selectValue={color}
              options={
                colors
                  ? colors.map((color) => {
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
          {/*       <select
            className="popup-select"
            onChange={(e) => {
              if (e.target.value !== "") {
                setData(e.target.value);
              }
            }}
            value={Data}
          >
            <option value="">Select Team</option>
            {teamsData?.techMembers?.map((team: any) => (
              <option key={team._id} value={`${team._id},${team.name}`}>
                {team.name}
              </option>
            ))}
          </select> */}
          <Controller
            name="CreateDepartmentTeam"
            control={control}
            render={(props) => (
              <SelectInput2
                handleOnClick={() => {
                  if (teamsData.techMembers.length === 0) {
                    toast.warning("There are no existing teams", {
                      position: "top-right",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      toastId: generateID(),
                    });
                  }
                }}
                handleChange={(e: any) => {
                  setData(e.target.value);
                }}
                selectText={getTeamName(Data)}
                {...register("team")}
                selectValue={getTeamName(Data)}
                options={
                  teamsData
                    ? teamsData?.techMembers?.map((team) => {
                        return {
                          id: team._id,
                          value: `${team._id},${team.name}`,
                          text: team.name,
                        };
                      })
                    : []
                }
              />
            )}
          />
          <button
            className="orange-btn"
            onClick={() => {
              handleSelectTeam();
            }}
            disabled={Data === ""}
            style={{
              background: Data !== "" ? "#ffc500" : "#b4b6c4",
            }}
          >
            Add
          </button>
        </div>
        <div className="names-container">
          {Names.map((el, index) => {
            return (
              <div key={index} className="team-name-badge">
                <p className="name-of-badge">{el}</p>
                <img
                  src={IMAGES.closeicon}
                  alt="close"
                  width="9px"
                  height="9px"
                  className="close-badge"
                  onClick={() => {
                    handleRemoveTeam(index);
                  }}
                />
              </div>
            );
          })}
        </div>
        <br />

        <div className="controllers">
          <button className="controllers-done" onClick={() => handleSubmit()}>
            {depLoading ? (
              <CircularProgress sx={createNewDepLoadingStyles} />
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
const colors: string[] = [
  "blue",
  "orange",
  "green",
  "red",
  "purple",
  "pink",
  "lime",
  "sky",
  "grey",
];

const createNewDepLoadingStyles = {
  color: "white",
  padding: "0px",
  height: "25px !important",
  width: "25px !important",
};
