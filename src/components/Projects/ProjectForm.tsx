import * as React from "react";
import { useForm } from "react-hook-form";
import { selectClientsNames } from "../../redux/Clients/clients.selectors";
import { useAppSelector } from "../../redux/hooks";
import { selectPMs } from "../../redux/PM";
import { createProject, Project, ProjectsActions } from "../../redux/Projects";
import { useDispatch } from "react-redux";

interface ProjectFormProps {
  setcurrentStep: any;
  setShow: any;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  setShow,
  setcurrentStep,
}) => {
  const { register, watch } = useForm();
  const dispatch = useDispatch();
  const clients = useAppSelector(selectClientsNames);
  const PMs = useAppSelector(selectPMs);
  const onsubmit = () => {
    let data = watch();
    let project: Project = {
      name: data?.name,
      projectManager: data?.projectManager,
      numberOfTasks: 0,
      numberOfFinshedTasks: 0,
      projectDeadline: data.deadline,
      startDate: new Date().toDateString(),
      completedDate: null,
      projectStatus: "inProgress",
      clientId: data.clientId,
    };
    dispatch(createProject(project));
    setcurrentStep(1);
  };
  return (
    <form>
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
                <option key={item.clientId} value={item.clientId?.toString()}>
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
              PMs.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))
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
        <input
          className="blackBtn"
          type="button"
          onClick={() => onsubmit()}
          value="Next"
        />
      </div>
    </form>
  );
};

export default ProjectForm;
