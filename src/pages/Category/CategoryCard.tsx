import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "./Category.css";
import { categoriesActions } from "../../redux/Categories";
import { useDispatch } from "react-redux";
type Props = {};
interface IProps {
  backgroundColor: string;
  fontColor: string;
  mainCategory: string;
  subCategories: string[];
  handleSetDisplay: (value: string) => void;
  handleSetEditCatDisplay: (value: string) => void;
  category: any;
}
const CategoryCard: React.FC<IProps> = ({
  backgroundColor,
  fontColor,
  mainCategory,
  subCategories,
  handleSetDisplay,
  handleSetEditCatDisplay,
  category,
}) => {
  const dispatch = useDispatch();
  const handleSetSelect = () => {
    dispatch(categoriesActions.setSelectedCategory(category));
  };
  return (
    <Box
      className="category-card"
      sx={{
        flexWrap: "wrap",
        alignItems: "flex-start",
        mx: 1,
        my: 1.7,
        py: 1,
        px: 1,
        width: 370,
        height: 210,
        maxHeight: 350,
        borderRadius: 3,

        cursor: "pointer",
        backgroundColor: backgroundColor,
      }}
      onClick={handleSetSelect}
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
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            height: "5.5em",
            overflow: "auto",
          }}
        >
          {subCategories &&
            subCategories.map(({ subCategory, _id }: any) => (
              <Typography
                key={_id}
                sx={{
                  textTransform: "capitalize",
                  textAlign: "left",
                  ml: 2,
                  mb: 1,
                  border: 1,
                  px: 0.5,
                  py: 0.2,
                  borderRadius: "4px",
                  borderColor: fontColor,
                  color: "#5C5C5C",
                  fontFamily: "font: normal normal normal 14px/26px Cairo",
                  letterSpacing: "0.1px",
                  fontSize: "15px",
                  height: "fit-content",
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
            sx={{
              color: fontColor,
              mb: 8.5,
              mx: 2,
              fontWeight: "bold",
              textTransform: "capitalize",
              border: 1,
              borderRadius: 1,
              borderColor: fontColor,
              width: "90%",
              mr: 1,
            }}
            onClick={() => handleSetDisplay("flex")}
          >
            <Box
              sx={{
                border: 2,
                textAlign: "center",
                borderRadius: 1.5,
                display: "flex",
                mr: 1,
                fontSize: "15px",
              }}
            >
              <AddOutlinedIcon style={{ fontSize: 19 }}></AddOutlinedIcon>{" "}
            </Box>
            New Sub Category
          </Button>
          <Button
            sx={{
              borderRadius: 1,
              border: 1,
              mb: 8.5,
              mr: 1,
              width: "10%",
              fontWeight: "bold",
              borderColor: fontColor,
              color: fontColor,
            }}
            onClick={() => handleSetEditCatDisplay("flex")}
          >
            <FontAwesomeIcon icon={faPenToSquare} fontSize={"24px"} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default CategoryCard;
