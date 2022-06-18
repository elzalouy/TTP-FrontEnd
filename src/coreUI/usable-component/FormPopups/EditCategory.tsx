import React from "react";
import IMAGES from "../../../assets/img";
import PopUp from "../Popup/PopUp";
import { useState, useEffect } from "react";
import "./popups-style.css";
import { useAppSelector } from "../../../redux/hooks";
import { selectSelectedCategory } from "../../../redux/Categories/categories.selectores";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../../redux/Categories";
import { useMediaQuery, useTheme } from "@mui/material";

type Props = {
  handleSetEditCatDisplay: (value: string) => void;
  editCatDisplay: string;
};

const EditCategory: React.FC<Props> = ({
  handleSetEditCatDisplay,
  editCatDisplay,
}) => {
  const dispatch = useDispatch();
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const [title, setTitle] = useState<string | undefined>("");
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedData, setSelectedData] = useState<any>({
    selectedSubCategory: [],
    subCategoriesId: [],
  });

  useEffect(() => {
    setSelectedData(selectedCategory);
    setTitle(selectedCategory?.category);
  }, [selectedCategory]);

  /*   const [Data, setData] = useState<string>("");
  const [Names, setNames] = useState<string[]>([]); */

  /* 
  const handleAddSubCategory = () => {
    let findIndex = selectedData.selectedSubCategory
      .map((cat: any) => cat.subCategory)
      .indexOf(Data.trim());

    let indexInMainOptions = selectedData.subCategoriesId.find(
      (cat: any) => cat.subCategory === Data
    );
    if (findIndex === -1) {
      setSelectedData({
        ...selectedData,
        selectedSubCategory: [
          ...selectedData.selectedSubCategory,
          indexInMainOptions,
        ],
      });
    }
    return;
  }; */

  const handleRemoveSubCategory = (index: number) => {
    let selectedCategory = selectedData.subCategoriesId;
    selectedCategory = selectedCategory.filter(
      (item: any, i: number) => i !== index
    );
    setSelectedData({
      ...selectedData,
      subCategoriesId: selectedCategory,
    });
  };

  const handleSubmit = async () => {
    const subCatData = {
      subCategoriesId: selectedData.subCategoriesId.map(
        (item: any) => item._id
      ),
      selectedSubCategory: selectedData.selectedSubCategory.map(
        (item: any) => item._id
      ),
      _id: selectedData._id,
      category: title,
    };
    await dispatch(updateCategory(subCatData));
    handleSetEditCatDisplay("none");
  };

  return (
    <>
      <PopUp
        show={editCatDisplay}
        minWidthSize={MD ? "50vw" : "30vw"}
        maxWidthSize={MD ? "50vw" : "30vw"}
      >
        <div>
          <img
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={() => {
              handleSetEditCatDisplay("none");
            }}
          />
        </div>

        <p className="popup-title">Edit category</p>

        <div>
          <label className="popup-label">Main category</label>
          <input
            className="popup-input"
            type="text"
            placeholder="Ex: Ahmed Ali"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="popup-label">Sub-category</label>
          <div>
            <div className="add-teams-section">
              {/*  <select
                className="popup-select"
                onChange={(e) => {
                  setData(e.target.value);
                }}
              >
                <option value="" selected>
                  Select Sub category
                </option> */}
              {/*    {selectedData?.subCategoriesId.map((option: any) => (
                  <option key={option._id} value={option.subCategory}>
                    {option.subCategory}
                  </option>
                ))} */}
              {/* </select> */}

              {/*   <button
                className="orange-btn"
                onClick={() => {
                  handleAddSubCategory();
                }}
                disabled={Data === ""}
                style={{
                  backgroundColor: Data === "" ? "#ccc" : "#ffc500",
                }}
              >
                Add
              </button> */}
            </div>
            <div className="names-container">
              {selectedData?.subCategoriesId.map((el: any, index: any) => {
                return (
                  <div className="team-name-badge" key={el._id}>
                    <p className="name-of-badge">{el.subCategory}</p>
                    <img
                      src={IMAGES.closeicon}
                      alt="close"
                      width="9px"
                      height="9px"
                      className="pointer"
                      onClick={() => {
                        handleRemoveSubCategory(index);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <br />
        <div className="controllers">
        
          <button className="controllers-done" onClick={handleSubmit}>
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default EditCategory;
