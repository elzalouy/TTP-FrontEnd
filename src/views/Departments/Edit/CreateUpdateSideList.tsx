import { Grid } from "@mui/material";
import React, { FC } from "react";
import Badge from "src/coreUI/components/Badge/FormBadge";
import Button from "src/coreUI/components/Buttons/Button";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import { selectEditDepartment } from "src/models/Departments";
import { useAppSelector } from "src/models/hooks";
import { IList } from "src/types/models/Departments";

interface CreateUpdateSideListsProps {
  control: any;
  disabled: boolean;
  onChangeNewLists: any;
  onRemoveOldList: any;
  lists: IList[];
  addLists: string[];
}

const CreateUpdateSideLists: FC<CreateUpdateSideListsProps> = ({
  control,
  disabled,
  onChangeNewLists,
  onRemoveOldList,
  lists,
  addLists,
}) => {
  const selectedDepartment = useAppSelector(selectEditDepartment);

  return (
    <>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={9} lg={9}>
          <ControlledInput
            name="list"
            label={"Main Lists"}
            placeholder="List name"
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
            onClick={() => onChangeNewLists()}
          />
        </Grid>
      </Grid>
      <div className="names-container">
        {selectedDepartment &&
          lists &&
          lists.map((el, index) => {
            if (el)
              return (
                <Badge
                  name={el.name}
                  key={index}
                  onChange={() => onRemoveOldList(el._id ?? "", index)}
                />
              );
          })}
        {addLists &&
          addLists.map((el, index) => {
            if (el)
              return (
                <Badge
                  name={el}
                  key={index}
                  onChange={() => onChangeNewLists(index)}
                />
              );
          })}
      </div>
      <br />
    </>
  );
};

export default CreateUpdateSideLists;
