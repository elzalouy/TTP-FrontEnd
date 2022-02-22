import React, { useState, useRef } from "react";
import "./Pmcard.css";
import Box from "@mui/material/Box";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const CreatePmPopUp = (props) => {
  const [pm, setPm] = useState({
    img: "",
    pmName: "",
    email: "",
    trello: "",
  });

  const fileInput = useRef();
  const onChange = (e) => {
    setPm({ ...pm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const onClick = () => {
    fileInput.current.click();
  };

  return (
    <div className="Pm-popup">
      <div className="popup-header">
        <h4>Add new project manager</h4>
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
      </div>
      <form className="form-inputs">
        <Box
          alignItems="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            border: 0.2,
            borderStyle: "dashed",
            borderColor: "#b4b6c4",
            cursor: "pointer",
            borderRadius: 1,
            mb: 2,
          }}
          onClick={onClick}
        >
          <AddBoxOutlinedIcon
              
            sx={{
              color: "#b4b6c4",
            }}
          ></AddBoxOutlinedIcon>
          <input
            type="file"
            ref={fileInput}
            name="img"
            id="file-upload"
            onChange={onChange}
            hidden
          />
        </Box>
        <p className="file-name">{pm.img}</p>
        <label className="label">Project manager name</label>
        <div className="f-inputs">
          <input
            className="input-auth"
            type="text"
            name="pmName"
            placeholder="PM name"
            value={pm.pmName}
            onChange={onChange}
          />
        </div>
        <label className="label">Email</label>
        <div className="f-inputs">
          <input
            className="input-auth"
            type="email"
            name="email"
            value={pm.email}
            placeholder="user@example.com"
            onChange={onChange}
          />
        </div>
        <label className="label">Trello username</label>
        <div className="f-inputs">
          <input
            className="input-auth"
            type="text"
            name="trello"
            placeholder="Trello username"
            value={pm.trello}
            onChange={onChange}
          />
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

export default CreatePmPopUp;
