import { Skeleton, TableCell, TableRow } from "@mui/material";
import { uniqueId } from "lodash";
import React, { FC } from "react";

interface TableLoadingProps {
  rows: number;
  columns: number;
  name: string;
}

const TableLoading: FC<TableLoadingProps> = ({ rows, columns, name }) => {
  return (
    <>
      {Array(rows)
        .fill(0)
        .map((i, index) => (
          <TableRow
            key={uniqueId(name) + index + "row"}
            sx={{
              ":hover": {
                backgroundColor: "white !important",
                boxShadow: "0px 10px 20px #0000001A",
                transition: "all 0.5s ease-out !important",
                WebkitAppearance: "none",
                WebkitBoxShadow: "0px 10px 20px #0000001A",
                borderBottom: 0,
              },
            }}
            hover
            role="checkbox"
          >
            {Array(columns)
              .fill(0)
              .map((i, index) => (
                <TableCell
                  key={uniqueId(name) + index + "column"}
                  size="small"
                  align="left"
                  style={{
                    color: "#334D6E",
                    textTransform: "capitalize",
                    width: "130px",
                    height: "45px",
                  }}
                >
                  <Skeleton variant="rectangular" width={"100%"} height={20} />
                </TableCell>
              ))}
          </TableRow>
        ))}
    </>
  );
};

export default TableLoading;
