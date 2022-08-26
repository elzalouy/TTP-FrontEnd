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
import Button from "src/coreUI/components/Buttons/Button";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import Badge from "src/coreUI/components/Badge/Badge";

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

const EditCategory: React.FC<Props> = ({ display, handleSetDisplay }) => {
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
        <Grid>
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
          <Input
            label="Main Category"
            placeholder="Ex : Al-Shaqran"
            custom={{
              value: title !== undefined ? title : "",
              onChangeEvent: (e: any) => {
                setTitle(e.target.value);
              }
            }}
            wrapper
            required
          />
          <Grid
            container
            alignItems={"center"}>
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
        </div>
        <br />
        <div className="controllers">
          <Button
            type="main"
            size="large"
            label="done"
            onClick={handleSubmit}
            loading={loadingCat}
          />
        </div>
      </PopUp >
    </>
  );
};

export default EditCategory;
