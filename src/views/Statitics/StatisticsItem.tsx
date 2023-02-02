import { Grid, Typography } from "@mui/material";
import React from "react";

type StatisticsItemProps = {
  title: string;
  src: string;
  style: React.CSSProperties;
};

export default function StatisticsItem({
  title,
  src,
  style,
}: StatisticsItemProps) {
  return (
    <Grid padding={1} bgcolor={"white"} borderRadius={1}>
      <iframe src={src} title={title} style={style}></iframe>
    </Grid>
  );
}
