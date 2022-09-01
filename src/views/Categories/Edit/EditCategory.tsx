import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Badge from "src/coreUI/components/Badge/FormBadge";
import Button from "src/coreUI/components/Buttons/Button";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
// import Input from "src/coreUI/components/Inputs/Textfield/Input";
import { v4 as uuidv4 } from "uuid";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { generateID } from "../../../helpers/IdGenerator";
import { updateCategory } from "../../../models/Categories";
import {
  selectCatLoading,
  selectSelectedCategory,
} from "../../../models/Categories/categories.selectores";
import { useAppSelector } from "../../../models/hooks";
import "../../popups-style.css";

type Props = {
  display: string;
  handleSetDisplay: (value: string) => void;
  subCategories?: string[];
};

const EditCategory: React.FC<Props> = ({ display, handleSetDisplay }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
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
      console.log(error.message);
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
          <Grid item xs={12} lg={12}>
            <Input
              label="Main category"
              placeholder="Ex : Al-Shaqran"
              value={title !== undefined ? title : ""}
              type="text"
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid container alignItems={"center"} mt={1}>
            <Grid item xs={9} lg={9}>
              <Input
                label="Sub Category"
                placeholder="Sub Category"
                value={subCategory}
                type="text"
                onChange={onSubChange}
              />
            </Grid>
            <Grid
              item
              xs={3}
              lg={3}
              sx={{ paddingLeft: "10px", marginTop: "32px" }}
            >
              <Button
                type="add"
                size="small"
                label="add"
                onClick={addSubCategory}
                disabled={subCategory.length === 0}
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
      </PopUp>
    </>
  );
};

export default EditCategory;
