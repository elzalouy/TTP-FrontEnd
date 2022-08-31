import { Typography } from "@mui/material";
import { Box } from "@mui/system";

type EmptyCaptionProps = {
  length: number;
  img: any;
  caption?: string;
};

const EmptyCaption = (props: EmptyCaptionProps) => {
  return (
    <>
      {props.length === 0 && (
        <>
          <caption>
            <Box
              width={"100%"}
              alignItems="center"
              textAlign={"center"}
              flexDirection="column"
            >
              <img src={props.img} width="215px" height="215px" alt="" />
              <Typography color={"#505050"} fontWeight={"bold"} fontSize="16px">
                {props.caption}
              </Typography>
            </Box>
          </caption>
        </>
      )}
    </>
  );
};

export default EmptyCaption;
