import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { useAppSelector } from "../../../models/hooks";
import {
  Manager,
  selectLoading,
  selectPMs,
  select_Id,
  updatePM,
} from "../../../models/Managers";
import { toggleEditProjectManagerPopup } from "../../../models/Ui";
import { selectEditPMPopup } from "../../../models/Ui/UI.selectors";

const EditPM: React.FC = () => {
  const toggler = useAppSelector(selectEditPMPopup);
  const _id = useAppSelector(select_Id);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const loading = useAppSelector(selectLoading);
  const [error, setError] = useState<boolean>(false);
  const [emailFormat, setEmailFormat] = useState(false);
  const dispatch = useDispatch();
  const currentPM = useAppSelector(selectPMs);
  const currentData = currentPM.filter((element: Manager) => {
    return element._id === _id;
  });
  const pattern =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  useEffect(() => {
    setUsername(currentData[0]?.name);
    setEmail(currentData[0]?.email);
  }, [toggler]);

  const updateUser = () => {
    if (!username || !email) {
      setError(true);
    } else {
      let validate = pattern.test(email);
      if (!validate) {
        setEmailFormat(true);
      } else {
        dispatch(
          updatePM({
            data: {
              id: _id,
              name: username,
              email: email,
            },
            dispatch,
          })
        );
        setError(false);
        setUsername("");
        setEmail("");
        dispatch(toggleEditProjectManagerPopup("none"));
      }
    }
  };

  return (
    <>
      <PopUp show={toggler} minWidthSize="30vw">
        <div style={{ position: "relative" }}>
          <div
            onClick={() => {
              dispatch(toggleEditProjectManagerPopup("none"));
              setUsername("");
              setError(false);
              setEmail("");
            }}
            className="closeIconContainer"
          >
            <img
              className="closeIcon"
              width="9"
              height="9"
              src={IMAGES.closeicon}
              alt="closeIcon"
            />
          </div>
        </div>
        <p className="popup-title">Edit project manager</p>
        {error && (
          <p className="popup-error">Please fill all the empty field</p>
        )}
        {emailFormat && (
          <p className="popup-error">Please enter a valid email format</p>
        )}
        <div>
          <Input
            label="full name"
            placeholder="full name"
            dataTestId="edit-pm-name"
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
            dataTestId="edit-pm-email"
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
        <br />
        <div className="controllers">
          <Button
            type="main"
            size="large"
            label="done"
            onClick={updateUser}
            loading={loading}
          />
        </div>
      </PopUp>
    </>
  );
};

export default EditPM;
