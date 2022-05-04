import {
  Step,
  StepLabel,
  Stepper,
  Grid,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
} from "@mui/material";
import { FC, useState } from "react";
import PopUp from "../../coreUI/usable-component/popUp";
import { useAppSelector } from "../../redux/hooks";
import { selectNewProject } from "../../redux/Projects";
import IMAGES from ".././../assets/img/index";
import TaskForm from "./TaskForm";
import Tasks from "./TasksTable";
import ProjectForm from "./ProjectForm";
import { styled } from "@mui/material/styles";
import { Check } from "@mui/icons-material";

interface NewProjectPopUpProps {
  setShow: (str: string) => void;
}

const NewProjectPopUp: FC<NewProjectPopUpProps> = ({ setShow }) => {
  const steps = ["Project", "Tasks"];
  const newProject = useAppSelector(selectNewProject);
  const [currentStep, setcurrentStep] = useState(0);
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
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
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));
  const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color: theme.palette.mode === "dark" ? "transparent" : "#eaeaf0",
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
        fontSize: 18,
      },
      "& .QontoStepIcon-circle": {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor",
      },
    })
  );
  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  return (
    <PopUp show={newProject?.showPopUp ? newProject.showPopUp : "none"}>
      <div>
        <img
          className="closeIcon"
          width="9"
          height="9"
          src={IMAGES.closeicon}
          alt="closeIcon"
          onClick={() => {
            setcurrentStep(0);
            setShow("none");
          }}
        />
      </div>
      <Grid
        container
        justifyContent={"center"}
        sx={{
          width: "100%",
          marginBottom: 2,
        }}
      >
        <Stepper
          connector={<QontoConnector />}
          style={{ width: "430px" }}
          activeStep={currentStep}
          alternativeLabel
        >
          {steps?.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={QontoStepIcon}
                className="stepActiveLabel"
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
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
