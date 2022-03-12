import React from "react";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const CreateNewCategoryCard = (props) => {
  return (
    <Box
      onClick={props.popup}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        cursor: "pointer",
        mx: 1.7,
        my: 1.7,
        width: 340,
        height: 210,
        maxHeight: 350,
        borderRadius: 3,
        boxShadow: 9,
        backgroundColor: "#EDEDED",
      }}
    >
      <Button
        variant="disabled"
        startIcon={<AddBoxOutlinedIcon />}
        sx={{
          fontWeight: "bold",
          textTransform: "capitalize",
          fontSize: "17px",
          letterSpacing: 0,
        }}
        style={{ color: "#272727" }}
      >
        Create New Category
      </Button>
    </Box>
  );
};
export default CreateNewCategoryCard;
