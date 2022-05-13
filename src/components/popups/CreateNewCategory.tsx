import React from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import "./popups-style.css";
import { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/Categories";
import { v4 as uuidv4 } from "uuid";
type Props = {};

const CreateNewCategory: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [Show, setShow] = useState("none");
  const [mainCategory, setMainCategory] = useState("");
  const [errors, setErrors] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const [subCategories, setsubCategories] = useState<
    { _id: string; subCategory: string }[]
  >([]);

  const onMainChange = (e: any) => {
    setMainCategory(e.target.value);
  };
  const onSubChange = (e: any) => {
    setSubCategory(e.target.value);
  };
  const addSubCategory = (e: any) => {
    if (subCategories.length === 0)
      setsubCategories([{ _id: uuidv4(), subCategory }]);
    // else {
    setsubCategories([...subCategories, { _id: uuidv4(), subCategory }]);
    // }
    setSubCategory("");
  };

  const removeSubCategory = (id: any) => {
    setsubCategories(subCategories.filter((element) => element._id !== id));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const body = {
      category: mainCategory,
      subCategories: subCategories.map((item: any) => item.subCategory),
      subCategoriesId: subCategories,
      selectedSubCategory: subCategories,
    };
    try {
      await dispatch(createCategory(body));
      setShow("none");
      setsubCategories([]);
    } catch (error: any) {
      setErrors(error.message);
      console.log(error.message);
    }
  };
  return (
    <>
      <Box
        sx={{
          mx: 1,
          my: 1.7,
          py: 1,
          px: 1,
          width: 370,
          height: 210,
          maxHeight: 350,
          borderRadius: 3,
        }}
        className="add-new-cat"
        onClick={() => {
          setShow("flex");
        }}
      >
        <img src={IMAGES.plus} alt="add" width={30} height={30} />
        <Typography fontSize={16} color={"#272727"}>
          Create new category
        </Typography>
      </Box>
      <PopUp show={Show} minWidthSize={MD ? "50vw" : "30vw"} maxWidthSize={MD ? "400px" : "320px"}>
        <div>
          <img
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={() => {
              setShow("none");
            }}
          />
        </div>
        <p style={{ color: "red" }}>{errors}</p>
        <p className="popup-title" style={{ marginBottom: 2 }}>
          Create new category
        </p>
        <form className="form-inputs" onSubmit={handleSubmit}>
          <label className="label">Main category</label>
          <div style={{ display: "flex" ,marginTop:"10px",marginBottom:"10px"}}>
            <input
              className="input-auth"
              type="text"
              name="mainCategory"
              placeholder="Ex: Al-shaqran"
              value={mainCategory}
              onChange={onMainChange}
              required
            />
          </div>
          <label className="label">Sub-Category</label>
          <div style={{ display: "flex",marginTop:"10px" }}>
            <input
              className="input-auth"
              type="text"
              name="subCategory"
              value={subCategory}
              onChange={onSubChange}
              placeholder="Sub category"
            />
            <div className="add-subcategory" onClick={addSubCategory}>
              Add
            </div>
          </div>
          <div className="subcategories">
            {subCategories &&
              subCategories.map(({ _id, subCategory }: any) => (
                <div className="subcategory" key={_id}>
                  {subCategory}
                  <span
                    className="remove-category"
                    onClick={() => {
                      removeSubCategory(_id);
                    }}
                  >
                    x
                  </span>
                </div>
              ))}
            <br />
            <div className="controllers">
              <button
                className="controllers-cancel"
                onClick={() => {
                  setShow("none");
                }}
              >
                Cancel
              </button>
              <button className="controllers-done">Done</button>
            </div>
          </div>
        </form>
      </PopUp>
    </>
  );
};

export default CreateNewCategory;
