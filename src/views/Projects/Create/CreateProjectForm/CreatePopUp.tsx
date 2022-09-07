import { Check } from "@mui/icons-material";
import {
  Grid,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import IMAGES from "src/assets/img/Images";
import PopUp from "src/coreUI/components/Popovers/Popup/PopUp";
import { useAppSelector } from "src/models/hooks";
import { UiActions } from "src/models/Ui";
import { selectUi } from "src/models/Ui/UI.selectors";
import TaskForm from "../CreateTasksForm/TaskForm";
import Tasks from "../CreateTasksForm/TasksTable";
import ProjectForm from "./ProjectForm";
import "./projectForm.css";

interface NewProjectPopUpProps {
  setShow: (str: string) => void;
}

const NewProjectPopUp: FC<NewProjectPopUpProps> = ({ setShow }) => {
  const steps = ["Project", "Tasks"];
  const dispatch = useDispatch();
  // const newProject = useAppSelector(selectNewProject);
  const { createProjectPopup } = useAppSelector(selectUi);
  const [currentStep, setcurrentStep] = useState(0);
  const [clearErr, setClearErr] = useState<boolean>(false);

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 12,
      left: "calc(-50% + 13px)",
      right: "calc(50% + 13px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#707070",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#707070",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === "dark" ? "#707070" : "#707070",
      borderTopWidth: 0.5,
      borderWidth: 0.5,
      borderRadius: 1,
      opacity: 0.3,
    },
  }));

  const QontoStepIconRoot = styled("div")<{
    ownerState: { active?: boolean; completed?: boolean };
  }>(({ theme, ownerState }) => ({
    color: "transparent",
    backgroundColor: "#F6F6F6",
    borderRadius: "100%",
    display: "flex",
    height: 26,
    width: 26,
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      color: "#00ACBA",
    }),
    ...(ownerState.completed && {
      backgroundColor: "#00ACBA",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "white",
      fontSize: 18,
      backgroundColor: "#00ACBA",
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "100%",
      backgroundColor: ownerState.active ? "#00ACBA" : "",
    },
  }));

  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
    return (
      <QontoStepIconRoot
        ownerState={{ active, completed: completed }}
        className={className}
      >
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  const onClose = () => {
    if (currentStep === 1) {
      dispatch(UiActions.fireNewProjectHook(""));
      setClearErr(false);
    }
    setcurrentStep(0);
    setShow("none");
    setClearErr(true);
  };

  return (
    <PopUp
      show={createProjectPopup}
      maxHeight={currentStep === 0 ? undefined : "calc(100% - 20px)"}
      overFlowY={currentStep === 1 ? "scroll" : undefined}
      margin={"30px"}
      containerClassName="projectForm"
    >
      <Grid container direction="column" className="projectFormHeader" sx={{}}>
        <div style={{ position: "relative", width: "100%" }}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
          >
            <Stepper
              connector={<QontoConnector />}
              className="stepper"
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
          <img
            className="closeIconProject"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={onClose}
          />
        </div>
      </Grid>
      <Grid marginTop={5}>
        {currentStep === 0 && (
          <ProjectForm setcurrentStep={setcurrentStep} setShow={setShow} />
        )}
        {currentStep === 1 && (
          <>
            <TaskForm />
            <Tasks setCurrentStep={setcurrentStep} setShow={setShow} />
          </>
        )}
      </Grid>
    </PopUp>
  );
};

export default NewProjectPopUp;
