import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useMediaQuery, useTheme } from "@mui/material";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Avatar from "react-avatar";
import { selectUser } from "../../models/Auth";
import { useAppSelector } from "../../models/hooks";

type Props = {
  notifiData: object[];
};

const NotificationItem = ({ notifiData }: Props) => {
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const user = useAppSelector(selectUser);

  const AvatarBasedOnColor = (index: number) => {
    if (index % 2 === 0) {
      return (
        <Avatar
          name={user?.user?.name === undefined ? user?.name : user?.user?.name}
          value="86%"
          size="40"
          round
          color="#FFC500"
          fgColor="black"
          style={{
            marginRight: "10px",
          }}
        />
      );
    } else {
      return (
        <Avatar
          name={user?.user?.name === undefined ? user?.name : user?.user?.name}
          value="86%"
          size="40"
          round
          fgColor="#FFC500"
          color="black"
          style={{
            marginRight: "10px",
          }}
        />
      );
    }
  };

  return (
    <Grid container spacing={3}>
      {notifiData.map((item: any, index) => {
        return (
          <Grid item container xs={12} key={item._id}>
            <Grid
              paddingX={1}
              paddingY={3}
              item
              container
              xs={12}
              sm={12}
              md={6}
              lg={6}
              flexDirection={"column"}
              justifyContent={SM ? "space-between" : "flex-start"}
              sx={{
                background: "#fff",
                borderRadius: "1em",
              }}
            >
              <Grid
                marginX={{ xs: 0, sm: 0, md: 1, lg: 1 }}
                mr={{ xs: 4, sm: 4, md: 1, lg: 0 }}
                item
                xs={1}
              >
                <Badge
                  overlap="circular"
                  badgeContent={
                    <CircleNotificationsIcon
                      fontSize={"inherit"}
                      sx={{
                        fontSize: "17px",
                        color: "#00acba",
                      }}
                    />
                  }
                  invisible={true}
                >
                  {AvatarBasedOnColor(index)}
                </Badge>
              </Grid>
              <Grid
                container
                xs={10}
                justifyContent="flex-start"
                alignItems={"flex-start"}
                alignContent="flex-start"
              >
                <Grid item xs={8}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {item?.title}
                  </Typography>
                </Grid>
                <Grid item xs={4} textAlign="right">
                  <Typography
                    variant="caption"
                    gutterBottom
                    component="div"
                    sx={{
                      color: "#acabab",
                    }}
                  >
                    {moment(item?.createdAt).fromNow(true)}
                  </Typography>
                </Grid>
                {item?.adminUserID?.name && (
                  <Grid item container xs={12} spacing={2}>
                    <Grid item xs={"auto"}>
                      <Typography
                        variant="caption"
                        gutterBottom
                        component="div"
                        sx={{
                          color: "#acabab",
                        }}
                      >
                        {item?.adminUserID?.name}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  sx={{ color: "#403f3f", wordBreak: "break-all" }}
                >
                  {item?.description}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default NotificationItem;
