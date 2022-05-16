import React from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState, useEffect } from "react";
import "./popups-style.css";
import { useAppSelector } from "../../redux/hooks";
import { selectedDepart } from "../../redux/Departments/departments.selectors";
import { selectAllMembers } from "../../redux/techMember/techMembers.selectors";
import { useDispatch } from "react-redux";
import { updateDepartment, getAllDepartments } from "../../redux/Departments";

type Props = {
  Show: string;
  handleSetShow: (value: string) => void;
};

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

const EditDepartment: React.FC<Props> = ({ Show, handleSetShow }) => {
  const dispatch = useDispatch();
  const [Data, setData] = useState<string>("");
  const [Names, setNames] = useState<string[]>([]);
  const [removeTeam, setRemoveTeam] = useState<string[]>([]);
  const [addTeam, setAddTeam] = useState<{ _id: string; name: string }[]>([]);
  const selectedDepartment = useAppSelector(selectedDepart);
  let teamsData = useAppSelector(selectAllMembers);
  const [formData, setFormData] = useState<{
    name: string;
    color: string;
    teams: any[];
    mainBoard: boolean;
    totalInProgress: number;
    totalDone: number;
  }>({
    name: "",
    color: "",
    teams: [],
    mainBoard: false,
    totalInProgress: 0,
    totalDone: 0,
  });

  useEffect(() => {
    if (selectedDepartment) {
      setFormData({
        name: selectedDepartment.name,
        color: selectedDepartment.color,
        teams: selectedDepartment.teamsId,
        mainBoard: selectedDepartment.mainBoard,
        totalInProgress: selectedDepartment.totalInProgress,
        totalDone: selectedDepartment.totalDone,
      });
      let selectedTeams: string[] = selectedDepartment.teamsId.map(
        (team: any) => {
          return team.name;
        }
      );
      setNames(selectedTeams);
    }
  }, [selectedDepartment]);

  let { name, color, teams, mainBoard } = formData;
  const handleSelectTeam = () => {
    // let value = e.target.value;
    let teamData = Data.split(",");
    if (!Names.includes(teamData[1])) {
      setNames([...Names, teamData[1]]);

      let newRemoveList = removeTeam.filter(
        (team: string) => team !== teamData[2]
      );
      // check if this team already exsit
      let targetTeam = formData.teams.find(
        (team: any) => team._id === teamData[0]
      );
      console.log({ targetTeam, teamData: teamData[0] });
      if (!targetTeam) {
        setAddTeam([...addTeam, { _id: teamData[0], name: teamData[1] }]);
      }
      setRemoveTeam(newRemoveList);
      setData("");
    }
  };

  const handleRemoveTeam = (index: number) => {
    // add the listId I want to remove in trello
    let targetTeam = teams.find((team: any) => team.name === Names[index]);
    if (targetTeam && targetTeam.idInTrello) {
      setRemoveTeam([...removeTeam, targetTeam.idInTrello]);
    }

    let newAddTeam = addTeam.filter((team: any) => team._id !== targetTeam._id);
    setAddTeam(newAddTeam);

    // filter my team array
    // let filterTeam = teams.filter((team: any) => team.name !== Names[index]);
    Names.splice(index, 1);
    setNames([...Names]);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (selectedDepartment) {
      let depData = {
        _id: selectedDepartment._id,
        boardId: selectedDepartment.boardId,
        name: formData.name,
        color: formData.color,
        mainBoard: formData.mainBoard,
        addTeam: addTeam,
        removeTeam: removeTeam,
      };
      dispatch(updateDepartment({ data: depData, dispatch }));
      handleSetShow("none");
      setFormData({
        name: "",
        color: "",
        teams: [],
        mainBoard: false,
        totalInProgress: 0,
        totalDone: 0,
      });
    }
  };

  return (
    <>
      <PopUp show={Show} minWidthSize="30vw" maxWidthSize="300px">
        <div>
          <img
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={() => {
              handleSetShow("none");
            }}
          />
        </div>

        <p className="popup-title">Edit department</p>

        <label className="popup-label">Department name</label>
        <input
          className="popup-input"
          type="text"
          placeholder={name}
          value={name}
          onChange={handleChange}
          name="name"
        />
        <label className="popup-label">Color</label>
        <select
          className="popup-select"
          name="color"
          onChange={handleChange}
          value={color}
        >
          {colors.map((item: string, i: number) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label className="popup-label">Teams</label>
        <div className="add-teams-section">
          <select
            className="popup-select"
            onChange={(e) => {
              if (e.target.value !== "") {
                setData(e.target.value);
              }
            }}
            value={Data}
          >
            <option value={""} selected>
              Select Team
            </option>
            {teamsData?.techMembers?.map((team: any) => (
              <option
                key={team._id}
                value={`${team._id},${team.name},${team.idInTrello}`}
              >
                {team.name}
              </option>
            ))}
          </select>

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
              <div className="team-name-badge" key={index}>
                <p className="name-of-badge">{el}</p>
                <img
                  src={IMAGES.closeicon}
                  alt="close"
                  width="9px"
                  height="9px"
                  className="pointer"
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
          <button
            className="controllers-cancel"
            onClick={() => {
              handleSetShow("none");
            }}
          >
            Cancel
          </button>
          <button className="controllers-done" onClick={handleSubmit}>
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default EditDepartment;
