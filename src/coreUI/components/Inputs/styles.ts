import { makeStyles } from "@material-ui/styles";
import { NONE } from "apisauce";
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
        "&:active": {
          border: "none !important",
          outline: "none !important"
        },
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
