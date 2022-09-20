import React from "react";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
// import "../../popups-style.css";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import { deleteClient, selectEditClient } from "../../../models/Clients";
import { useAppSelector } from "../../../models/hooks";

type Props = {
  show: string;
  setShow: (val: string) => void;
};

const DeleteClient: React.FC<Props> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const editClient = useAppSelector(selectEditClient);

  const handleDelete = async () => {
    try {
      dispatch(deleteClient({ id: editClient._id }));
      setShow("none");
    } catch (e) {}
  };

  const handleClose = () => {
    setShow("none");
  };

  return (
    <>
      <SmallPopUp show={show}>
        <div className="imageAlert">
          <img src={deleteIcon} />
        </div>
        <p className="warning-text">
          Are you sure you want to delete this client?
        </p>
        <div className="margin-cover">
          <div className="controllers-small-popup">
            <Button
              type="cancel"
              size="large"
              label="cancel"
              onClick={handleClose}
            />
            <Button
              type="delete"
              size="large"
              label="delete"
              dataTestId="delete-client-button-confirm"
              onClick={() => {
                handleDelete();
              }}
            />
          </div>
        </div>
      </SmallPopUp>
    </>
  );
};
export default DeleteClient;
