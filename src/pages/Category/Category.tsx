import React, { useState } from "react";
import "./Category.css";
import CategoryCard from "./CategoryCard";
import { Box, Typography } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SearchBox from "../../components/SearchBox";
import CreateNewCategory from "../../components/popups/CreateNewCategory";

type Props = {};
const Category: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([
    {
      mainCategory: "Main Category 1",
      subCategories: ["sub1", "sub2"],
    },
    {
      mainCategory: "Main Category 2",
      subCategories: ["sub3", "sub4"],
    },
    {
      mainCategory: "Main Category 3",
      subCategories: ["sub5", "sub6"],
    },
    {
      mainCategory: "Main Category 4",
      subCategories: ["sub7", "sub8"],
    },
    {
      mainCategory: "Main Category 5",
      subCategories: ["sub9", "sub10"],
    },
  ]);
  const alternatingColor = [
    ["#0079BF", "#E1EDF6"],
    ["#B04632", "#F3E8E7"],
    ["#D29034", "#F7F0E7"],
    ["#783DBD", "#EFEBF2"],
    ["#00AECC", "#E1F3F7"],
  ];
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <Box>
    //   {isOpen ? (
    //     <CreateCategoryPopUp handleClose={togglePopup} />
    //   ) : (
    <Box className="category-page" sx={{ width: "100%" }}>
      <Box sx={{ paddingTop: '30px' }}>
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
      <div style={{ width: 370 }}>
        <SearchBox></SearchBox>
      </div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          m: 1,
          py: 1,
          border: 1,
          borderRadius: "16px",
          borderColor: "#e2e2ea",
        }} style={{ marginTop: 40 }}
      >
        {categories.map((category, index) => (
          <CategoryCard
            mainCategory={category.mainCategory}
            subCategories={category.subCategories}
            backgroundColor={alternatingColor[(index % 5)][1]}
            fontColor={alternatingColor[(index % 5)][0]}
          />
        ))}
        <CreateNewCategory />
      </Box>
    </Box >

  );
};
export default Category;
