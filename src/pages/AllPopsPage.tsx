import React from "react";
import EditTask from "../components/popups/EditTask";
import CreateTask from "../components/popups/CreateTask";
import DeleteProject from "../components/popups/DeleteProject";
import DeletePM from "../components/popups/DeletePM";
import DeleteDepartment from "../components/popups/DeleteDepartment";
import DeleteClient from "../components/popups/DeleteClient";
import EditDepartment from "../components/popups/EditDepartment";
import EditProject from "../components/popups/EditProject";
import EditPM from "../components/popups/EditPM";
import EditClient from "../components/popups/EditClient";
import CreateSubCategory from "../components/popups/CreateSubCategory";
import EditCategory from "../components/popups/EditCategory";

import TaskDrop from "../components/dropdowns/TaskDrop";
import ProjectDrop from "../components/dropdowns/ProjectDrop";
import DepartmentDrop from "../components/dropdowns/DepartmentDrop";
import ClientDrop from "../components/dropdowns/ClientDrop";

type Props = {};

const AllPopsPage: React.FC<Props> = () => {
  return (
    <div style={{ backgroundColor: "#FAFAFB", minHeight: "100vh" }}>
      <br />
      <h1>THIS PAGE JUST FOR TESTING ALL POPUPs AND DROPDOWNS</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        <CreateTask />
        <CreateSubCategory />
        <EditTask />
        <EditDepartment />
        <EditProject />
        <EditPM />
        <EditClient />
        <EditCategory />.
        <DeleteProject />
        <DeletePM />
        <DeleteDepartment />
        <DeleteClient />
        <br />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        <TaskDrop />
        <ProjectDrop />
        <DepartmentDrop />
        <ClientDrop />
      </div>
    </div>
  );
};
export default AllPopsPage;
