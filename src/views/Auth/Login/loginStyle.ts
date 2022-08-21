import { makeStyles } from "@material-ui/styles";
import { DefaultTheme } from "styled-components";

const style = () => {
  const useStyles = makeStyles((theme: DefaultTheme) => ({
    textField: {
      borderRadius: "5px",
    },
  }));
  return useStyles;
};
export default style;
