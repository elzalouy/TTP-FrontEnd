import { SxProps, Theme } from "@mui/material";

type styleType = { [key: string]: SxProps<Theme> };
export const CreateProjectContainerStyles = (props: any): styleType => {
  return {
    notStartedContainer: {
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "column",
      width: "100%",
      borderRadius: "12px",
      backgroundColor: "#F1F1F4",
      py: 1,
      px: 0,
      mb: props.projects?.length === 0 ? 1 : 4,
      font: "normal normal 600 16px/30px Cairo",
      color: "#505050",
    },
    createProjectBtn: {
      backgroundColor: "#E8E8E8",
      border: "1px solid #9FA1AB",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      py: 1,
      my: 1,
    },
  };
};
