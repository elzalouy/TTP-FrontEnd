import React, { useEffect } from "react";
import "./popups-style.css";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  selectAllDepartments,
  selectDepartmentLoading,
} from "../../redux/Departments/departments.selectors";
import { useDispatch } from "react-redux";
import {
  createTeam,
  getAllMembers,
  getTechMembersByDeptId,
  selectDepartmentMembers,
  TechMemberInterface,
  TechMembersInterface,
} from "../../redux/techMember";
import SelectInput2 from "../../coreUI/usable-component/Inputs/SelectInput2";
import { CircularProgress } from "@mui/material";
import { departmentsActions } from "../../redux/Departments";
import { toast } from "react-toastify";
import DeleteTeam from "./DeleteTeam";

type Props = {};

interface teamData {
  name: string;
  department: string;
}

const AddNewTeam: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const departments = useAppSelector(selectAllDepartments);
  const depLoading = useAppSelector(selectDepartmentLoading);
  const DepBasedTeams = useAppSelector(selectDepartmentMembers);
  const [showDelete, setShowDelete] = useState("none");
  const [Show, setShow] = useState("none");
  const [Team, setTeam] = useState<teamData>({ name: "", department: "" });
  const [AllTeam, setAllTeam] = useState<teamData[]>([]);
  const [removeTeams, setRemoveTeams] = useState<TechMembersInterface[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TechMemberInterface>();

  /*  const onSubmit = () => {
    dispatch(deleteTeam({ data: removeTeams, dispatch }));
  }; */

  const getDepartmentNameById = (id: string) => {
    let departmentName = departments.filter((department) => {
      if (id === department._id) {
        return department.name;
      }
    });
    return departmentName[0]?.name;
  };

/*   const getDepartmentById = (id: string) => {
    let dep = departments.find((department) => {
      if (id === department._id) {
        return department;
      }
    });
    return dep;
  }; */

  const getDepartmentName = (team: teamData) => {
    let departmentID = team.department.split(",");
    let departmentName = departments.filter((department) => {
      if (departmentID[0] === department._id) {
        return department.name;
      }
    });
    return departmentName[0]?.name;
  };

  useEffect(() => {
    let id = Team.department.split(",")[0];
    if (id.length !== 0) {
      dispatch(getTechMembersByDeptId(id));
    }
  }, [Team.department]);

  useEffect(() => {
    setTeam({
      name: "",
      department: "",
    });
    setAllTeam([]);
    dispatch(getAllMembers(null));
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
        Manage Teams
      </button>
      <DeleteTeam
        show={showDelete}
        setShow={setShowDelete}
        team={selectedTeam}
      />
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
        <p className="popup-title">Manage teams</p>
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
        <div className="allTeam-table-container">
          <table className="allTeam-table">
            <tr className="th">
              <th className="normal">Team Name</th>
              <th className="normal">Department Name</th>
              <th></th>
            </tr>
            {DepBasedTeams.map((team, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{team.name}</td>
                    <td>{getDepartmentNameById(team.departmentId)}</td>
                    <td>
                      <img
                        src={IMAGES.deleteicon}
                        alt="delete"
                        onClick={() => {
                          setSelectedTeam(team);
                          setShowDelete("flex");
                        }}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
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
        </div>
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
