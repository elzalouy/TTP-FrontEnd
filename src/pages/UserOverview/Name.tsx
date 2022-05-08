import * as React from "react";
import { Typography, Skeleton } from "@mui/material";

interface UserNameProps {
  loading: boolean | null;
  name: string | undefined;
}
const UserName: React.FC<UserNameProps> = (props) => {
  return (
    <>
      <Typography variant="h4" component="h4" fontSize={"24px"} color="#11142D">
        Hi
      </Typography>
      {props?.loading ? (
        <Skeleton
          variant="text"
          width={200}
          height={35}
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
