import { Grid } from "@mui/material";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import TableContainer from "src/coreUI/components/Containers/TableContainer";

type UIComponentsProps = {};

const UIComponents = ({}: UIComponentsProps) => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ padding: 1, backgroundColor: "#FCFCFC" }}
    >
      {/* In Titled table Container */}
      <Grid xs={10}>
        <TableContainer
          title="Intitled Table container "
          outTitled={false}
          expanded={true}
          setExpanded={() => {}}
          bgColor="#FFC5001A"
        ></TableContainer>
        {/* Out Titled Container */}
        <Grid xs={10}>
          <TableContainer
            title="Outtitled Table container "
            outTitled={true}
            expanded={false}
            setExpanded={() => {}}
            bgColor="#FFC5001A"
          >
            table content will be here
          </TableContainer>
        </Grid>
        <Grid xs={3}>
          <Select
            name="test"
            textTruncate={2}
            label={"Project Manager : "}
            options={[
              { id: "1", text: "name", value: "value" },
              { id: "2", text: "name 2 is too long", value: "value 2" },
            ]}
            onSelect={null}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UIComponents;
