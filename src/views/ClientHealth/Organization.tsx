import React from "react";
import ClientTableRow from "./ClientTableRow";

const OrganizationRow = (props: any) => {
  let {
    lastBrief,
    meetDeadline,
    journies,
    averageTOD,
    _ofProjects,
    _OfTasks,
    _OfRevision,
    _OfActive,
  } = props.organization;
  let lastBriefDate = new Date(lastBrief);
  let localLastBriefDate = lastBriefDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let totalDays = Math.floor(averageTOD / journies / 24);
  let totalHours = Math.floor((averageTOD / journies) % 24);
  return (
    <ClientTableRow
      clientId={"organization"}
      loading={props.loading}
      clientName={"TTP Organization"}
      lastBrief={lastBrief}
      localLastBriefDate={localLastBriefDate}
      _ofProjects={_ofProjects}
      _OfActive={_OfActive}
      _OfTasks={_OfTasks}
      _OfRevision={_OfRevision}
      journies={journies}
      totalDays={totalDays}
      totalHours={totalHours}
      meetDeadline={meetDeadline}
    />
  );
};
export default OrganizationRow;
