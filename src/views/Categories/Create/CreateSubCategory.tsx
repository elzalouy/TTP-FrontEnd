import React, { useEffect } from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { useState } from "react";
import "../../popups-style.css";
import { useAppSelector } from "../../../models/hooks";
import {
  selectSelectedCategory,
  selectCatLoading,
} from "../../../models/Categories/categories.selectores";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../../models/Categories";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { generateID } from "../../../helpers/IdGenerator";

type Props = {
  display: string;
  handleSetDisplay: (value: string) => void;
  subCategories?: string[];
};

//SX Style Objects

const createSubCatMainCatStyle = {
  height: 50,
  width: "100%",
  borderRadius: "6px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "6px",
  },
};

const createNewSubCatLoading = {
  color: "white",
  height: "25px !important",
  width: "25px !important",
};

const createNewSubCatInputStyle = {
  paddingRight: "20px",
  flex: 1,
  height: 50,
  width: "100%",
  borderRadius: "6px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "6px",
  },
};

const AddSubCategory: React.FC<Props> = ({ display, handleSetDisplay }) => {
  const dispatch = useDispatch();
  const [Show, setShow] = useState("none");
  const [errors, setErrors] = useState("");
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const loadingCat = useAppSelector(selectCatLoading);
  const [title, setTitle] = useState<string | undefined>("");
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setsubCategories] = useState<
    { _id: string; subCategory: string }[]
  >([]);

  const selectedCategory = useAppSelector(selectSelectedCategory);

  const [selectedData, setSelectedData] = useState<any>({
    selectedSubCategory: [],
    subCategoriesId: [],
  });

  useEffect(() => {
    setSelectedData(selectedCategory);
    setTitle(selectedCategory?.category);
    if (selectedCategory) {
      let subCategoriesData = selectedCategory?.subCategoriesId?.map(
        ({ _id, subCategory }) => {
          return {
            _id: _id,
            subCategory: subCategory,
          };
        }
      );
      if (subCategoriesData) {
        setsubCategories(subCategoriesData);
      }
    }
  }, [selectedCategory]);

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
      newSubCategory: subCategories.map((item: any) => item.subCategory),
      subCategoriesId: selectedData.subCategoriesId.map(
        (item: any) => item._id
      ),
      _id: selectedData._id,
      category: title,
    };
    try {
      if (title?.length !== 0) {
        await dispatch(updateCategory(body));
        setsubCategories([]);
        handleSetDisplay("none");
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
    } catch (error: any) {
      setErrors(error.message);
    }
  };

  return (
    <>
      <PopUp
        show={display}
        minWidthSize={MD ? "50vw" : "30vw"}
        maxWidthSize={MD ? "400px" : "320px"}
      >
        <Grid padding={1} paddingX={2}>
          <Grid justifyContent={"space-between"} direction={"row"}>
            <div>
              <img
                className="closeIcon"
                width="9"
                height="9"
                src={IMAGES.closeicon}
                alt="closeIcon"
                onClick={() => {
                  handleSetDisplay("none");
                }}
              />
            </div>
            <Typography fontWeight={"500"} fontSize={18} color="#00ACBA">
              Manage Category
            </Typography>
          </Grid>
          <div>
            <label className="popup-label">Main Category</label>
            <Grid item xs={12}>
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <TextField
                  type="text"
                  className="text-input"
                  name="mainCategory"
                  placeholder="Ex: Al-shaqran"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                  sx={createSubCatMainCatStyle}
                />
              </div>
            </Grid>
            <label className="popup-label">Sub-Category</label>
            <Grid direction="row" justifyContent="space-between" display="flex">
              <TextField
                type="text"
                name="subCategory"
                className="text-input"
                value={subCategory}
                onChange={onSubChange}
                placeholder="Sub category"
                sx={createNewSubCatInputStyle}
              />
              <div className="add-subcategory" onClick={addSubCategory}>
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
            </div>
          </div>
          <br />
          <div className="controllers">
            <button className="controllers-done" onClick={handleSubmit}>
              {loadingCat ? (
                <CircularProgress sx={createNewSubCatLoading} />
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

export default AddSubCategory;
