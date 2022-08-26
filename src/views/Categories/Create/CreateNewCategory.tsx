import React from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import "../../popups-style.css";
import { useState, useEffect } from "react";
import { CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { selectCatLoading } from "../../../models/Categories/categories.selectores";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { selectAllCategories } from "../../../models/Categories";
import { createCategory } from "../../../models/Categories";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../../models/hooks";
import { generateID } from "../../../helpers/IdGenerator";
import { toast } from "react-toastify";
import Badge from "src/coreUI/components/Badge/Badge";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import Button from "src/coreUI/components/Buttons/Button";

//SX Style objects

const addNewCategoryContainerStyles = {
  py: 1,
  px: 1,
  width: "100%",
  height: 210,
  maxHeight: 350,
  borderRadius: 3,
};

const AddNewCategoryCircularProgressStyles = {
  color: "white",
  height: "25px !important",
  width: "25px !important",
};

const addNewCategoryMainCategoryStyles = {
  height: 50,
  width: "100%",
  borderRadius: "6px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "6px",
  },
};

const addNewCategorySubCatStyles = {
  height: 50,
  width: "100%",
  borderRadius: "6px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "6px",
  },
};

const CreateNewCategory = () => {
  const dispatch = useDispatch();
  const [Show, setShow] = useState("none");
  const [mainCategory, setMainCategory] = useState("");
  const [errors, setErrors] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const loadingCat = useAppSelector(selectCatLoading);
  const theme = useTheme();
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
    if (subCategory.length > 0) {
      if (subCategories.length === 0)
        setsubCategories([{ _id: uuidv4(), subCategory }]);
      // else {
      setsubCategories([...subCategories, { _id: uuidv4(), subCategory }]);
      // }
      setSubCategory("");
    }
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
      /*  const checkNames = allCategories.find(
        (cat) => cat.category === body.category
      );
      if (!checkNames) { */
      if (mainCategory.length !== 0) {
        await dispatch(createCategory({ data: body, dispatch }));
        setShow("none");
        setMainCategory("");
        setSubCategory("");
        setsubCategories([]);
      } else {
        toast.error("Category name cannot be set empty", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: generateID(),
        });
      }

      /*   } else {
        toast.error("Category name already exist", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: generateID(),
        });
      } */
    } catch (error: any) {
      setErrors(error.message);
    }
  };

  return (
    <>
      <Box
        sx={addNewCategoryContainerStyles}
        className="add-new-cat"
        onClick={() => {
          setShow("flex");
        }}
      >
        <img src={IMAGES.plus} alt="add" width={30} height={30} />
        <Typography fontSize={18} color={"#272727"}>
          Create new category
        </Typography>
      </Box>
      <PopUp
        show={Show}
        minWidthSize={MD ? "50vw" : "30vw"}
        maxWidthSize={MD ? "400px" : "320px"}
      >
        <div style={{ marginTop: 10 }}>
          <img
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={() => {
              setShow("none");
              setMainCategory("");
              setSubCategory("");
              setsubCategories([]);
            }}
          />
          <p style={{ color: "red" }}>{errors}</p>
          <p className="popup-title" style={{ marginBottom: 2 }}>
            Add new category
          </p>
        </div>
        <Grid container>
          <Input
            label="Main category"
            placeholder="Ex : Al-Shaqran"
            custom={{
              value: mainCategory, onChangeEvent: onMainChange
            }}
            required
            wrapper
          />
          <Grid
            container
            alignItems="center"
          >
            <Grid item xs={9} lg={9}>
              <Input
                label="Sub Category"
                placeholder="Sub Category"
                custom={{
                  value: subCategory, onChangeEvent: onSubChange
                }}
                wrapper
                required
              />
            </Grid>
            <Grid item xs={3} lg={3} sx={{ paddingLeft: "10px", marginTop: "42px" }}>
              <Button
                type="add"
                size="small"
                label="add"
                onClick={addSubCategory}
                loading={loadingCat}
              />
            </Grid>
          </Grid>
          <div className="subcategories">
            {subCategories &&
              subCategories.map(({ _id, subCategory }: any) => (
                <Badge
                  name={subCategory}
                  index={_id}
                  onChange={() => removeSubCategory(_id)}
                />
              ))}
            <br />
          </div>
          <div className="controllers">
            <Button
              type="main"
              size="large"
              label="done"
              onClick={handleSubmit}
              loading={loadingCat}
            />
          </div>
        </Grid>
      </PopUp>
    </>
  );
};

export default CreateNewCategory;
