import { makeStyles } from "@material-ui/styles";
import { DefaultTheme } from "styled-components";

const style = (status: string) => {
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
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      borderLeft:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      borderTop:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",

      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
      cursor: "pointer",
    },
    tcellRight: {
      borderBottom:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      borderRight:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      borderTop:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      fontWeight: 600,
      fontSize: "26px",
      color: "#707683",
    },
    tcellCenter: {
      borderBottom:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      borderTop:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      color: "#707683",
      cursor: "pointer",
    },
    tcellCenterTask: {
      borderBottom:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",

      borderTop:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      color: "#00ACBA",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }));
  return useStyles;
};
export default style;
