import { Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";

const ClientTableRow = ({
  clientId,
  loading,
  clientName,
  lastBrief,
  localLastBriefDate,
  _ofProjects,
  _OfActive,
  _OfTasks,
  _OfRevision,
  totalDays,
  totalHours,
  meetDeadline,
  journies,
}: any) => {
  return (
    <TableRow
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
      tabIndex={-1}
      key={clientId}
    >
      <TableCell
        size="small"
        align="left"
        style={{
          color: "#334D6E",
          textTransform: "capitalize",
          width: "130px",
          height: "45px",
        }}
      >
        {loading === true ? (
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        ) : (
          <div style={{ cursor: "pointer" }}>{clientName}</div>
        )}
      </TableCell>
      <TableCell
        size="small"
        align="left"
        style={{
          cursor: "pointer",
          color: "#323C47",
          width: "130px",
          fontWeight: "500",
        }}
      >
        {loading === true ? (
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        ) : (
          <>{lastBrief ? localLastBriefDate : ""}</>
        )}
      </TableCell>
      <TableCell
        size="small"
        style={{
          color: "#707683",
          width: "130px",
          textTransform: "capitalize",
          cursor: "pointer",
        }}
        align="left"
      >
        {loading === true ? (
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        ) : (
          <>{_ofProjects}</>
        )}
      </TableCell>
      <TableCell
        size="small"
        align="left"
        style={{
          color: "#707683",
          cursor: "pointer",
        }}
      >
        {loading === true ? (
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        ) : (
          <>{_OfTasks}</>
        )}
      </TableCell>
      <TableCell
        size="small"
        align="left"
        style={{
          color: "#707683",
          cursor: "pointer",
        }}
      >
        {loading === true ? (
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        ) : (
          <>{journies}</>
        )}
      </TableCell>

      <TableCell
        size="small"
        align="left"
        style={{
          color: "#707683",
          cursor: "pointer",
        }}
      >
        {loading === true ? (
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        ) : (
          <>{_OfRevision}</>
        )}
      </TableCell>
      <TableCell
        size="small"
        style={{
          color: "#707683",
          cursor: "pointer",
          textTransform: "capitalize",
        }}
        align="left"
      >
        {loading === true ? (
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        ) : (
          <>{`${totalDays} Days, ${totalHours} Hours`}</>
        )}
      </TableCell>
      <TableCell
        size="small"
        style={{
          color: "#707683",
          cursor: "pointer",
          textTransform: "capitalize",
        }}
        align="left"
      >
        {loading === true ? (
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        ) : (
          <>{_OfActive}</>
        )}
      </TableCell>
      <TableCell
        size="small"
        style={{
          color: "#707683",
          cursor: "pointer",
          textTransform: "capitalize",
        }}
        align="left"
      >
        {loading === true ? (
          <Skeleton variant="rectangular" width={"100%"} height={20} />
        ) : (
          <>{meetDeadline >= 0 ? meetDeadline : 0} %</>
        )}
      </TableCell>
    </TableRow>
  );
};
export default ClientTableRow;
