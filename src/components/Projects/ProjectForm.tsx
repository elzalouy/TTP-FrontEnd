import * as React from "react";
import { useForm } from "react-hook-form";
import { selectClientsNames } from "../../redux/Clients/clients.selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectPMs } from "../../redux/PM";
import { Project, ProjectsActions } from "../../redux/Projects";

interface ProjectFormProps {
  setcurrentStep: any;
  setShow: any;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  setShow,
  setcurrentStep,
}) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const clients = useAppSelector(selectClientsNames);
  const PMs = useAppSelector(selectPMs);
  const onsubmit = (data: any) => {
    let project: Project = {
      name: data?.name,
      projectManager: data?.projectManager,
      teamsId: [],
      numberOfTasks: 0,
      numberOfFinshedTasks: 0,
      projectDeadline: data.deadline,
      startDate: new Date().toDateString(),
      completedDate: null,
      projectStatus: "",
      clientId: data.clientId,
    };
    dispatch(ProjectsActions.onChangeNewProjectP(project));
    setcurrentStep(1);
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="inputs-grid">
        <div>
          <label className="label-project">Project title</label>
          <br />{" "}
          <input
            className="input-project"
            type="text"
            placeholder="Project name"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <label className="label-project">Client name</label>
          <br />
          <select
            {...register("clientId", { required: true })}
            className="select-project"
          >
            {clients && clients.length > 0 ? (
              clients.map((item) => (
                <option value={item.clientId?.toString()}>
                  {item.clientName}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
        </div>
        <div>
          <label className="label-project">Deadline date</label>
          <br />
          <input
            className="input-project"
            type="date"
            {...register("deadline", { required: true })}
          />
        </div>
        <div>
          <label className="label-project">Project manager</label>
          <br />
          <select
            className="select-project"
            {...register("projectManager", { required: true })}
          >
            {PMs && PMs.length > 0 ? (
              PMs.map((item) => <option value={item._id}>{item.name}</option>)
            ) : (
              <></>
            )}
          </select>
        </div>
        <div>
          <label className="label-project">Description</label>
          <br />
          <textarea
            {...register("description", { required: true })}
            className="textarea-project"
            rows={3}
            placeholder="Write about your project"
          />
        </div>
      </div>
      <div className="controllers">
        <button
          className="cancelBtn"
          onClick={() => {
            setcurrentStep(0);
            setShow("none");
          }}
        >
          Cancel
        </button>
        <input className="blackBtn" type="submit" value="Next" />
      </div>
    </form>
  );
};

export default ProjectForm;
