import { useDispatch } from "react-redux";
import DeketeWarning from "src/coreUI/components/Containers/Warning/DeleteWarning";
import { useAppSelector } from "../../../models/hooks";
import { deletePM, selectLoading } from "../../../models/Managers";
import { select_Id } from "../../../models/Managers/managers.selectors";
import { toggleDeleteProjectManagerPopup } from "../../../models/Ui";
import { selectDeletePMPopup } from "../../../models/Ui/UI.selectors";

const DeletePM = () => {
  const toggler = useAppSelector(selectDeletePMPopup);
  const _id = useAppSelector(select_Id);
  const loading = useAppSelector(selectLoading);
  const dispatch = useDispatch();

  const onClose = () => dispatch(toggleDeleteProjectManagerPopup("none"));
  return (
    <>
      <DeketeWarning
        show={toggler}
        setShow={onClose}
        message={"Are you sure you want to delete this user?"}
        loading={loading}
        dataTestId="delete-pm-button"
        onClick={() => {
          dispatch(deletePM(_id));
          dispatch(toggleDeleteProjectManagerPopup("none"));
        }}
      />
    </>
  );
};
export default DeletePM;
