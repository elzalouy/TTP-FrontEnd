import { FC } from "react";
import "../../clients.css";
import { Grid, Typography } from "@mui/material";

type Props = {
    title:string;
    number:number | string[];
    dataTestId?:string;
}

const ProjectNumber: FC<Props> = ({title,dataTestId,number}) => {

    return (
            <Grid item xs={5} style={{ textAlign: "center" }}>
                <Typography
                    sx={{ fontSize: 13 }}
                    variant="caption"
                    style={{ color: "#808191" }}
                    className="counter-title"
                >
                    {title}
                </Typography>
                <Typography
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                    data-test-id={dataTestId}
                >
                    {number}
                </Typography>
            </Grid>
    );
};

export default ProjectNumber;