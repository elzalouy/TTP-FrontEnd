import { Grid, Skeleton } from "@mui/material";
import * as React from "react";
import { Task } from "src/types/models/Projects";
type props = { loadingFor: Task[] | null | undefined };
const Loading = ({ loadingFor }: props) => {
  return (
    <>
      {!loadingFor && (
        <caption>
          <Skeleton width="100%" height={50} />
        </caption>
      )}
    </>
  );
};

export default Loading;
