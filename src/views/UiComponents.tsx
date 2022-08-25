import { Grid } from "@mui/material";
import TableContainer from "src/coreUI/components/Containers/TableContainer";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";

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
            elementType="select"
            name="editProject"
            selected="Selected value"
            options={[{ id: "option1", text: "option 1", value: "option1" }]}
            textTruncate={50}
            onSelect={null}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UIComponents;
