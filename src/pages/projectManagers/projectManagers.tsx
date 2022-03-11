import React from "react";
import AddNewPM from "./addNewPM";

type Props = {};
const projectManagers: React.FC<Props> = () => {
  return (
    <div>
      <br />
      <h1>PROJECT MANAGERS PAGE</h1>
      <br />
      <AddNewPM />
    </div>
  );
};

export default projectManagers;
