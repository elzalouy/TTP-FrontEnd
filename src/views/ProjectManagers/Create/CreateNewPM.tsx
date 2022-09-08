import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import { useAppSelector } from "src/models/hooks";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { createPM, selectLoading } from "../../../models/PM";

const CreateNewPM: React.FC = () => {
  const [show, setShow] = useState("none");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailFormat, setEmailFormat] = useState(false);
  const loading = useAppSelector(selectLoading);
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
      <Button
        type="main"
        size="small"
        label="create new PM"
        dataTestId="create-pm-button"
        onClick={() => setShow("flex")}
        style={{ marginTop: "0px" }}
      />
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
          <Input
            label="full name"
            placeholder="full name"
            dataTestId="create-pm-name"
            value={username}
            type="text"
            onChange={(e: any) => {
              setUsername(e.target.value);
              setError(false);
            }}
          />
          <Input
            label="email"
            placeholder="email address"
            dataTestId="create-pm-email"
            value={email}
            type="text"
            onChange={(e: any) => {
              setEmail(e.target.value);
              setError(false);
              setEmailFormat(false);
            }}
            error={emailFormat ? "true" : ""}
          />
        </div>
        <div className="controllers">
          <Button
            type="main"
            size="large"
            label="done"
            onClick={createNewUser}
            loading={loading}
          />
        </div>
      </PopUp>
    </>
  );
};

export default CreateNewPM;
