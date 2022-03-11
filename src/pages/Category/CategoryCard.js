import React from "react";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const CategoryCard = ({
  backgroundColor,
  fontColor,
  mainCategory,
  subCategories,
}) => {
  return (
    <Box
      sx={{
        flexWrap: "wrap",

        alignItems: "flex-start",
        mx: 1.7,
        my: 1.7,
        width: 340,
        height: 210,
        maxHeight: 350,
        borderRadius: 3,
        boxShadow: 9,
        backgroundColor: backgroundColor,
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          mx: 2,
          mt: 1,
          mb: 0.2,
          fontSize: 21,
          letterSpacing: 0.2,
          textAlign: "left",
          textTransform: "capitalize",
        }}
        style={{ color: fontColor }}
      >
        {mainCategory}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 2,
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {subCategories &&
            subCategories.map((subCategory) => (
              <Typography
                sx={{
                  textTransform: "capitalize",
                  textAlign: "left",
                  ml: 2,
                  mb: 1,
                  border: 1.6,
                  px: 0.2,
                  borderRadius: "4px",
                  borderColor: fontColor,
                }}
                style={{
                  color: "#5C5C5C",
                  fontFamily: "font: normal normal normal 14px/26px Cairo",
                  letterSpacing: "0.1px",
                  fontSize: "15px",
                }}
              >
                {subCategory}
              </Typography>
            ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            startIcon={<AddBoxOutlinedIcon />}
            sx={{
              color: fontColor,
              mb: 8.5,
              fontWeight: "bold",
              textTransform: "capitalize",
              border: 1.7,
              borderColor: fontColor,
              width: "65%",
              mr: 1,
            }}
          >
            New Sub Category
          </Button>
          <Button
            sx={{
              border: 1.9,
              mb: 8.5,
              fontWeight: "bold",
              borderColor: fontColor,
              color: fontColor,
            }}
          >
            <EditOutlinedIcon></EditOutlinedIcon>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default CategoryCard;
