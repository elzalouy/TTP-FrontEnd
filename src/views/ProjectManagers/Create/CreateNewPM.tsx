import React, { useState } from "react";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import IMAGES from "../../../assets/img/Images";
// import "../../popups-style.css";
import { useDispatch } from "react-redux";
import { createPM } from "../../../models/PM";

type Props = {};

const CreateNewPM: React.FC<Props> = () => {
  const [show, setShow] = useState("none");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailFormat, setEmailFormat] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const pattern =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  const createNewUser = () => {
    let validate = pattern.test(email);
    if (!validate) {
      setEmailFormat(true);
    } else {
      if (!username || !email) {
        setError(true);
      } else {
        dispatch(
          createPM({
            data: {
              name: username,
              email: email,
              role: "PM",
              type: "user",
            },
            dispatch,
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
        data-test-id="create-pm-button"
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
          <p className="popup-title">Add new Project Manager</p>
          {error && (
            <p className="popup-error">Please fill all the empty field</p>
          )}
          {emailFormat && (
            <p className="popup-error">Please enter a valid email format</p>
          )}
          <label className="popup-label">Project manager name</label>
          <input
            className="popup-input"
            type="text"
            value={username}
            data-test-id="pm-name"
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
            data-test-id="pm-email"
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
          <button className="controllers-done" data-test-id="submit-pm" onClick={createNewUser}>
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default CreateNewPM;
