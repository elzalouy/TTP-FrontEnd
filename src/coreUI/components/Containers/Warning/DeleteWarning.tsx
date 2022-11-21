import { Grid, Typography } from "@mui/material";
import deleteIcon from "../../../../assets/img/deleteAlert.png";
import Button from "../../Buttons/Button";
import SmallPopUp from "../../Popovers/Popup/SmallPopup";
interface DeleteWarningProps {
  show: string;
  setShow: any;
  onClick: any;
  message: string;
  alert?: string;
  loading?: boolean | null;
  dataTestId?: string;
}

const DeleteWarning = ({
  message,
  alert,
  show,
  setShow,
  onClick,
  loading,
  dataTestId,
}: DeleteWarningProps) => {
  return (
    <>
      <SmallPopUp show={show}>
        <div style={{ paddingTop: "20px" }}>
          <div className="imageAlert">
            <img src={deleteIcon} alt="delete" />
          </div>
          <p className="warning-text">{message}</p>
          <Grid
            lg={12}
            md={12}
            container
            justifyContent={"center"}
            alignItems="center"
          >
            {alert && (
              <Grid item lg={12} md={12}>
                <Typography
                  textAlign={"center"}
                  variant="h5"
                  fontWeight={600}
                  padding={1}
                >
                  {alert}
                </Typography>
              </Grid>
            )}
          </Grid>
          <div className="margin-cover">
            <div className="controllers-small-popup">
              <Button
                type="cancel"
                size="large"
                label="cancel"
                onClick={() => setShow("none")}
              />
              <Button
                type="delete"
                size="large"
                label="delete"
                loading={loading}
                onClick={onClick}
                dataTestId={dataTestId}
              />
            </div>
          </div>
        </div>
      </SmallPopUp>
    </>
  );
};

export default DeleteWarning;
