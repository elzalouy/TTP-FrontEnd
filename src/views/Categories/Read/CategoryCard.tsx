import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Button, Grid } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "./Category.css";
import { categoriesActions } from "../../../models/Categories";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { selectRole } from "../../../models/Auth";
import { useAppSelector } from "../../../models/hooks";
import DeleteCategory from "../Delete/DeleteCategory";
import CategoryPopover from "./CategoryPopover";

type Props = {};
interface IProps {
  backgroundColor: string;
  fontColor: string;
  mainCategory: string;
  subCategories: string[];
  handleSetDisplay: (value: string) => void;
  category: any;
}
const CategoryCard: React.FC<IProps> = ({
  backgroundColor,
  fontColor,
  mainCategory,
  subCategories,
  handleSetDisplay,
  category,
}) => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState("none");

  const handleSetSelect = () => {
    dispatch(categoriesActions.setSelectedCategory(category));
  };

  const handleSetShowDelete = (value: string) => {
    dispatch(categoriesActions.setSelectedCategory(category));
    setShowDelete(value);
  };

  const EditBtn = styled(Button)({
    minWidth: "40px",
  });

  const role = useAppSelector(selectRole);

  return (
    <Box
      className="category-card"
      sx={{
        flexWrap: "wrap",
        alignItems: "flex-start",
        paddingTop: 1.5,
        px: 2,
        width: "100%",
        height: 210,
        maxHeight: 350,
        borderRadius: "20px",
        cursor: "pointer",
        backgroundColor: backgroundColor,
        overflow: "hidden",
      }}
    >
      <DeleteCategory
        showDelete={showDelete}
        handleSetShowDelete={handleSetShowDelete}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mb: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            mb: 0.2,
            fontSize: 22,
            letterSpacing: 0.2,
            textAlign: "left",
            textTransform: "capitalize",
          }}
          style={{ color: fontColor }}
        >
          {mainCategory}
        </Typography>
        {role !== "PM" && (
          <CategoryPopover
            color={fontColor}
            handleSetShowDelete={handleSetShowDelete}
            handleSetDisplay={handleSetDisplay}
            handleSetSelect={handleSetSelect}
          />
        )}
      </Box>
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
                  mb: 1,
                  border: 1,
                  px: 1,
                  mr: 1.5,
                  py: 0.5,
                  borderRadius: "4px",
                  borderColor: fontColor,
                  color: "#5C5C5C",
                  fontFamily: "font: normal normal normal 14px/26px Cairo",
                  letterSpacing: "0.1px",
                  fontSize: "14px",
                  height: "fit-content",
                }}
              >
                {subCategory}
              </Typography>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
export default CategoryCard;
