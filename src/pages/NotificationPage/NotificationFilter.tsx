import Grid from "@mui/material/Grid";
import { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import SelectInput from "../../coreUI/usable-component/SelectInput";

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
          options={options}
          handleChange={handleChangeFilter}
          name="clientName"
          selectValue={filter.clientName}
          placeholder="Client name"
          boxStyle={{
            display: "flex",
            justifyContent: "space-between",
          }}
          selectStyle={{
            borderRadius: ".6em",
            borderColor: "#eeeeee",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#eeeeee",
            },
            "&.Mui-focused ": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#eeeeee",
                "&:hover": {
                  borderColor: "#eeeeee",
                },
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={7}>
        <SelectInput
          options={options}
          handleChange={handleChangeFilter}
          name="projectName"
          selectValue={filter.projectName}
          placeholder={
            <>
              <span style={{ color: "#827e7e" }}>Sort by:</span> Project name
            </>
          }
          boxStyle={{
            display: "flex",
            justifyContent: "space-between",
          }}
          selectStyle={{
            borderRadius: ".6em",
            borderColor: "#eeeeee",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#eeeeee",
            },
            "&.Mui-focused ": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#eeeeee",
                "&:hover": {
                  borderColor: "#eeeeee",
                },
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default NotificationFilter;
