import _ from "lodash";
import { convertToCSV, randomColors } from "src/helpers/generalUtils";
import { Category } from "src/models/Categories";
import { Client } from "src/models/Clients";
import { Manager } from "src/models/Managers";
import { ITeam } from "src/types/models/Departments";
import { DatasetType, Journies } from "src/types/views/Statistics";
import { getCsvFile } from "src/views/Statitics/utils";

const getColors = (index: number) => {
  return {
    color: `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`,
    border: `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`,
  };
};
export const onGetDataSetsByClient = (
  categories: Category[],
  clients: Client[],
  journies: Journies
) => {
  let Categories = categories.map((item) => {
    return { id: item._id, name: item.category };
  });

  let result = clients.map((client, index) => {
    let color = getColors(index).color;
    let borderColor = getColors(index).border;

    let journiesData = journies.filter((item) => item.clientId === client._id);

    let journiesOfClientGroupedByCategory = {
      ..._.groupBy(journiesData, "categoryId"),
    };

    let datasetData = Categories.map((item) => {
      let journies = journiesOfClientGroupedByCategory[item.id];
      return {
        journies: journies ?? [],
        color,
        borderColor,
        comparisonId: client._id,
        comparisonName: client.clientName,
      };
    });

    return {
      label: client.clientName,
      data: datasetData.map(
        (i) =>
          _.sum(i.journies.map((journey) => journey.leadTime)) /
          i.journies.length /
          24
      ),
      datasetData,
      backgroundColor: datasetData.map((items) => items.color),
      borderColor: datasetData.map((items) => items.borderColor),
      borderWidth: 3,
      hoverBorderWidth: 4,
      skipNull: true,
    };
  });
  return result;
};

export const onGetDataSetsByPM = (
  categories: Category[],
  managers: Manager[],
  journies: Journies
) => {
  console.log("pms is ready");
  let Categories = categories.map((item) => {
    return { id: item._id, name: item.category };
  });
  const result = managers.map((manager, index) => {
    let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
    let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;
    let journiesData = journies.filter(
      (item) => item.projectManager === manager._id
    );
    let journiesOfClientGroupedByCategory = {
      ..._.groupBy(journiesData, "categoryId"),
    };
    let datasetData = Categories.map((item) => {
      let journies = journiesOfClientGroupedByCategory[item.id];
      return {
        journies: journies ?? [],
        color,
        borderColor,
        comparisonId: manager._id,
        comparisonName: manager.name,
      };
    });
    return {
      label: manager.name,
      data: datasetData.map(
        (i) =>
          _.sum(i.journies.map((journey) => journey.leadTime)) /
          i.journies.length /
          24
      ),
      datasetData: datasetData,
      backgroundColor: datasetData.map((items) => items.color),
      borderColor: datasetData.map((items) => items.borderColor),
      borderWidth: 3,
      hoverBorderWidth: 4,
      skipNull: true,
    };
  });
  return result;
};

export const onGetDatasetsByTeams = (
  categories: Category[],
  teams: ITeam[],
  journies: Journies
) => {
  let Categories = categories.map((item) => {
    return { id: item._id, name: item.category };
  });

  const result = teams.map((team, index) => {
    let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
    let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;

    let journiesData = journies.filter((item) => item.teamId === team._id);
    let journiesOfClientGroupedByCategory = {
      ..._.groupBy(journiesData, "categoryId"),
    };

    let datasetData = Categories.map((item) => {
      let journies = journiesOfClientGroupedByCategory[item.id];
      return {
        journies: journies ?? [],
        color,
        borderColor,
        comparisonId: team._id,
        comparisonName: team.name,
      };
    });

    return {
      label: team.name,
      data: datasetData.map(
        (i) =>
          _.sum(i.journies.map((journey) => journey.leadTime)) /
          i.journies.length /
          24
      ),
      datasetData,
      backgroundColor: datasetData.map((items) => items.color),
      borderColor: datasetData.map((items) => items.borderColor),
      borderWidth: 3,
      hoverBorderWidth: 4,
      skipNull: true,
    };
  });
  return result;
};

export const onGetDatasetsByAll = (
  categories: Category[],
  journies: Journies
) => {
  let Categories = categories.map((item) => {
    return { id: item._id, name: item.category };
  });

  let datasetData = Categories.map((category, index) => {
    let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
    let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;
    let journiesData = journies.filter(
      (item) => item.categoryId === category.id
    );
    return {
      journies: journiesData ?? [],
      color,
      borderColor,
      comparisonId: category.id,
      name: category.name,
    };
  });

  return {
    label: "",
    data: datasetData.map(
      (i) =>
        _.sum(i.journies.map((item) => item.leadTime)) / i.journies.length / 24
    ),
    datasetData,
    backgroundColor: datasetData.map((i) => i.color),
    borderColor: datasetData.map((i) => i.borderColor),
    borderWidth: 3,
    hoverBorderWidth: 4,
    skipNull: true,
  };
};
export const chartOptions = (data: DatasetType) => {
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
            return [
              `${context.dataset.label} :- `,
              `(${days} days, ${hours} hours)`,
            ];
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
          text: "Category",
          poisition: "bottom",
          align: "end",
          color: "black",
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 5,
        },
        min: 0,
        max: Math.floor(maxN - (maxN % 5) + (maxN - (maxN % 5))),
        title: {
          display: true,
          text: "TOD (Days & Hours)",
          poisition: "bottom",
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
  if (comparisons.length > 0 && formRef.current) {
    let csvData = convertToCSV(comparisons);
    let dataBlob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.style.display = "none";
    link.download =
      "Time Of Delivery Diagram Category Comparison (Journies data)";
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }
  if (bars.length > 0 && formRef.current) {
    let csvData = convertToCSV(bars);
    let dataBlob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.style.display = "none";
    link.download = "Time Of Delivery Diagram Category Comparison (Bars data)";
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }
};
