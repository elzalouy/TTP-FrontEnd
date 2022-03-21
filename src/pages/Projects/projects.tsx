import React from "react";
import CreateNewProject from "./newProject";
import IMAGES from "../../assets/img/index";
import "../Departments/departments.css";
import SearchBar from "../Category/SearchBar";
import Box from "@mui/material/Box";
import ProjectCard from "../../components/Projects/ProjectCard";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useAppSelector } from "../../redux/hooks";
import {
  selectDoneProjects,
  selectInprogressProjects,
  selectLateProjects,
  selectLoading,
} from "../../redux/Projects/projects.selectors";
import { selectPMs } from "../../redux/PM";
import { selectAllMembers } from "../../redux/techMember";
import { selectClients } from "../../redux/Clients";
import { useForm } from "react-hook-form";

const Projects: React.FC = () => {
  const loading = useAppSelector(selectLoading);
  const inProgressProjects = useAppSelector(selectInprogressProjects);
  const doneProjects = useAppSelector(selectDoneProjects);
  const lateProjects = useAppSelector(selectLateProjects);
  const PMs = useAppSelector(selectPMs);
  const techMembers = useAppSelector(selectAllMembers);
  const clients = useAppSelector(selectClients);
  const { register, watch } = useForm();
  return (
    <div className="departments-page">
      <h2 className="departments-title">Projects</h2>
      <div
        className="department-tools"
        style={{
          marginTop: "2%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="filter-icon">
          <img src={IMAGES.filtericon} alt="FILTER" />
        </div>
        <div>
          <label style={{ padding: 0 }}>Project manager:</label>
          <select className="select-filter" name="color">
            {PMs &&
              PMs.length > 0 &&
              PMs.map((item) => (
                <option
                  {...register("projectManager")}
                  key={item._id}
                  value={item._id}
                >
                  {item.name}{" "}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label style={{ padding: 0 }}>Client Name:</label>
          <select className="select-filter" name="color">
            {clients?.length > 0 &&
              clients.map((item) => (
                <option
                  key={item._id}
                  {...register("client")}
                  value={item?._id}
                >
                  {item?.clientName}{" "}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label style={{ padding: 0 }}>Status</label>
          <select className="select-filter" name="color">
            <option value="delivered on time">delivered on time</option>
            <option value="delivered before time">delivered before time</option>
            <option value="delivered after time">delivered after time</option>
            <option value="late">late</option>
            <option value="inProgress">inProgress</option>
          </select>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <Box
        sx={{
          mt: 2,
          display: "inherit",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {loading === false ? (
          <>
            <CreateNewProject />
            <ProjectCard status={"In progress"} Projects={inProgressProjects} />
            <ProjectCard status={"Done"} Projects={doneProjects} />
            <ProjectCard status={"Late"} Projects={lateProjects} />
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              borderRadius: "12px",
              backgroundColor: "#F1F1F4",
              p: 1,
              cursor: "pointer",
              font: "normal normal 600 16px/30px Cairo",
              color: "#909090",
            }}
          >
            <RotateRightIcon></RotateRightIcon> Loading More
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Projects;
