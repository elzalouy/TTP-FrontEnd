import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "src/models/hooks";
import { selectStatisticsLoading } from "src/models/Statistics";
import * as React from "react";
import { Task } from "src/types/models/Projects";

type EmptyCaptionProps = {
  img: any;
  caption?: string;
  loadingFor: Task[] | null | undefined;
};

const EmptyCaption = ({ img, caption, loadingFor }: EmptyCaptionProps) => {
  return (
    <>
      {loadingFor && loadingFor.length === 0 && (
        <>
          <caption>
            <Box
              width={"100%"}
              alignItems="center"
              textAlign={"center"}
              flexDirection="column"
            >
              <img src={img} width="215px" height="215px" alt="" />
              <Typography color={"#505050"} fontWeight={"bold"} fontSize="16px">
                {caption}
              </Typography>
            </Box>
          </caption>
        </>
      )}
    </>
  );
};

export default EmptyCaption;
