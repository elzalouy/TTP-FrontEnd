import { makeStyles } from "@material-ui/styles";

export const attachedFilesStyle = () => {
  return makeStyles((theme) => ({
    attachedFilesBox: {
      marginX: 3,
      marginY: 3,
      maxWidth: "50vw",
      width: "50vw",
      overflowX: "scroll",
      overflowY: "hidden",
      display: "inline-flex",
      flexDirection: "row",
    },
    newfiles: {
      backgroundColor: "#00ACBA",
      width: "40px",
      height: "32px",
      borderRadius: "5px",
      ":hover": {
        backgroundColor: "#00ACBA",
      },
      "& .MuiButton-root": {
        ":hover": {
          backgroundColor: "#00ACBA",
          color: "white",
        },
      },
    },
    newfilesIcon: {
      color: "white",
      fontSize: "12px",
      marginLeft: "5px",
      width: "auto",
    },
    attachedfiles: {
      width: "auto",
      cursor: "pointer",
      height: "35px",
      textAlign: "start",
      alignContent: "center",
      justifySelf: "center",
      justifyContent: "center",
      alignItems: "center",
      display: "inline-flex",
      color: "#92929D",
    },
  }));
};
export const dateInputStyle = () => {
  return makeStyles((theme) => ({
    textField: {
      width: "100%",
      marginTop: "6px !important",
      "& .MuiOutlinedInput-input": {
        height: "13px !important",
        borderRadius: "6px",
        background: "white !important",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "6px",
      },
    },
  }));
};
export const inputStyle = () => {
  return makeStyles((theme) => ({
    input: {
      width: "100%",
      marginTop: "6px !important",
      "& .MuiOutlinedInput-input": {
        height: "13px !important",
        borderRadius: "6px",
        background: "white !important",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "6px",
      },
    },
    multilineInput: {
      width: "100%",
      marginTop: "6px !important",
      "& .MuiOutlinedInput-input": {
        borderRadius: "6px",
        background: "white !important",
      },
    },
  }));
};
