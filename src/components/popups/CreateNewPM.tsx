import React, { useState } from "react";
import PopUp from "../../coreUI/usable-component/popUp";
import IMAGES from "../../assets/img/index";
import "./popups-style.css";
import { useDispatch } from "react-redux";
import { createPM } from "../../redux/PM";

type Props = {};

const AddNewPM: React.FC<Props> = () => {
  const [show, setShow] = useState("none");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const createNewUser = () => {
    if (!username || !email) {
      setError(true);
    } else {
      setError(false);
      dispatch(
        createPM({
          name: username,
          email: email,
          password: "199988888",
          role: "project manager",
          type: "admin",
          trelloBoardId: "616577753fa7db4ef1e715ea",
          trelloMemberId: "5cd742d89b200d471e827fc8",
        })
      );
    }
  };

  return (
    <>
      <button
        className="black-btn"
        onClick={() => {
          setShow("flex");
        }}
      >
        Create new PM
      </button>
      <PopUp show={show} minWidthSize="30vw">
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

        <div>
          <p className="popup-title">Add new product manager</p>

          {error && (
            <p className="popup-error">Please fill all the empty field</p>
          )}

          <label className="popup-label">Project manager name</label>
          <input
            className="popup-input"
            type="text"
            placeholder="PM name"
            onChange={(e) => {
              setUsername(e.target.value);
              setError(false);
            }}
          />
          <label className="popup-label">Email</label>
          <input
            className="popup-input"
            type="text"
            placeholder="user@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
          />
        </div>

        <div className="controllers">
          <button
            className="controllers-cancel"
            onClick={() => {
              setShow("none");
            }}
          >
            Cancel
          </button>
          <button className="controllers-done" onClick={createNewUser}>
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default AddNewPM;
