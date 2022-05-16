import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { selectClientsNames } from "../../redux/Clients/clients.selectors";
import { useAppSelector } from "../../redux/hooks";
import { getPMs, selectPMs } from "../../redux/PM";
import { createProject } from "../../redux/Projects";
import { useDispatch } from "react-redux";
import { getAllClients } from "../../redux/Clients";
import { Button } from "@mui/material";
import { selectUser } from "../../redux/Auth";
import SelectInput2 from "../../coreUI/usable-component/Inputs/SelectInput2";

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
  const user = useAppSelector(selectUser);
  const PMs = useAppSelector(selectPMs);

  const onsubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let data = watch();
    let project = {
      name: data?.name,
      projectManager: data?.projectManager,
      projectManagerName: PMs.find((item) => item._id === data?.projectManager)
        ?.name,
      projectDeadline: data?.deadline,
      startDate: data?.startDate,
      clientId: data?.clientId,
      numberOfFinishedTasks: 0,
      numberOfTasks: 0,
      projectStatus: "inProgress",
      completedDate: null,
      adminId: user?._id,
    };
    dispatch(createProject({ data: project, setcurrentStep }));
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
              <SelectInput2
                handleChange={props.field.onChange}
                selectText={
                  clients.find((item) => item.clientId === props.field.value)
                    ?.clientName
                }
                selectValue={props.field.value}
                options={
                  clients
                    ? clients?.map((item) => {
                        return {
                          id: item.clientId,
                          value: item.clientId,
                          text: item.clientName,
                        };
                      })
                    : []
                }
              />
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
                className="date-project"
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
              <SelectInput2
                handleChange={props.field.onChange}
                selectText={
                  PMs.find((item) => item._id === props.field.value)?.name
                }
                selectValue={props.field.value}
                options={
                  PMs
                    ? PMs?.map((item) => {
                        return {
                          id: item._id,
                          value: item._id,
                          text: item.name,
                        };
                      })
                    : []
                }
              />
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
                className="date-project"
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
