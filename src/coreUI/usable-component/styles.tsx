import { makeStyles } from "@material-ui/styles";
import { borderRadius } from "@mui/system";
import { DefaultTheme } from "styled-components";

export const projectsTableStyle = (status: string) => {
  const borderColor = ["#FCEFC0", "#00ACBA33","#E8E8E8"];
  const NotStartedStyle = makeStyles((theme: DefaultTheme) => ({
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
      backgroundColor: borderColor[2],
      fontFamily: "Cairo, Regular",
    },
    tbody: {
      backgroundColor: "#F1F1F4",
    },
    tcellLeft: {
      borderBottom: "2px solid #9FA1AB",
      borderLeft: "2px solid #9FA1AB",
      borderTop: "2px solid #9FA1AB",

      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
    },
    tcellRight: {
      borderBottom: "2px solid #9FA1AB",
      borderRight: "2px solid #9FA1AB",
      borderTop: "2px solid #9FA1AB",
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      fontWeight: 600,
      fontSize: "26px",
      color: "#707683",
    },
    tcellCenter: {
      borderBottom: "2px solid #9FA1AB",
      borderTop: "2px solid #9FA1AB",
      color: "#707683",
    },
    tcellCenterTask: {
      borderBottom: "2px solid #9FA1AB",

      borderTop: "2px solid #9FA1AB",
      color: "#9FA1AB",
      fontWeight: "bold",
    },
  }));
  const inProgressStyle = makeStyles((theme: DefaultTheme) => ({
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
      backgroundColor: borderColor[0],
      fontFamily: "Cairo, Regular",
    },
    tbody: {
      backgroundColor: "#FBF5E2",
    },
    tcellLeft: {
      borderBottom: "1px solid #FFC500",
      borderLeft: "1px solid #FFC500",
      borderTop: "1px solid #FFC500",

      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
    },
    tcellRight: {
      borderBottom: "1px solid #FFC500",
      borderRight: "1px solid #FFC500",
      borderTop: "1px solid #FFC500",
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      fontWeight: 600,
      fontSize: "26px",
      color: "#707683",
    },
    tcellCenter: {
      borderBottom: "1px solid #FFC500",
      borderTop: "1px solid #FFC500",
      color: "#707683",
    },
    tcellCenterTask: {
      borderBottom: "1px solid #FFC500",

      borderTop: "1px solid #FFC500",
      color: "#00ACBA",
      fontWeight: "bold",
    },
  }));
  const DoneStyle = makeStyles((theme: DefaultTheme) => ({
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
      backgroundColor: borderColor[1],
      fontFamily: "Cairo, Regular",
    },
    tbody: {
      backgroundColor: "#E1F3F5",
    },
    tcellLeft: {
      borderBottom: "2px solid #00ACBA",
      borderLeft: "2px solid #00ACBA",
      borderTop: "2px solid #00ACBA",

      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
    },
    tcellRight: {
      borderBottom: "2px solid #00ACBA",
      borderRight: "2px solid #00ACBA",
      borderTop: "2px solid #00ACBA",
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      fontWeight: 600,
      fontSize: "26px",
      color: "#707683",
    },
    tcellCenter: {
      borderBottom: "2px solid #00ACBA",
      borderTop: "2px solid #00ACBA",
      color: "#707683",
    },
    tcellCenterTask: {
      borderBottom: "2px solid #00ACBA",

      borderTop: "2px solid #00ACBA",
      color: "#00ACBA",
      fontWeight: "bold",
    },
  }));
  if (status === "Not Started") return NotStartedStyle;
  if (status === "In progress") return inProgressStyle;
  return DoneStyle;
};

export const popOverStyle = () => {
  return makeStyles({
    root: {
      "& .css-13ywwmo-MuiPaper-root-MuiPopover-paper": {
        borderRadius: "10px",
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
