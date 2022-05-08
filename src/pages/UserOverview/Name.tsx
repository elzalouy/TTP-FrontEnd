import * as React from "react";
import { Typography, Skeleton } from "@mui/material";

interface UserNameProps {
  loading: boolean;
  name: string;
}
const UserName: React.FC<UserNameProps> = (props) => {
  return (
    <>
      <Typography variant="h4" component="h4" textTransform={"capitalize"} fontSize={"24px"} color="#11142D">
        Hi
      </Typography>
      {props?.loading ? (
        <Skeleton
          variant="text"
          width={100}
          height={25}
          sx={{ marginLeft: 1 }}
        />
      ) : (
        <>
          <Typography
            variant="h4"
            component="h4"
            color={"#FFC500"}
            paddingLeft={1}
            fontWeight={"600"}
            textTransform={"capitalize"}
            fontSize={"24px"}
          >
            {props.name},
          </Typography>
        </>
      )}
    </>
  );
};

export default UserName;
