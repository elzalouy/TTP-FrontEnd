import {
  Step,
  StepLabel,
  Stepper,
  Grid,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import PopUp from "../../coreUI/usable-component/popUp";
import { useAppSelector } from "../../redux/hooks";
import { ProjectsActions, selectNewProject } from "../../redux/Projects";
import IMAGES from ".././../assets/img/index";
import TaskForm from "./TaskForm";
import Tasks from "./TasksTable";
import ProjectForm from "./ProjectForm";
import { styled } from "@mui/material/styles";
import { Check } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { UiActions } from "../../redux/Ui";

interface NewProjectPopUpProps {
  setShow: (str: string) => void;
}

const NewProjectPopUp: FC<NewProjectPopUpProps> = ({ setShow }) => {
  const steps = ["Project", "Tasks"];
  const dispatch = useDispatch();
  const newProject = useAppSelector(selectNewProject);
  const [currentStep, setcurrentStep] = useState(0);
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 12px)",
      right: "calc(50% + 12px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#00ACBA",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#00ACBA",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === "dark" ? "#F6F6F6" : "#F6F6F6",
      borderTopWidth: 2,
      borderRadius: 1,
    },
  }));
  const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color: "transparent",
      backgroundColor: "#F6F6F6",
      padding: 8,
      borderRadius: "100%",
      display: "flex",
      height: 25,
      alignItems: "center",
      ...(ownerState.active && {
        color: "#00ACBA",
      }),
      "& .QontoStepIcon-completedIcon": {
        color: "#00ACBA",
        zIndex: 1,
        fontSize: 14,
      },
      "& .QontoStepIcon-circle": {
        width: 8,
        height: 8,
        borderRadius: "100%",
        backgroundColor: "currentColor",
      },
    })
  );
  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" sx={{ width: 10 }} />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  const onClose = () => {
    if (currentStep === 1) {
      dispatch(UiActions.fireNewProjectHook(""));
    }
    setcurrentStep(0);
    setShow("none");
  };
  return (
    <PopUp show={newProject?.showPopUp ? newProject.showPopUp : "none"}>
      <Grid container direction="row">
        <Grid
          item
          xs={8}
          justifyContent={"center"}
          paddingLeft={20}
          marginBottom={5}
        >
          <Stepper
            connector={<QontoConnector />}
            style={{ width: "430px" }}
            activeStep={currentStep}
            alternativeLabel
          >
            {steps?.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>
                  <Typography
                    fontWeight={currentStep === index ? "700" : "500"}
                    sx={{
                      color: currentStep === index ? "#00ACBA" : "#8D8D8D",
                    }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={4} paddingTop={1} paddingRight={0.5}>
          <img
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={onClose}
          />
        </Grid>
      </Grid>
      {currentStep === 0 && (
        <ProjectForm setcurrentStep={setcurrentStep} setShow={setShow} />
      )}
      {currentStep === 1 && (
        <>
          <TaskForm setCurrentStep={setcurrentStep} setShow={setShow} />
          <Tasks />
        </>
      )}
    </PopUp>
  );
};

export default NewProjectPopUp;
