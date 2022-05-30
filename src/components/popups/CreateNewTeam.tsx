import React, { useEffect } from "react";
import "./popups-style.css";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectAllDepartments,selectDepartmentLoading } from "../../redux/Departments/departments.selectors";
import { useDispatch } from "react-redux";
import { createTeam } from "../../redux/techMember";
import SelectInput2 from "../../coreUI/usable-component/Inputs/SelectInput2";
import { CircularProgress } from "@mui/material";

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
  const depLoading = useAppSelector(selectDepartmentLoading);

  const getDepartmentName = (id: teamData) => {
    const departmentID = id.department.split(",");
    const departmentName = departments.filter((department) => {
      if (departmentID[0] === department._id) {
        return department.name;
      }
    });
    return departmentName[0]?.name;
  };

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
        Add New Teams
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
        <p className="popup-title">Add new teams</p>
        <label className="popup-label-nt">Team name</label>
        <input
          className="popup-input"
          type="text"
          placeholder="EX: Al-shaqran"
          onChange={(e) => {
            setTeam({ ...Team, name: e.target.value });
          }}
          value={Team.name}
          style={{
            marginBottom: "1em",
          }}
        />

        <label className="popup-label-nt">Department</label>
    {/*     <select
          className="popup-select"
          onChange={(e) => {
            setTeam({ ...Team, department: e.target.value });
          }}
          value={Team.department}
          defaultValue=""
          style={{
            marginBottom: "1em",
          }}
        >
          <option value="">Select Department</option>
          {departments?.map((dep: any) => (
            <option key={dep._id} value={`${dep._id},${dep.boardId}`}>
              {dep.name}
            </option>
          ))}
        </select> */}
        <SelectInput2
          handleChange={(e) => {
            setTeam({ ...Team, department: e.target.value });
          }}
          selectText={getDepartmentName(Team)}
          selectValue={getDepartmentName(Team)}
          options={
            departments
              ? departments.map((dep) => {
                  return {
                    id: dep._id,
                    value: `${dep._id},${dep.boardId}`,
                    text: dep.name,
                  };
                })
              : []
          }
        />
        <button
          className="add-team-btn"
          onClick={() => {
            setAllTeam([...AllTeam, Team]);
            setTeam({ name: "", department: "" });
          }}
          disabled={Team.department === "" || Team.name === ""}
          style={{
            background:
              Team.department === "" || Team.name === ""
                ? "#FFC500"
                : "#FFC500",
            marginBottom: "3em",
          }}
        >
          Add
        </button>
        <label style={{ fontWeight: "light", fontSize: "1rem" }}>
          Added Teams
        </label>
        <table className="allTeam-table">
          <tr className="th">
            <th className="normal">Team Name</th>
            <th className="normal">Department Name</th>
            <th></th>
          </tr>
          {AllTeam.map((el, index) => {
            return (
              <tr key={index}>
                <td>{el.name}</td>
                <td>{getDepartmentName(el)}</td>
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
            {depLoading ? (
              <CircularProgress sx={{ color: "white", padding: "10px" }} />
            ) : (
              "Done"
            )}
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default AddNewTeam;
