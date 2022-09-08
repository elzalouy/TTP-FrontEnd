import { Box, Typography } from "@mui/material";
import * as React from "react";
import IMAGES from "src/assets/img/Images";
import { useAppSelector } from "src/models/hooks";
import { selectLoading } from "src/models/Projects";
import { selectStatisticsLoading } from "src/models/Statistics";

const Empty = () => {
  const loading = useAppSelector(selectStatisticsLoading);
  const projectsLoading = useAppSelector(selectLoading);

  return (
    <>
      {
        <>
          {(projectsLoading === false || loading === false) && (
            <Box textAlign={"center"} width="100%" marginX={1}>
              <img
                src={IMAGES.OverviewNotificationsEmpty}
                width="170px"
                height={"160px"}
                alt=""
              />
              <Typography fontSize={"16px"} color="#505050">
                Nothing have been moved !!
              </Typography>
            </Box>
          )}
        </>
      }
    </>
  );
};

export default Empty;
