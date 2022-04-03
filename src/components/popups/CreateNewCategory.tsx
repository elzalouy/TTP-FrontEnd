import React from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import "./popups-style.css";
import { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";

type Props = {};

const CreateNewCategory: React.FC<Props> = () => {
    const [Show, setShow] = useState("none");
    const [mainCategory, setMainCategory] = useState("");
    const [errors, setErrors] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [subCategories, setsubCategories] = useState<string[]>([]);

    const onMainChange = (e: any) => {
        setMainCategory(e.target.value);
    };
    const onSubChange = (e: any) => {
        setSubCategory(e.target.value);
    };
    const addSubCategory = (e: any) => {
        if (subCategories.length === 0) setsubCategories([subCategory]);
        else {
            setsubCategories([...subCategories, subCategory]);
        }
        setSubCategory("");
    };

    const removeSubCategory = (subCategory: any) => {
        setsubCategories(
            subCategories.filter((element) => element !== subCategory)
        );
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const body = { category: mainCategory, subCategories: subCategories };

        try {
            const response = await axios.post("/api/createCategory", body, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
        } catch (error: any) {
            setErrors(error.message);
            console.log(error.message);
        }
    };
    return (
        <>
            <Box sx={{
                mx: 1,
                my: 1.7,
                py: 1,
                px: 1,
                width: 370,
                height: 210,
                maxHeight: 350,
                borderRadius: 3,
            }}
                className="add-new-cat"
                onClick={() => {
                    setShow("flex");
                }}
            >

                <img src={IMAGES.plus} alt="add" />
                <p>Create new category</p>
            </Box>
            <PopUp show={Show} minWidthSize="30vw" maxWidthSize="320px">
                <div>
                    <img
                        className="closeIcon"
                        width="9"
                        height="9"
                        src={IMAGES.closeicon}
                        alt="closeIcon"
                        onClick={() => {
                            setShow("none");
                        }}
                    />
                </div>
                <p style={{ color: "red" }}>{errors}</p>

                <p className="popup-title" style={{ marginBottom: 2 }}>Create new category</p>

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
                        <br />

                        <div className="controllers">
                            <button
                                className="controllers-cancel"
                                onClick={() => {
                                    setShow("none");
                                }}
                            >
                                Cancel
                            </button>
                            <button className="controllers-done" onClick={handleSubmit}>
                                Done
                            </button>
                        </div>
                    </div>
                </form>
            </PopUp>
        </>
    );
};

export default CreateNewCategory;
