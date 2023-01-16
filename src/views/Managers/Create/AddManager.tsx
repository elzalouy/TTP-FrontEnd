import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import { selectUser, selectUserRoles } from "src/models/Auth";
import { useAppSelector } from "src/models/hooks";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { createManager, selectLoading } from "../../../models/Managers";

const AddManager: React.FC = () => {
  const [show, setShow] = useState("none");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("PM");
  const [emailFormat, setEmailFormat] = useState(false);
  const loading = useAppSelector(selectLoading);
  const [error, setError] = useState<boolean>(false);
  const roles = useAppSelector(selectUserRoles);
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
          createManager({
            data: {
              name: username,
              email: email,
              role: role,
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
        label="Add User"
        dataTestId="create-pm-button"
        onClick={() => setShow("flex")}
        style={{ marginTop: "0px" }}
      />
      <PopUp show={show} minWidthSize="30vw">
        <div style={{ position: "relative" }}>
          <div
            className="closeIconContainer"
            onClick={() => {
              setShow("none");
              setError(false);
              setUsername("");
              setEmail("");
              setEmailFormat(false);
            }}
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
        <div>
          <p className="popup-title">Add User</p>
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
          <Box paddingTop={1}>
            <p className="popup-label">User Role</p>
            <Select
              elementType="select"
              name="create-manager-role"
              onSelect={(e: any) => setRole(e.target.id)}
              selected={role}
              options={roles}
              optionsType="list"
            />
          </Box>
        </div>
        <div className="controllers">
          <Button
            type="main"
            size="large"
            label="done"
            onClick={createNewUser}
            loading={loading}
            dataTestId="create-pm-submit"
          />
        </div>
      </PopUp>
    </>
  );
};

export default AddManager;
