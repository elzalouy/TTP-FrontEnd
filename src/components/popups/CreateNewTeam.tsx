import React, { useEffect } from "react";
import "./popups-style.css";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectAllDepartments } from "../../redux/Departments/departments.selectors";
import { useDispatch } from "react-redux";
import { createTeam } from "../../redux/techMember";

type Props = {};

interface teamData {
  name: string;
  department: string;
}

const AddNewTeam: React.FC<Props> = () => {
  const [Show, setShow] = useState("none");
  const [Team, setTeam] = useState<teamData>({ name: "", department: "" });
  const [AllTeam, setAllTeam] = useState<teamData[]>([]);
  const dispatch = useDispatch();
  const departments = useAppSelector(selectAllDepartments);
  useEffect(() => {
    setTeam({
      name: "",
      department: "",
    });
    setAllTeam([]);
  }, [Show]);
  const handleAddTeam = async () => {
    for (let i = 0; i < AllTeam.length; i++) {
      let depData = AllTeam[i].department.split(",");
      const data = {
        name: AllTeam[i].name,
        departmentId: depData[0],
        boardId: depData[1],
      };
      if (AllTeam[i]) {
        dispatch(createTeam({ data: data, dispatch }));
      }
    }
    setTeam({ name: "", department: "" });
    setAllTeam([]);
    setShow("none");
  };
  return (
    <>
      <button
        className="black-btn ml-auto"
        onClick={() => {
          setShow("flex");
        }}
      >
        Add new team
      </button>

      <PopUp show={Show} minWidthSize="30vw">
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

        <p className="popup-title">Add new team</p>

        <label className="popup-label">Team name</label>
        <input
          className="popup-input"
          type="text"
          placeholder="EX: Al-shaqran"
          onChange={(e) => {
            setTeam({ ...Team, name: e.target.value });
          }}
          value={Team.name}
        />

        <label className="popup-label">Department</label>
        <select
          className="popup-select"
          onChange={(e) => {
            setTeam({ ...Team, department: e.target.value });
          }}
          value={Team.department}
          defaultValue=""
        >
          <option value="">Select Department</option>
          {departments?.map((dep: any) => (
            <option key={dep._id} value={`${dep._id},${dep.boardId}`}>
              {dep.name}{" "}
            </option>
          ))}
        </select>

        <button
          className="add-team-btn"
          onClick={() => {
            setAllTeam([...AllTeam, Team]);
            setTeam({ name: "", department: "" });
          }}
          disabled={AllTeam.length === 1 || Team.department === ""}
          style={{
            background:
              AllTeam.length === 1 || Team.department === ""
                ? "#ccc"
                : "#ffc500",
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
              <tr key={index}>
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
            className="controllers-cancel"
            onClick={() => {
              setShow("none");
            }}
          >
            Cancel
          </button>
          <button className="controllers-done" onClick={handleAddTeam}>
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default AddNewTeam;
