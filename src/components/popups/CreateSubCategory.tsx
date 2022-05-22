import React, { useEffect } from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
import "./popups-style.css";
import { useAppSelector } from "../../redux/hooks";
import { selectSelectedCategory } from "../../redux/Categories/categories.selectores";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../redux/Categories";
import { v4 as uuidv4 } from "uuid";
import { useMediaQuery,useTheme } from "@mui/material";
import { Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
type Props = {
  display: string;
  handleSetDisplay: (value: string) => void;
};

const AddSubCategory: React.FC<Props> = ({ display, handleSetDisplay }) => {
  const dispatch = useDispatch();
  const [Show, setShow] = useState("none");
  const [errors, setErrors] = useState("");
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
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
  }, [selectedCategory]);

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
      newSubCategory: subCategories.map((item: any) => item.subCategory),
      subCategoriesId: selectedData.subCategoriesId.map(
        (item: any) => item._id
      ),
      _id: selectedData._id,
    };
    try {
      await dispatch(updateCategory(body));
      setsubCategories([]);
      handleSetDisplay("none");
    } catch (error: any) {
      setErrors(error.message);
      console.log(error.message);
    }
  };
  return (
    <>
       <PopUp show={display} minWidthSize={MD ? "50vw" : "30vw"} maxWidthSize={MD ? "400px" : "320px"}>
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
            <Typography
              fontWeight={"500"}
              fontSize={18}
              paddingTop={1}
              color="#00ACBA"
            >
              Add sub-category
            </Typography>
          </Grid>
          <div>
            <Typography
              fontWeight={"700"}
              fontSize={16}
              paddingTop={2}
              paddingBottom={1}
              color="black"
            >
              Sub-category
            </Typography>
            <Grid direction="row" justifyContent="space-between" display="flex">
              <TextField
                type="text"
                name="subCategory"
                value={subCategory}
                onChange={onSubChange}
                placeholder="Sub category"
                sx={{
                  paddingRight:"10px",
                  flex:1,
                  height: 50,
                  width: 210,
                  borderRadius: "6px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "6px",
                  },
                }}
              />
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
                      <CloseIcon style={{width:"16px" , height:"16px"}}/>
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <br />
          <div className="controllers">
            <button
              className="controllers-cancel"
              onClick={() => {
                handleSetDisplay("none");
              }}
            >
              Cancel
            </button>
            <button className="controllers-done" onClick={handleSubmit}>
              Done
            </button>
          </div>
        </Grid>
      </PopUp>
    </>
  );
};

export default AddSubCategory;
