import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, Button, Typography } from "@mui/material";
import { popOverStyle } from "../../../themes/Styles";
import IMAGES from "../../../assets/img/Images";
import { RouteComponentProps } from "react-router";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface Props {
    history?: RouteComponentProps["history"];
    handleSetShowDelete: (value: string) => void;
    color?: string
}

//SX Styles Object

const CategoryPopover: React.FC<Props> = ({
    handleSetShowDelete,
    color
}) => {
    const styles = popOverStyle()();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const open = Boolean(anchorEl);

    const handleOpen = (e: any) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const showDeleteDepartmentPopup = () => {
        handleClose();
        handleSetShowDelete("flex");
    };

    return (
        <div>
            <Box onClick={handleOpen} marginBottom={2} sx={{ cursor: "pointer" }}>
                <Typography variant="h3" fontWeight={"bold"}>
                    <MoreHorizIcon style={{ color: color }} />
                </Typography>
            </Box>
            <Popover
                className={styles.root}
                open={open}
                anchorEl={anchorEl}
                anchorReference="anchorEl"
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box display={"grid"} padding={1}>
                    <Button
                        onClick={showDeleteDepartmentPopup}
                        variant="text"
                        className={styles.redButton}
                    >
                        <img
                            src={IMAGES.deleteicon2}
                            width={18}
                            style={{ marginRight: 10 }}
                        ></img>
                        Delete
                    </Button>
                </Box>
            </Popover>
        </div>
    );
};
export default CategoryPopover;
