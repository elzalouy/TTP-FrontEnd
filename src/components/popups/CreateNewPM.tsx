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
      dispatch(
        createPM({
          name: username,
          email: email,
        })
      );
      setError(false);
      setShow("none");
      setUsername("");
      setEmail("");
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
              setUsername("");
              setEmail("");
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
            value={username}
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
            value={email}
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
              setUsername("");
              setEmail("");
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
