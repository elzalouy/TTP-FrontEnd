import { Grid, Typography } from "@mui/material";
import { String } from "cypress/types/lodash";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import IMAGES from "src/assets/img/Images";
import PopUp from "src/coreUI/components/Popovers/Popup/PopUp";
import DateInput from "./DateInput";
import Button from "src/coreUI/components/Buttons/Button";

interface EditDeadlineProps {
  show: "flex" | "none";
  onCloseModel: any;
  handleSubmit: any;
  loading: boolean;
}

const EditDeadline: FC<EditDeadlineProps> = ({
  show,
  onCloseModel,
  handleSubmit,
  loading,
}) => {
  const { control, watch, reset, setValue, register } = useForm({
    defaultValues: { deadline: "" },
  });
  return (
    <PopUp width="30vw" height="40vh" show={show}>
      <Grid
        direction={"row"}
        justifyContent="space-between"
        marginX={1}
        marginBottom={3.5}
      >
        <div style={{ position: "relative" }}>
          <div className="closeIconContainer" onClick={onCloseModel}>
            <img
              className="closeIcon"
              src={IMAGES.closeicon}
              alt="closeIcon"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <Typography variant="h2" fontWeight={"500"} color={"#30bcc7"}>
          Change Deadline
        </Typography>
      </Grid>
      <Grid>
        <form onSubmit={handleSubmit}>
          <div>
            <DateInput
              label={"Deadline date"}
              name="deadline"
              control={control}
              placeholder="Deadline"
              register={register}
              setValue={setValue}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                size="large"
                type="main"
                loading={loading}
                form={{ type: "submit", name: "submit" }}
                label="Done"
                onClick={handleSubmit}
                dataTestId="edit-task-submit"
              />
            </div>
          </div>
        </form>
      </Grid>
    </PopUp>
  );
};

export default EditDeadline;
