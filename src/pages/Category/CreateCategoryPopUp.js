import React, { useState, useEffect, useRef } from "react";
import "./Category.css";
import "./../Project managers/Pmcard.css";

const CreateCategoryPopUp = (props) => {
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setsubCategories] = useState([]);
  const onMainChange = (e) => {
    setMainCategory(...mainCategory, e.target.value);
  };
  const onSubChange = (e) => {
    setSubCategory(e.target.value);
  };
  const addSubCategory = (e) => {
    if (subCategories.length === 0) setsubCategories([subCategory]);
    else {
      setsubCategories([...subCategories, subCategory]);
    }
    setSubCategory("");
  };

  const removeSubCategory = (subCategory) => {
    setsubCategories(
      subCategories.filter((element) => element !== subCategory)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="Pm-popup">
      <div className="popup-header">
        <h4>Add new category</h4>
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
      </div>
      <form className="form-inputs">
        <label className="label">Main category</label>
        <div className="f-inputs" style={{ display: "flex" }}>
          <input
            className="input-auth"
            type="text"
            name="mainCategory"
            placeholder="Ex: Al-shaqran"
            value={mainCategory}
            onChange={onMainChange}
          />
        </div>
        <label className="label">Sub-Category</label>

        <div className="f-inputs" style={{ display: "flex" }}>
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
            subCategories.map((subcategory) => (
              <div className="subcategory" key={subcategory}>
                {subcategory}
                <span
                  className="remove-category"
                  onClick={() => {
                    removeSubCategory(subcategory);
                  }}
                >
                  x
                </span>
              </div>
            ))}
        </div>
        <div className="popup-btn">
          <button className="btn-cancel" onClick={props.handleClose}>
            Cancel
          </button>
          <button className="btn-auth" onClick={handleSubmit}>
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryPopUp;
