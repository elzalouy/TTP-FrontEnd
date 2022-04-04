import React, { useState } from "react";
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

import { Client } from './../pages/Clients/clients';

type Props = {

};
interface IProps {
  client: Client
}
const AllPopsPage: React.FC<IProps> = ({ client }) => {
  const [Show, setShow] = useState<string>("none");

  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [updatePopup, setUpdatePopup] = useState<boolean>(false);

  const handleDelete = () => {
    setShow('none');
    setDeletePopup(!false);
  }
  const handleUpdate = () => {
    setShow('none');
    setUpdatePopup(!false);
  }
  const closeDeletePopup = () => {
    setDeletePopup(false);
  }
  const closeUpdatePopup = () => {
    setUpdatePopup(false);
  }
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
        {/* <EditClient /> */}
        <EditClient client={client} show={"flex"} updatePopup={() => closeUpdatePopup()} />
        <EditCategory />.
        <DeleteProject />
        <DeletePM />
        <DeleteDepartment />
        {/* <DeleteClient /> */}
        <DeleteClient id={client._id} show={"flex"} deletePopup={() => closeDeletePopup()} />
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
        {/* <ClientDrop /> */}
        <ClientDrop client={client} />
      </div>
    </div>
  );
};
export default AllPopsPage;
