import { Grid } from "@mui/material";
import React, { FC } from "react";
import Badge from "src/coreUI/components/Badge/FormBadge";
import Button from "src/coreUI/components/Buttons/Button";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import { selectEditDepartment } from "src/models/Departments";
import { useAppSelector } from "src/models/hooks";
import { ITeam } from "src/types/models/Departments";

interface addTeamsProps {
  control: any;
  onChangeNewTeams: any;
  onRemoveOldTeam: any;
  disabled: boolean;
  teams: ITeam[];
  addTeams: string[];
}

const CreateUpdateTeams: FC<addTeamsProps> = ({
  control,
  onChangeNewTeams,
  disabled,
  onRemoveOldTeam,
  teams,
  addTeams,
}) => {
  const selectedDepartment = useAppSelector(selectEditDepartment);

  return (
    <>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={9} lg={9}>
          <ControlledInput
            name="team"
            label={"Teams"}
            placeholder="Team name"
            type="text"
            control={control}
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
            dataTestId="edit-dep-add-team"
            disabled={disabled}
            onClick={() => onChangeNewTeams()}
          />
        </Grid>
      </Grid>
      <div className="names-container">
        {selectedDepartment &&
          teams &&
          teams.map((el, index) => {
            if (el)
              return (
                <Badge
                  name={el.name}
                  key={index}
                  onChange={() => onRemoveOldTeam(el?._id ? el._id : "", index)}
                />
              );
          })}
        {addTeams &&
          addTeams.map((el, index) => {
            if (el)
              return (
                <Badge
                  name={el}
                  key={index}
                  onChange={() => onChangeNewTeams(index)}
                />
              );
          })}
      </div>
      <br />
    </>
  );
};

export default CreateUpdateTeams;
