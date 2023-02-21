import { Grid, Typography } from "@mui/material";
import React from "react";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";

const options = [
  { id: "10", value: "10", text: "10 seconds" },
  { id: "60", value: "60", text: "one minute" },
  { id: "300", value: "300", text: "5 minutes" },
  { id: "1800", value: "1800", text: "30 minutes" },
  { id: "3600", value: "3600", text: "1 hour" },
  { id: "86400", value: "86400", text: "24 hour" },
  { id: "1209600", value: "1209600", text: "14 days" },
  { id: "2592000", value: "2592000", text: "30 days" },
];
const Statistics = (props: any) => {
  const [state, setState] = React.useState({ maxDataAge: "300" });
  const setMaxDataAge = (maxDataAge: string) => {
    setState({ maxDataAge: maxDataAge });
  };

  return (
    <Grid
      container
      overflow={"hidden"}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent="center"
    >
      <Grid
        container
        xs={12}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
          <Typography variant="h2" fontFamily={"Cairo"}>
            Statistics
          </Typography>
        </Grid>
        <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
          <Select
            optionsType="list"
            name=""
            removeAllOption={true}
            selected={state.maxDataAge}
            options={options}
            elementType="filter"
            onSelect={(e: any) => setMaxDataAge(e.target.id)}
          />
        </Grid>
        <iframe
          title="Mongo Charts"
          style={{
            background: "transparent",
            border: "none",
            borderRadius: "2px",
            width: "100%",
            minHeight: "100vh",
            height: "fit-content",
          }}
          src={`https://charts.mongodb.com/charts-project-0-tfstk/embed/dashboards?id=63da3210-4370-40d0-88fc-bdb19c6a8dcf&theme=light&autoRefresh=true&maxDataAge=${parseInt(
            state.maxDataAge
          )}&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed`}
        ></iframe>
      </Grid>
    </Grid>
  );
};

export default Statistics;
