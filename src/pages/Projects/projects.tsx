import React from "react";
import CreateNewProject from "./createNewProject";

type Props = {};
const projects: React.FC<Props> = () => {
  return (
    <div>
      <br />
      <h1>PROJECT PAGE</h1>
      <CreateNewProject />
    </div>
  );
};

export default projects;
