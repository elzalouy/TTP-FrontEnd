import React from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../Popup/PopUp";
import "./popups-style.css";
import { useState, useEffect } from "react";
import { CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { selectCatLoading } from "../../../redux/Categories/categories.selectores";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { selectAllCategories } from "../../../redux/Categories";
import { createCategory } from "../../../redux/Categories";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../../redux/hooks";
import { generateID } from "../../../helpers/IdGenerator";
import { toast } from "react-toastify";

type Props = {};

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

const CreateNewCategory: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [Show, setShow] = useState("none");
  const [mainCategory, setMainCategory] = useState("");
  const [errors, setErrors] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const loadingCat = useAppSelector(selectCatLoading);
  const allCategories = useAppSelector(selectAllCategories);
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
      }else{
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
          <Grid item xs={12}>
            <Typography
              fontWeight={"700"}
              fontSize={14}
              paddingTop={4}
              paddingBottom={1}
            >
              Main category
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <TextField
                type="text"
                className="text-input"
                name="mainCategory"
                placeholder="Ex: Al-shaqran"
                value={mainCategory}
                onChange={onMainChange}
                required
                sx={addNewCategoryMainCategoryStyles}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography
              fontWeight={"700"}
              fontSize={14}
              paddingTop={1}
              paddingBottom={1}
              color="black"
            >
              Sub-category
            </Typography>
          </Grid>
          <Grid item xs={9} style={{ marginTop: "10px", paddingRight: "20px" }}>
            <TextField
              type="text"
              name="subCategory"
              value={subCategory}
              className="text-input"
              onChange={onSubChange}
              placeholder="Sub category"
              sx={addNewCategorySubCatStyles}
            />
          </Grid>
          <Grid item xs={3} style={{ marginTop: "10px" }}>
            <div className="add-subcategory-cnc" onClick={addSubCategory}>
              Add
            </div>
          </Grid>
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
                    <CloseIcon style={{ width: "16px", height: "16px" }} />
                  </span>
                </div>
              ))}
            <br />
          </div>
          <div className="controllers">
            <button className="controllers-done" onClick={handleSubmit}>
              {loadingCat ? (
                <CircularProgress sx={AddNewCategoryCircularProgressStyles} />
              ) : (
                "Done"
              )}
            </button>
          </div>
        </Grid>
      </PopUp>
    </>
  );
};

export default CreateNewCategory;
