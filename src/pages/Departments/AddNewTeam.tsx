import React from "react";
import "./AddNewTeam.css";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";

type Props = {};

interface teamData {
  name: string;
  department: string;
}

const AddNewTeam: React.FC<Props> = () => {
  const [Show, setShow] = useState("none");
  const [Team, setTeam] = useState<teamData>({ name: "", department: "" });
  const [AllTeam, setAllTeam] = useState<teamData[]>([]);

  return (
    <>
      <button
        className="add-new-team-btn"
        onClick={() => {
          setShow("flex");
        }}
      >
        Add new team
      </button>

      <PopUp show={Show} widthSize="30vw">
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

        <p className="add-new-team-title">Add new team</p>

        <label className="label-department">Team name</label>
        <input
          className="input-department"
          type="text"
          placeholder="EX: Al-shaqran"
          onChange={(e) => {
            Team.name = e.target.value;
            setTeam({ ...Team });
          }}
          value={Team.name}
        />

        <label className="label-department">Department</label>
        <select
          className="select-department"
          onChange={(e) => {
            Team.department = e.target.value;
            setTeam({ ...Team });
          }}
        >
          <option value="Design">Design </option>
          <option value="1">option 2 </option>
          <option value="2">option 3</option>
        </select>

        <button
          className="add-team-btn"
          onClick={() => {
            setAllTeam([...AllTeam, Team]);
            setTeam({ name: "", department: "" });
          }}
        >
          Add
        </button>

        <table className="allTeam-table">
          <tr>
            <th>Team name</th>
            <th>List ID</th>
            <th></th>
          </tr>
          {AllTeam.map((el, index) => {
            return (
              <tr>
                {/* {console.log(el.name)} */}
                <td>{el.name}</td>
                <td>Ust ID</td>
                <td>
                  <img
                    src={IMAGES.deleteicon}
                    alt="delete"
                    onClick={() => {
                      AllTeam.splice(index, 1);
                      setAllTeam([...AllTeam]);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </table>

        <div className="controllers">
          <button
            className="cancelBtn"
            onClick={() => {
              setShow("none");
            }}
          >
            Cancel
          </button>
          <button className="blackBtn" onClick={() => {}}>
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default AddNewTeam;
