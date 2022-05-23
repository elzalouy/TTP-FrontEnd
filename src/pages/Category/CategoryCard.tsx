import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Button, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "./Category.css";
import { categoriesActions } from "../../redux/Categories";
import { useDispatch } from "react-redux";
import EditIcon from "../../assets/icons/EditIcon";
import { styled } from "@mui/material/styles";
import { selectRole } from "../../redux/Auth";
import { useAppSelector } from "../../redux/hooks";

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
      onClick={handleSetSelect}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          mt: 1,
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
        <Grid
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection="row"
          width="100%"
          container
        >
          <Grid xs={12}>
            {role !== "PM" && (
              <Button
                sx={{
                  color: fontColor,
                  mb: 8.5,
                  width: "100%",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  border: 1,
                  borderRadius: 1,
                  borderColor: fontColor,
                  mr: 1,
                  paddingY:1,
                }}
                onClick={() => handleSetDisplay("flex")}
              >
                <Box
                  sx={{
                    mr: 1,
                    border: 2,
                    textAlign: "center",
                    borderRadius: 1.5,
                    display: "flex",
                    fontSize: "15px",
                    paddingX: 0.45,
                    paddingY: 0.4,
                  }}
                >
                  <AddOutlinedIcon style={{ fontSize: 15 }}></AddOutlinedIcon>
                </Box>
                <Typography fontSize={14} fontWeight={"bold"}>
                  Manage Category
                </Typography>
              </Button>
            )}
          </Grid>
          {/* <Grid xs={2}>
            {role !== "PM" && (
              <EditBtn
                sx={{
                  borderRadius: 1,
                  border: 1,
                  mb: 8.5,
                  borderColor: fontColor,
                  color: fontColor,
                  height: "17%",
                }}
                onClick={() => handleSetEditCatDisplay("flex")}
              >
                <EditIcon width={20} height={20} color={fontColor} />
              </EditBtn>
            )}
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};
export default CategoryCard;
