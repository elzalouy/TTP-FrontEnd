import React, { useState } from "react";
import PopUp from "../../coreUI/usable-component/popUp";
import IMAGES from "../../assets/img/index";
import "./popups-style.css";
import { useDispatch } from "react-redux";
import { createPM, selectPMs } from "../../redux/PM";
import { useAppSelector } from "../../redux/hooks";

type Props = {};

const AddNewPM: React.FC<Props> = () => {
  const [show, setShow] = useState("none");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailFormat, setEmailFormat] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const PMs = useAppSelector(selectPMs);
  const pattern = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;


  const createNewUser = () => {
    let validate = pattern.test(email);
    if (!validate) {
      setEmailFormat(true);
    } else {
      if (!username || !email) {
        setError(true);
      } else {
        let emailArr = PMs.map((pm) => pm.email);
        let validate = emailArr.find((e) => e === email);
        if (validate) {
          setValidationError(true);
          return;
        }
        dispatch(
          createPM({
            name: username,
            email: email,
            role: "PM",
            type: "user",
          })
        );
        setError(false);
        setShow("none");
        setUsername("");
        setEmail("");
        setEmailFormat(false);
      }
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
              setError(false);
              setUsername("");
              setEmail("");
              setEmailFormat(false);
            }}
          />
        </div>

        <div>
          <p className="popup-title bold">Add new product manager</p>
          {error && (
            <p className="popup-error">Please fill all the empty field</p>
          )}
          {validationError && (
            <p className="popup-error">
              This user already exist , please try a different email
            </p>
          )}
          {emailFormat && (
            <p className="popup-error">Please enter a valid email format</p>
          )}
          <label className="popup-label bold">Project manager name</label>
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
            type="email"
            value={email}
            placeholder="user@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
              setEmailFormat(false);
            }}
          />
        </div>
        <div className="controllers">
          <button
            className="controllers-cancel"
            onClick={() => {
              setShow("none");
              setUsername("");
              setError(false);
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
