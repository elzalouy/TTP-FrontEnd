import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import IMAGES from "src/assets/img/Images";
import { useAppSelector } from "src/models/hooks";
import { selectLoading } from "src/models/Projects";
import { selectStatisticsLoading } from "src/models/Statistics";

const Empty = () => {
  const loading = useAppSelector(selectStatisticsLoading);

  return (
    <>
      {loading === false && (
        <Grid
          container
          width="100%"
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
          direction={"row"}
          flexDirection={"row"}
          height={"100%"}
          overflow={"hidden"}
          marginLeft={{ lg: 15 }}
        >
          <Grid item xs={12} sm={12} md={4} lg={4} textAlign={{ lg: "right" }}>
            <Box width={"300px"} height={"300px"} marginLeft={15}>
              <img
                src={IMAGES.OvervieCloseProjectsEmpty}
                width="100%"
                height="100%"
                alt=""
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            paddingBottom={12}
            textAlign={{ lg: "left" }}
          >
            <Typography fontSize={"22px"} fontWeight={"bold"} color="#505050">
              How is the journey so far?
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Empty;
