import { Grid } from "@mui/material";
import React, { FC } from "react";
import Button from "src/coreUI/components/Buttons/Button";
import Badge from "src/coreUI/components/Badge/FormBadge";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";

interface AddTeamsProps {
  onChangeTeams: any;
  teams: any[];
  disabled: boolean;
  control: any;
}

const AddTeams: FC<AddTeamsProps> = ({
  onChangeTeams,
  disabled,
  teams,
  control,
}) => {
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={9} lg={9}>
          <ControlledInput
            name="team"
            label={"Teams"}
            placeholder="Team name"
            type="text"
            control={control}
            dataTestId="create-dep-teamName"
          />
        </Grid>
        <Grid
          item
          xs={3}
          lg={3}
          sx={{ paddingLeft: "10px", marginTop: "32px" }}
        >
          <Button
            type="add"
            size="small"
            label="add"
            dataTestId="create-dep-add-team"
            disabled={disabled}
            onClick={() => (disabled === false ? onChangeTeams() : null)}
          />
        </Grid>
      </Grid>
      <div className="names-container">
        {teams.map((el, index) => {
          return (
            <Badge
              name={el.name}
              key={index}
              onChange={() => onChangeTeams(index)}
            />
          );
        })}
      </div>
    </>
  );
};

export default AddTeams;
