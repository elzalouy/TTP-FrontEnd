import { makeStyles } from "@material-ui/styles";
import { borderRadius } from "@mui/system";
import { DefaultTheme } from "styled-components";

export const projectsTableStyle = (status: string) => {
  const borderColor = ["#FCEFC0", "#00ACBA33"];
  const useStyles = makeStyles((theme: DefaultTheme) => ({
    root: {
      width: "100%",
      marginTop: 3,
      overflowX: "auto",
    },
    table: {
      borderCollapse: "separate",
      borderSpacing: "0px 10px",
    },
    thead: {
      color: "black",
      backgroundColor:
        status === "In progress" ? borderColor[0] : borderColor[1],
      font: "normal normal normal 14px/35px Cairo",
    },
    tbody: {
      backgroundColor: status === "In progress" ? "#FBF5E2" : "#E1F3F5",
    },
    tcellLeft: {
      borderBottom:
        status === "In progress" ? "1px solid #FFC500" : "2px solid #00ACBA",
      borderLeft:
        status === "In progress" ? "1px solid #FFC500" : "2px solid #00ACBA",
      borderTop:
        status === "In progress" ? "1px solid #FFC500" : "2px solid #00ACBA",

      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
    },
    tcellRight: {
      borderBottom:
        status === "In progress" ? "1px solid #FFC500" : "2px solid #00ACBA",
      borderRight:
        status === "In progress" ? "1px solid #FFC500" : "2px solid #00ACBA",
      borderTop:
        status === "In progress" ? "1px solid #FFC500" : "2px solid #00ACBA",
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      fontWeight: 600,
      fontSize: "26px",
      color: "#707683",
    },
    tcellCenter: {
      borderBottom:
        status === "In progress" ? "1px solid #FFC500" : "2px solid #00ACBA",
      borderTop:
        status === "In progress" ? "1px solid #FFC500" : "2px solid #00ACBA",
      color: "#707683",
    },
    tcellCenterTask: {
      borderBottom:
        status === "In progress" ? "1px solid #FFC500" : "2px solid #00ACBA",

      borderTop:
        status === "In progress" ? "1px solid #FFC500" : "2px solid #00ACBA",
      color: "#00ACBA",
      fontWeight: "bold",
    },
  }));
  return useStyles;
};

export const popOverStyle = () => {
  return makeStyles({
    root: {
      "& .css-13ywwmo-MuiPaper-root-MuiPopover-paper": {
        borderRadius: 0,
      },
    },
  });
};
export const InputStyle = makeStyles({
  root: {
    "& .MuiInputBase-input": {
      height: "12px",
      "& .Mui-focused": {
        borderColor: "red",
        backgroundColor: "red",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
});
export const SelectInputStyle = makeStyles({
  root: {
    borderColor: "transparent !important",
    "& .MuiOutlinedInput-input": {
      borderColor: "transparent !important",
    },
    "& .MuiInputLabel-root": {
      borderColor: "transparent !important",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent !important",
      "&.hover": {
        borderColor: "transparent !important",
      },
    },
    "&:hover .MuiOutlinedInput-input": {
      borderColor: "transparent !important",
    },
    "&:hover .MuiInputLabel-root": {
      color: "red",
      borderColor: "transparent !important",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent !important",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "purple",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "purple",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple",
    },
  },
});
export default { projectsTableStyle, popOverStyle, SelectInputStyle };
