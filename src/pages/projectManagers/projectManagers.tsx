import React from "react";
// import AddNewPM from "./addNewPM";
import CreateNewPM from "../../components/popups/CreateNewPM";

type Props = {};
const projectManagers: React.FC<Props> = () => {
  return (
    <div>
      <br />
      <h1>PROJECT MANAGERS PAGE</h1>
      <br />
      <CreateNewPM />
    </div>
  );
};

export default projectManagers;
