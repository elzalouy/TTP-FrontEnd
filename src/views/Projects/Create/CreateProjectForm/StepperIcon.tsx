import { Check } from "@mui/icons-material";
import { StepIconProps } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";

export const QontoStepIcon: FC<StepIconProps> = ({ active, completed, className,style}) => {
    return (
        <QontoStepIconRoot
            ownerState={{ active, completed: completed }}
            className={className}
            style={style}
        >
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

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