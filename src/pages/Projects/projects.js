import React from "react";
import Sidebar from "../../layout/partials/Sidebar";
import CreateNewProject from "./createNewProject";

export default function projects() {
  return (
    <>
    <div style={{backgroundColor: "#FAFAFB", flexGrow: 1}}>
      <h1>PROJECT PAGE</h1>
      

      <CreateNewProject />
    </div>
    </>
  );
}
