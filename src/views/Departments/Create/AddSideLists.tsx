import { Grid } from "@mui/material";
import React, { FC } from "react";
import Button from "src/coreUI/components/Buttons/Button";
import Badge from "src/coreUI/components/Badge/FormBadge";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";

interface AddlistsProps {
  onChangeLists: any;
  lists: any[];
  disabled: boolean;
  control: any;
}

const AddLists: FC<AddlistsProps> = ({
  onChangeLists,
  disabled,
  lists,
  control,
}) => {
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={9} lg={9}>
          <ControlledInput
            name="list"
            label={"Main Lists"}
            placeholder="List name"
            type="text"
            control={control}
            dataTestId="create-dep-listName"
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
            dataTestId="create-dep-add-list"
            disabled={disabled}
            onClick={() => (disabled === false ? onChangeLists() : null)}
          />
        </Grid>
      </Grid>
      <div className="names-container">
        {lists.map((el, index) => {
          return (
            <Badge
              name={el.name}
              key={index}
              onChange={() => onChangeLists(index)}
            />
          );
        })}
      </div>
    </>
  );
};

export default AddLists;
