import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import { useAppSelector } from "../../../models/hooks";
import { selectDeletePMPopup } from "../../../models/Ui/UI.selectors";
import { select_Id } from "../../../models/PM/pm.selectors";
import { useDispatch } from "react-redux";
import { toggleDeleteProjectManagerPopup } from "../../../models/Ui";
import { deletePM, selectLoading } from "../../../models/PM";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import Button from "src/coreUI/components/Buttons/Button";

const DeletePM = () => {

  const toggler = useAppSelector(selectDeletePMPopup);
  const _id = useAppSelector(select_Id);
  const loading = useAppSelector(selectLoading);
  const dispatch = useDispatch();

  return (
    <>
      <SmallPopUp show={toggler}>
        <div className="imageAlert">
          <img src={deleteIcon} />
        </div>
        <p className="warning-text">
          Are you sure you want to delete this project manager?
        </p>
        <div className="margin-cover">
          <div className="controllers-small-popup">
            <Button
              type="cancel"
              size="medium"
              label="cancel"
              onClick={() => dispatch(toggleDeleteProjectManagerPopup("none"))}
            />
            <Button
              type="delete"
              size="medium"
              label="delete"
              onClick={() => {
                dispatch(deletePM(_id));
                dispatch(toggleDeleteProjectManagerPopup("none"));
              }}
              loading={loading}
            />
          </div>
        </div>
      </SmallPopUp>
    </>
  );
};
export default DeletePM;
