import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import { useAppSelector } from "../../../models/hooks";
import { deletePM, selectLoading } from "../../../models/PM";
import { select_Id } from "../../../models/PM/pm.selectors";
import { toggleDeleteProjectManagerPopup } from "../../../models/Ui";
import { selectDeletePMPopup } from "../../../models/Ui/UI.selectors";

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
              size="large"
              label="cancel"
              onClick={() => dispatch(toggleDeleteProjectManagerPopup("none"))}
            />
            <Button
              type="delete"
              size="large"
              label="delete"
              onClick={() => {
                dispatch(deletePM(_id));
                dispatch(toggleDeleteProjectManagerPopup("none"));
              }}
              loading={loading}
              dataTestId="delete-pm-button"
            />
          </div>
        </div>
      </SmallPopUp>
    </>
  );
};
export default DeletePM;
