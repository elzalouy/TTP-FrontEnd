import { makeStyles } from "@material-ui/styles";

export const taskFilesStyles = () => {
  return makeStyles((theme) => ({
    container: {
      width: "100%",
      marginTop: "12px",
      alignItems: "center",
      display: "inline-flex",
    },
    scrollContent: {
      display: "inline-flex",
      width: "100%",
      overflowX: "scroll",
    },
    file: {
      color: "#783dbd !important;",
      fontWeight: 500,
      backgroundColor: "#d6e0ef",
      borderRadius: "5px",
      padding: "3px 3px",
      margin: "0px 0px 0px 15px",
      textDecoration: "none",
      cursor: "pointer",
    },
  }));
};
