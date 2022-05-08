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
type Props = {
  display: string;
  handleSetDisplay: (value: string) => void;
};

const AddSubCategory: React.FC<Props> = ({ display, handleSetDisplay }) => {
  const dispatch = useDispatch();
  const [Show, setShow] = useState("none");
  const [errors, setErrors] = useState("");
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
      <PopUp show={display} minWidthSize="30vw" maxWidthSize="300px">
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

        <p className="popup-title">Add sub-category</p>

        <div>
          <label className="popup-label">Sub-category</label>
          <div style={{ display: "flex" }}>
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
      </PopUp>
    </>
  );
};

export default AddSubCategory;
