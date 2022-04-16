import React from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import "./popups-style.css";
import { useState } from "react";
import { color } from "@mui/system";
import { selectAllMembers } from "../../redux/techMember/techMembers.selectors";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { createDepartment } from "../../redux/Departments";
type Props = {};

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

const CreateNewDepartment: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [Show, setShow] = useState("none");
  const [Data, setData] = useState<string>("");
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
    color: "",
    teams: [],
    mainBoard: false,
    totalInProgress: 0,
    totalDone: 0,
  });
  const { name, color, teams, mainBoard } = formData;
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log({ formData });
    await dispatch(createDepartment(formData));
    setShow("none");
    setFormData({
      name: "",
      color: "",
      teams: [],
      mainBoard: false,
      totalInProgress: 0,
      totalDone: 0,
    });
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
      <PopUp show={Show} minWidthSize="30vw" maxWidthSize="300px">
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

        <label className="popup-label">Department name</label>
        <input
          className="popup-input"
          type="text"
          placeholder="Department name"
          name="name"
          onChange={handleChange}
          value={name}
        />

        <label className="popup-label">Color</label>
        <select className="popup-select" name="color" onChange={handleChange}>
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
            <option value="" selected>
              Select Team
            </option>
            {teamsData?.techMembers?.map((team: any) => (
              <option key={team._id} value={`${team._id},${team.name}`}>
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
          <button
            className="controllers-cancel"
            onClick={() => {
              setShow("none");
            }}
          >
            Cancel
          </button>
          <button className="controllers-done" onClick={() => handleSubmit()}>
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default CreateNewDepartment;
