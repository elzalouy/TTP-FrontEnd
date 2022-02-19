import React, { useState } from "react";
import "./Category.css";
import SearchBar from "./SearchBar.js";
import CreateCategoryPopUp from "./CreateCategoryPopUp.js";
import CategoryCard from "./CategoryCard.js";
import CreateNewCategoryCard from "./CreateNewCategoryCard.js";
import Box from "@mui/material/Box";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const Category = () => {
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
    <Box>
      {isOpen ? (
        <CreateCategoryPopUp handleClose={togglePopup} />
      ) : (
        <div className="category-container">
          <h3 className="category-header">Category</h3>
          <SearchBar />

          <Box
            sx={{
              width: "91%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              m: 1,
              py: 1,
              px: 2,
              border: 1,
              borderRadius: "8px",
              borderColor: "#e2e2ea",
            }}
          >
            {categories.map((category, index) => (
              <CategoryCard
                mainCategory={category.mainCategory}
                subCategories={category.subCategories}
                backgroundColor={alternatingColor.at(index % 5).at(1)}
                fontColor={alternatingColor.at(index % 5).at(0)}
              />
            ))}

            <CreateNewCategoryCard popup={togglePopup} />
          </Box>
        </div>
      )}
    </Box>
  );
};
export default Category;
