import _ from "lodash";
import { Months, convertToCSV, randomColors } from "src/helpers/generalUtils";
import { Client } from "src/models/Clients";
import { Manager } from "src/models/Managers";
import { ITeam } from "src/types/models/Departments";
import { DatasetType, Journey } from "src/types/views/Statistics";
import { getCsvFile } from "src/views/Statitics/utils";

export const setOptions = (data: DatasetType) => {
  let maxArray = data.datasets.map((item) => _.max(item.data));
  let max = _.max(maxArray);
  let maxN = max ? max : 100;
  return {
    plugins: {
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value: any, context: any) => {
          const label = context.dataset.label;
          if (value > 0) {
            let totalHours = value * 24;
            let days = Math.floor(totalHours / 24);
            const hours = Math.floor(totalHours % 24);
            return [label, `(${days} days, ${hours} hours)`];
          } else return null;
        },
        font: {
          weight: "bold",
          size: "10px",
        },
      },
      legend: {
        display: false,
        position: "right",
        align: "start",
      },

      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value: number = context.dataset.data[context.dataIndex];
            let totalHours = value * 24;
            let days = Math.floor(totalHours / 24);
            const hours = Math.floor(totalHours % 24);
            return `${context.dataset.label}:${days} days, ${hours} hours`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        position: "bottom",
        ticks: {
          beginAtZero: true,
        },
        title: {
          display: true,
          text: "Month",
          poisition: "bottom",
          align: "end",
          color: "black",
        },
      },
      y: {
        min: 0,
        max: Math.floor(maxN - (maxN % 5) + (maxN - (maxN % 5))),
        ticks: {
          beginAtZero: true,
          stepSize: 5,
        },
        title: {
          display: true,
          text: "TOD (Days & Hours)",
          poisition: "top",
          align: "end",
          color: "black",
        },
      },
    },
  };
};
export const onDownload = (
  data: DatasetType,
  formRef: React.RefObject<HTMLFormElement>,
  comparisonName?: string
) => {
  let { bars, comparisons } = getCsvFile(data, "decimal", comparisonName);
  if (comparisons.length > 0) {
    let csvData = convertToCSV(comparisons);
    let dataBlob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.style.display = "none";
    link.download = "Time Of Delivery Diagram Trend Comparison (Journies data)";
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }
  if (bars.length > 0) {
    let csvData = convertToCSV(bars);
    let dataBlob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.style.display = "none";
    link.download = "Time Of Delivery Diagram Trend Comparison (Bars data)";
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }
};
export const onGetDataSetsByClient = (
  clients: Client[],
  journies: Journey[]
) => {
  let months = Months.map((item) => {
    return { id: item, name: item };
  });

  const result = clients.map((client, index) => {
    let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
    let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;

    let journiesData = journies.filter(
      (i) => i.clientId && i.clientId === client._id
    );
    let journiesOfManagerGroupedByMonth = {
      ..._.groupBy(journiesData, "sharedAtMonth"),
    };

    let datasetData = months.map((item) => {
      let journies = journiesOfManagerGroupedByMonth[item.id];
      return {
        comparisonId: client._id,
        comparisonName: client.clientName,
        journies: journies ?? [],
        color,
        borderColor,
      };
    });

    return {
      label: client.clientName,
      data: datasetData.map(
        (i) => _.sum(i.journies.map((j) => j.leadTime)) / i.journies.length / 24
      ),
      datasetData,
      journies,
      backgroundColor: datasetData.map((items) => items.color),
      borderColor: datasetData.map((items) => items.borderColor),
      borderWidth: 3,
      hoverBorderWidth: 4,
      skipNull: true,
    };
  });
  return result;
};

export const onGetDataSetsByPM = (managers: Manager[], journies: Journey[]) => {
  let months = Months.map((item) => {
    return { id: item, name: item };
  });
  const result = managers.map((manager, index) => {
    let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
    let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;

    let journiesData = journies.filter(
      (i) => i.projectManager && i.projectManager === manager._id
    );

    let journiesOfManagerGroupedByMonth = {
      ..._.groupBy(journiesData, "sharedAtMonth"),
    };
    let datasetData = months.map((item) => {
      let journies = journiesOfManagerGroupedByMonth[item.id];
      return {
        comparisonId: manager._id,
        comparisonName: manager.name,
        journies: journies ?? [],
        color,
        borderColor,
      };
    });
    return {
      label: manager.name,
      data: datasetData.map(
        (i) => _.sum(i.journies.map((j) => j.leadTime)) / i.journies.length / 24
      ),
      datasetData,
      journies,
      backgroundColor: datasetData.map((items) => items.color),
      borderColor: datasetData.map((items) => items.borderColor),
      borderWidth: 3,
      hoverBorderWidth: 4,
      skipNull: true,
    };
  });
  return result;
};

export const onGetDatasetsByTeams = (teams: ITeam[], journies: Journey[]) => {
  let months = Months.map((item) => {
    return { id: item, name: item };
  });

  return teams.map((team, index) => {
    let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
    let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;

    let journiesData = journies.filter(
      (i) => i.teamId && i.teamId === team._id
    );
    let journiesOfManagerGroupedByMonth = {
      ..._.groupBy(journiesData, "sharedAtMonth"),
    };

    let datasetData = months.map((item) => {
      let journies = journiesOfManagerGroupedByMonth[item.id];
      return {
        comparisonName: team.name,
        comparisonId: team._id,
        journies: journies ?? [],
        color,
        borderColor,
      };
    });

    return {
      label: team.name,
      data: datasetData.map(
        (i) => _.sum(i.journies.map((j) => j.leadTime)) / i.journies.length / 24
      ),
      datasetData,
      journies,
      backgroundColor: datasetData.map((items) => items.color),
      borderColor: datasetData.map((items) => items.borderColor),
      borderWidth: 3,
      hoverBorderWidth: 4,
      skipNull: true,
    };
  });
};

export const onGetDatasetsByAll = (journies: Journey[]) => {
  let months = Months.map((item) => {
    return { id: item, name: item };
  });

  let datasetData = months.map((month, index) => {
    let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
    let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;
    let journiesData = journies.filter(
      (item) => item.sharedAtMonth === month.id
    );
    return {
      comparisonId: month.id,
      comparisonName: month.name,
      journies: journiesData ?? [],
      color,
      borderColor,
    };
  });

  return {
    label: "",
    data: datasetData.map(
      (i) =>
        _.sum(i.journies.map((journey) => journey.leadTime)) /
        i.journies.length /
        24
    ),
    backgroundColor: datasetData.map((i) => i.color),
    borderColor: datasetData.map((i) => i.borderColor),
    borderWidth: 3,
    hoverBorderWidth: 4,
    skipNull: true,
    datasetData,
    journies,
  };
};
