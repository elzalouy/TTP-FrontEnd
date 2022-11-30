import React from "react";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
// import "../../popups-style.css";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import {
  deleteClient,
  selectAllClients,
  selectClientsState,
  selectEditClient,
} from "../../../models/Clients";
import { useAppSelector } from "../../../models/hooks";
import DeketeWarning from "src/coreUI/components/Containers/Warning/DeleteWarning";

type Props = {
  show: string;
  setShow: (val: string) => void;
};

const DeleteClient: React.FC<Props> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const editClient = useAppSelector(selectEditClient);
  const clientsState = useAppSelector(selectClientsState);

  const handleDelete = async () => {
    try {
      dispatch(deleteClient({ id: editClient._id }));
      setShow("none");
    } catch (e) {}
  };

  return (
    <>
      <DeketeWarning
        show={show}
        setShow={setShow}
        message={"Are you sure you want to delete this client?"}
        onClick={handleDelete}
        loading={clientsState.deleteClientLoading}
      />
    </>
  );
};
export default DeleteClient;
