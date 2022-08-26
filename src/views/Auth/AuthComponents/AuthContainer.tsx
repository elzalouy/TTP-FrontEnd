import { FC } from 'react'
import { Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material'

const AuthContainer: FC = ({ children }) => {

    const theme = useTheme();
    const SM = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Grid
            container
            height={"90vh"}
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            marginTop={5}
        >
            <Grid
                item
                xs={11}
                sm={11}
                md={8}
                lg={8}
                height={600}
                maxWidth={"50% !important"}
                bgcolor={"white"}
                justifyContent={SM ? "flex-start" : "center"}
                container
                direction="row"
                sx={
                    SM
                        ? { boxShadow: "none" }
                        : {
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        }
                }
            >
                {children}
               
                </Grid>
            </Grid>
    )
}

export default AuthContainer