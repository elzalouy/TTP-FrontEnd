import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./NotificationSkeletonItem.css"

const NotificationItemSkeleton = () => {

    const theme = useTheme();
    const SM = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Grid container spacing={3} mb={2}>
            <Grid item container xs={12}>
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
                        background: "#ECECEC",
                        borderRadius: "1em",
                        height: "130px"
                    }}

                >
                    <Grid
                        marginX={{ xs: 0, sm: 0, md: 1, lg: 1 }}
                        mr={{ xs: 0, sm: 0, md: 1, lg: 0 }}
                        item
                        xs={1}

                    >
                        <div className="skeleton-box skeleton-avatar"></div>
                    </Grid>
                    <Grid
                        container
                        xs={10}
                        justifyContent="flex-start"
                        alignItems={"flex-start"}
                        alignContent="flex-start"
                        ml={{ xs: 4, sm: 1, md: 1 }}
                    >
                        <div className="skeleton-box" style={{ width: "80%", height: "10px", background: "#E0E0E0", margin: "5px" }}></div>
                        <div className="skeleton-box" style={{ width: "50%", height: "10px", background: "#E0E0E0", margin: "5px" }}></div>
                        <div className="skeleton-box" style={{ width: "50%", height: "10px", background: "#E0E0E0", margin: "5px" }}></div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NotificationItemSkeleton;
