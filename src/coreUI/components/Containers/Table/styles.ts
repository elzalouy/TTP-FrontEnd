import { makeStyles } from "@material-ui/styles";
export const tableContainerStyles = (bgColor: string, outTitled: boolean) =>
  makeStyles((theme: any) => ({
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: "10px",
    },
    body_container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      borderRadius: "12px",
      backgroundColor: bgColor,
      paddingInline: "10px",
      marginBottom: "30px",
      font: "normal normal 600 16px/30px Cairo",
      color: "#505050",
      overflowX: "scroll",
      cursor: "pointer",
    },
  }));
