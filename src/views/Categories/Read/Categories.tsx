import React, { useState } from "react";
import "./Category.css";
import CategoryCard from "./CategoryCard";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import CreateNewCategory from "../Create/CreateNewCategory";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../models/hooks";
import { getAllCategories } from "../../../models/Categories";
import { selectAllCategories } from "../../../models/Categories/categories.selectores";
import { categoriesActions } from "../../../models/Categories";
import { selectRole } from "../../../models/Auth";
import EditCategory from "../Edit/EditCategory";

export const Categories = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const role = useAppSelector(selectRole);
  const categoriesData = useAppSelector(selectAllCategories);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const MD = useMediaQuery(theme.breakpoints.down("md"));

  const alternatingColor = [
    ["#0079BF", "#E1EDF6"],
    ["#B04632", "#F3E8E7"],
    ["#D29034", "#F7F0E7"],
    ["#783DBD", "#EFEBF2"],
    ["#00AECC", "#E1F3F7"],
  ];

  const [display, setDisplay] = useState<string>("none");

  const handleSetDisplay = (value: string) => {
    setDisplay(value);
  };

  return (
    <Box className="category-page" sx={{ width: "100%" }}>
      <Box sx={MD ? { paddingTop: "50px" } : { paddingTop: "0px" }}>
        <Typography
          fontSize={24}
          variant="h2"
          style={
            SM
              ? { margin: "40px 0", paddingBottom: "20px" }
              : {
                  margin: "10px 0",
                  paddingBottom: "20px",
                }
          }
        >
          Category
        </Typography>
      </Box>
      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          border: 1,
          borderRadius: "16px",
          borderColor: "#e2e2ea",
          marginTop: 4,
        }}
      >
        {categoriesData?.map((category: any, index: any) => (
          <Grid sm={6} xs={12} md={6} lg={4} padding={2}>
            <CategoryCard
              key={index}
              mainCategory={category.category}
              subCategories={category.subCategoriesId}
              backgroundColor={alternatingColor[index % 5][1]}
              fontColor={alternatingColor[index % 5][0]}
              handleSetDisplay={handleSetDisplay}
              /* handleSetEditCatDisplay={handleSetEditCatDisplay} */
              category={category}
            />
          </Grid>
        ))}
        <Grid sm={6} xs={12} md={4} lg={4} padding={1}>
          {role !== "PM" && <CreateNewCategory />}
        </Grid>
      </Grid>
      {role !== "PM" && (
        <EditCategory
          display={display}
          handleSetDisplay={handleSetDisplay}
        />
      )}
    </Box>
  );
};
