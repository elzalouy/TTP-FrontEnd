import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import * as React from "react";
import { InputStyle } from "../styles";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { styled } from "@material-ui/styles";

interface InputProps {
  value: string;
  type: string;
  placeholder: string;
  onChangeValue: any;
  visible: boolean | undefined;
  setVisible: any;
}
const Input: React.FC<InputProps> = (props) => {
  const styles = InputStyle();
  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#B4B6C4",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B4B6C4",
    },
    "& .MuiOutlinedInput-root": {
      height: 28,
      "& fieldset": {
        borderColor: "#B4B6C4",
        borderRadius: 6,
      },
      "&:hover fieldset": {
        borderColor: "#B4B6C4",
        borderWidth: 1,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#B4B6C4",
        borderWidth: 1,
      },
    },
  });

  return (
    <>
      <CssTextField
        variant="outlined"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChangeValue(e.target.value)}
        sx={{
          width: "100%",
          marginTop: 1,
          bgcolor: "white",
        }}
        required
        type={props.visible === true ? "text" : props.type}
        inputProps={{ style: { height: 10 } }}
        InputProps={{
          style: { height: 40 },
          endAdornment: props.type === "password" && (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
                {props.visible === false ? (
                  <VisibilityOffOutlined
                    onClick={() => props.setVisible(true)}
                    sx={{ fontSize: 16 }}
                  />
                ) : (
                  <VisibilityOutlined
                    sx={{ fontSize: 16 }}
                    onClick={() => props.setVisible(false)}
                  />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
export default Input;
