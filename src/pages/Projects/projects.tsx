import React from "react";
import CreateNewProject from "../../components/popups/CreateNewProject";

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
