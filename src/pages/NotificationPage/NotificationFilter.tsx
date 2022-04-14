import Grid from "@mui/material/Grid";
import { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import SelectInput from "../../coreUI/usable-component/Inputs/SelectInput";

type Props = {};
const options: { id: string; value: string; text: string }[] = [
  {
    id: "1",
    value: "option 1",
    text: "Option 1",
  },
  {
    id: "2",
    value: "option 2",
    text: "Option 2",
  },
  {
    id: "3",
    value: "option 3",
    text: "Option 3",
  },
  {
    id: "4",
    value: "option 4",
    text: "Option 4",
  },
  {
    id: "5",
    value: "option 5",
    text: "Option 5",
  },
  {
    id: "6",
    value: "option 6",
    text: "Option 6",
  },
];

const NotificationFilter = (props: Props) => {
  const [filter, setFilter] = useState<{
    clientName: string;
    projectName: string;
  }>({
    clientName: "",
    projectName: "",
  });

  const handleChangeFilter = (e: SelectChangeEvent<string>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Grid container justifyContent={"space-around"}>
      <Grid item xs={4}>
        <SelectInput
          selectText=""
          options={options}
          handleChange={handleChangeFilter}
          selectValue={filter.clientName}
        />
      </Grid>
      <Grid item xs={7}>
        <SelectInput
          options={options}
          handleChange={handleChangeFilter}
          selectValue={filter.projectName}
          selectText={filter.projectName}
        />
      </Grid>
    </Grid>
  );
};

export default NotificationFilter;
