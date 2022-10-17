import { Box, Grid, Skeleton, Typography } from "@mui/material";
import * as React from "react";
import IMAGES from "src/assets/img/Images";
import { useAppSelector } from "src/models/hooks";
import { selectLoading } from "src/models/Projects";
import {
  selectSatistics,
  selectStatisticsLoading,
} from "src/models/Statistics";
import { Task } from "src/types/models/Projects";
type props = {
  loadingFor: Task[][] | null;
};
const Empty = ({ loadingFor }: props) => {
  const loading = useAppSelector(selectStatisticsLoading);

  return (
    <>
      {
        <>
          {!loading && loadingFor && loadingFor?.length === 0 && (
            <Box
              textAlign={"center"}
              width="100%"
              marginX={1}
              marginTop={{ lg: 0, md: 6, sm: 6, xs: 6 }}
            >
              <img
                src={IMAGES.OverviewNotificationsEmpty}
                width="170px"
                height={"160px"}
                alt=""
              />
              <Typography fontSize={"16px"} color="#505050" fontWeight={"bold"}>
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
