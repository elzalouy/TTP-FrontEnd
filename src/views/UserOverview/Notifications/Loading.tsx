import { Grid, Skeleton } from "@mui/material";
import { useAppSelector } from "src/models/hooks";
import { selectStatisticsLoading } from "src/models/Statistics";
import { Task } from "src/types/models/Projects";
type props = {
  loadingFor: Task[][] | null;
};
const LoadingFor = ({ loadingFor }: props) => {
  const loading = useAppSelector(selectStatisticsLoading);
  return (
    <>
      {!loadingFor && loading && (
        <Grid container marginLeft={1.8}>
          <Grid item xs={12} marginTop={2.2}>
            <Skeleton
              variant="rectangular"
              width={"40%"}
              height={20}
              sx={{ borderRadius: 1 }}
            />
          </Grid>
          {["", ""].map((item, index) => (
            <Grid item xs={12} key={index}>
              <Skeleton
                variant="rectangular"
                width={"93%"}
                height={55}
                sx={{
                  borderRadius: "12px",
                  marginTop: 1.5,
                  padding: 1.2,
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default LoadingFor;
