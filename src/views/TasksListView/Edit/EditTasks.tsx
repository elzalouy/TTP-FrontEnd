import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useDispatch } from "react-redux";
import IMAGES from "src/assets/img/Images";
import Badge from "src/coreUI/components/Badge/FormBadge";
import Button from "src/coreUI/components/Buttons/Button";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import SmallPopUp from "src/coreUI/components/Popovers/Popup/SmallPopup";
import { useAppSelector } from "src/models/hooks";
import { editTasksProjectId, selectAllProjects } from "src/models/Projects";
import { Project, Task } from "src/types/models/Projects";

type props = {
  show: string;
  setShow: any;
  selects: string[];
};

const EditTasks = ({ show, setShow, selects }: props) => {
  const dispatch = useDispatch();
  const { allTasks, projects, loading } = useAppSelector(selectAllProjects);
  const [editTasks, setEditTasks] = React.useState<Task[]>();
  const [projectId, setProjectId] = React.useState<string | undefined>();

  React.useEffect(() => {
    setEditTasks([...allTasks.filter((item) => selects.includes(item._id))]);
  }, [show, selects]);

  React.useEffect(() => {
    if (editTasks?.length === 0) onClose();
  }, [editTasks]);

  const onClose = () => {
    setProjectId(undefined);
    setShow("none");
  };

  const onChange = (id: string) => {
    if (editTasks && editTasks.length > 0)
      setEditTasks([...editTasks?.filter((item) => item._id !== id)]);
  };
  const onSelect = (e: any) => {
    setProjectId(e.target.id);
  };
  const onSubmit = () => {
    let ids = editTasks?.map((item) => {
      return item._id;
    });
    if (projectId) {
      dispatch(editTasksProjectId({ ids, projectId, closeModal: onClose }));
    }
  };

  return (
    <SmallPopUp show={show} widthSize="300px">
      <Grid width={"100%"} paddingX={2} marginY={1} container>
        <Grid
          item
          xs={12}
          display={"inline-flex"}
          justifyContent={"space-between"}
        >
          <Typography className="popup-title" marginTop={0.5}>
            Edit Tasks
          </Typography>
          <Box padding={1}>
            <img
              style={{ cursor: "pointer" }}
              width="9"
              height="9"
              src={IMAGES.closeicon}
              alt="closeIcon"
              onClick={onClose}
            />
          </Box>
        </Grid>
        <Grid item width="100%" display={"inline-flex"}>
          <Grid container width={"100%"}>
            {editTasks &&
              editTasks.map((item) => (
                <Badge
                  key={item._id}
                  name={item.name}
                  onChange={() => onChange(item._id)}
                />
              ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <label className="label-project">Project</label>
          <Select
            onSelect={onSelect}
            selected={projectId}
            elementType={"select"}
            name="projectId"
            options={
              projects
                ? [
                    ...projects.map((item) => ({
                      text: item.name,
                      value: item._id,
                      id: item._id,
                    })),
                  ]
                : []
            }
            label={"Select"}
            message={"No projects found"}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={onSubmit}
            type="main"
            size="large"
            label="Save"
            loading={loading}
            style={{
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </SmallPopUp>
  );
};

export default EditTasks;
