import { Typography } from "@mui/material";
import { FC } from "react";
import { ICardBadge } from "src/types/components/Badge";

const CardBadge: FC<ICardBadge> = ({ fontColor, _id, text }) => {

    return (
        <Typography
            key={_id}
            sx={{
                textTransform: "capitalize",
                textAlign: "left",
                mb: 1,
                border: 1,
                px: 1,
                mr: 1.5,
                py: 0.5,
                borderRadius: "4px",
                borderColor: fontColor,
                color: "#5C5C5C",
                fontFamily: "font: normal normal normal 14px/26px Cairo",
                letterSpacing: "0.1px",
                fontSize: "14px",
                height: "fit-content",
                cursor: "default"
            }}
        >
            {text}
        </Typography>
    );
};

export default CardBadge;
