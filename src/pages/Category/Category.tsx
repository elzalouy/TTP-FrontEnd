import React, { useState, useEffect } from "react";
import "./Category.css";
import CategoryCard from "./CategoryCard";
import { Box, Grid, Typography } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SearchBox from "../../coreUI/usable-component/Inputs/SearchBox";
import CreateNewCategory from "../../components/popups/CreateNewCategory";
import CreateSubCategory from "../../components/popups/CreateSubCategory";
import EditCategory from "../../components/popups/EditCategory";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { getAllCategories } from "../../redux/Categories";
import { selectAllCategories } from "../../redux/Categories/categories.selectores";
import { categoriesActions } from "../../redux/Categories";
type Props = {};
const Category: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const categoriesData = useAppSelector(selectAllCategories);

  const alternatingColor = [
    ["#0079BF", "#E1EDF6"],
    ["#B04632", "#F3E8E7"],
    ["#D29034", "#F7F0E7"],
    ["#783DBD", "#EFEBF2"],
    ["#00AECC", "#E1F3F7"],
  ];
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
    dispatch(categoriesActions.onSearch(e.target.value));
  };

  const [display, setDisplay] = useState<string>("none");
  const handleSetDisplay = (value: string) => {
    setDisplay(value);
  };

  const [editCatDisplay, setEditCatDisply] = useState<string>("none");
  const handleSetEditCatDisplay = (value: string) => {
    setEditCatDisply(value);
  };

  return (
    <Box className="category-page" sx={{ width: "100%" }}>
      <Box sx={{ paddingTop: "30px" }}>
        <Typography
          variant="h2"
          style={{
            margin: "10px 0",
            paddingBottom: "20px",
          }}
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
        }}
        style={{ marginTop: 40 }}
      >
        {categoriesData?.map((category: any, index: any) => (
          <Grid sm={12} xs={12} md={6} lg={4} padding={1}>
            <CategoryCard
              key={index}
              mainCategory={category.category}
              subCategories={category.selectedSubCategory}
              backgroundColor={alternatingColor[index % 5][1]}
              fontColor={alternatingColor[index % 5][0]}
              handleSetDisplay={handleSetDisplay}
              handleSetEditCatDisplay={handleSetEditCatDisplay}
              category={category}
            />
          </Grid>
        ))}
        <CreateNewCategory />
      </Grid>
      <CreateSubCategory
        display={display}
        handleSetDisplay={handleSetDisplay}
      />
      <EditCategory
        handleSetEditCatDisplay={handleSetEditCatDisplay}
        editCatDisplay={editCatDisplay}
      />
    </Box>
  );
};
export default Category;
