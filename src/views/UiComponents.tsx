import { Grid } from "@mui/material";
import TableContainer from "src/coreUI/components/Containers/TableContainer";

type UIComponentsProps = {};

const UIComponents = ({ }: UIComponentsProps) => {
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
          setExpanded={() => { }}
          bgColor="#FFC5001A"
        ></TableContainer>
        {/* Out Titled Container */}
        <Grid xs={10}>
          <TableContainer
            title="Outtitled Table container "
            outTitled={true}
            expanded={false}
            setExpanded={() => { }}
            bgColor="#FFC5001A"
          >
            table content will be here
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UIComponents;
