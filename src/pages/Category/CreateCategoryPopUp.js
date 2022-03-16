import React, { useState, useEffect, useRef } from "react";
import "./Category.css";
import "./../projectManagers/Pmcard.css";
import axios from "axios";

const CreateCategoryPopUp = (props) => {
  const [mainCategory, setMainCategory] = useState("");
  const [errors, setErrors] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setsubCategories] = useState([]);

  const onMainChange = (e) => {
    setMainCategory(e.target.value);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { category: mainCategory, subCategories: subCategories };

    try {
      const response = await axios.post("/api/createCategory", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (error) {
      setErrors(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="Pm-popup">
      <p style={{ color: "red" }}>{errors}</p>
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
            required
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
