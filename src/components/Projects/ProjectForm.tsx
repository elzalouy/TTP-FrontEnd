import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { selectClientsNames } from "../../redux/Clients/clients.selectors";
import { useAppSelector } from "../../redux/hooks";
import { getPMs, selectPMs } from "../../redux/PM";
import { createProject, Project, ProjectsActions } from "../../redux/Projects";
import { useDispatch } from "react-redux";
import { getAllClients } from "../../redux/Clients";
import { Button } from "@mui/material";

interface ProjectFormProps {
  setcurrentStep: any;
  setShow: any;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  setShow,
  setcurrentStep,
}) => {
  const { register, watch, control } = useForm();
  const dispatch = useDispatch();
  const clients = useAppSelector(selectClientsNames);
  const PMs = useAppSelector(selectPMs);
  console.log(PMs);
  React.useEffect(() => {
    dispatch(getPMs(null));
    dispatch(getAllClients(null));
  }, []);
  const onsubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setcurrentStep(1);
    let data = watch();
    let project = {
      name: data?.name,
      projectManager: data?.projectManager,
      projectManagerName: PMs.find((item) => item._id === data?.projectManager)
        ?.name,
      projectDeadline: data.deadline,
      startDate: data?.startDate,
      clientId: data.clientId,
      numberOfFinshedTasks: 0,
      numberOfTasks: 0,
      projectStatus: "inProgress",
      completedDate: null,
      adminId: "626418935119257872f7cf1c",
    };
    dispatch(createProject(project));
  };
  return (
    <>
      <div className="inputs-grid">
        <div>
          <label className="label-project">Project title</label>
          <br />
          <Controller
            control={control}
            name="name"
            render={(props) => (
              <input
                {...props}
                className="input-project"
                type="text"
                placeholder="Project name"
                onChange={props.field.onChange}
              />
            )}
          />
        </div>
        <div>
          <label className="label-project">Client name</label>
          <br />
          <Controller
            name="clientId"
            control={control}
            render={(props) => (
              <select
                {...props}
                className="select-project"
                onChange={props.field.onChange}
                defaultChecked={true}
              >
                <option value="">Select Client</option>
                {clients && clients.length > 0 ? (
                  clients.map((item) => (
                    <option key={item.clientId} value={item?.clientId}>
                      {item.clientName}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            )}
          />
        </div>
        <div>
          <label className="label-project">Deadline date</label>
          <br />
          <Controller
            name="deadline"
            control={control}
            render={(props) => (
              <input
                {...props}
                className="input-project"
                type="date"
                onChange={props.field.onChange}
              />
            )}
          />
        </div>
        <div>
          <label className="label-project">Project manager</label>
          <br />
          <Controller
            name="projectManager"
            control={control}
            render={(props) => (
              <select
                {...props}
                className="select-project"
                onChange={props.field.onChange}
                defaultChecked={true}
              >
                <option value="">Select Manager</option>

                {PMs && PMs.length > 0 ? (
                  PMs.map((item) => (
                    <option key={item._id} value={item?._id}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            )}
          />
        </div>
        <div>
          <label className="label-project">Start Date</label>
          <br />

          <Controller
            name="startDate"
            control={control}
            render={(props) => (
              <input
                {...props}
                className="input-project"
                type="date"
                onChange={props.field.onChange}
              />
            )}
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
        <Button
          type="button"
          variant="contained"
          className="blackBtn"
          onClick={onsubmit}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default ProjectForm;
