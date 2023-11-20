import _ from "lodash";
import { daysAndHours, randomColors } from "src/helpers/generalUtils";
import { Category } from "src/models/Categories";
import { Client } from "src/models/Clients";
import { Manager } from "src/models/Managers";
import { ITeam } from "src/types/models/Departments";
import { DatasetType, Journies } from "src/types/views/Statistics";
import { getJourneyLeadTime } from "src/views/Statitics/utils";

export const onGetDataSetsByClient = (
  categories: Category[],
  clients: Client[],
  journies: Journies
) => {
  let Categories = categories.map((item) => {
    return { id: item._id, name: item.category };
  });

  let result = clients.map((client, index) => {
    let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
    let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;

    let journiesData = journies.filter((item) => item.clientId === client._id);

    journiesData = journiesData.map((journey) => {
      let lead = getJourneyLeadTime(journey);
      return { ...journey, leadTime: lead };
    });

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

export const onGetDataSetsByPM = (
  categories: Category[],
  managers: Manager[],
  journies: Journies
) => {
  let Categories = categories.map((item) => {
    return { id: item._id, name: item.category };
  });
  const result = managers.map((manager, index) => {
    let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
    let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;
    let journiesData = journies.filter(
      (item) => item.projectManager === manager._id
    );
    journiesData = journiesData.map((journey) => {
      let lead = getJourneyLeadTime(journey);
      return { ...journey, leadTime: lead };
    });
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
    journiesData = journiesData.map((item) => {
      return { ...item, leadTime: getJourneyLeadTime(item) };
    });

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
    journiesData = journiesData.map((item) => {
      return { ...item, leadTime: getJourneyLeadTime(item) };
    });
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
    journies,
    backgroundColor: datasetData.map((i) => i.color),
    borderColor: datasetData.map((i) => i.borderColor),
    borderWidth: 3,
    hoverBorderWidth: 4,
    skipNull: true,
  };
};

export const getCsvFile = (data: DatasetType) => {
  let bars = _.flattenDeep(
    data.datasets.map((item) => {
      // get the bars by the x axis (Categories)
      return item.datasetData.map((categoryData, index) => {
        let totalHours = item.data[index];
        let { days, hours } = daysAndHours(totalHours);
        return {
          categoryName: data.labels[index],
          comparisonName: categoryData.comparisonName,
          journies: categoryData.journies.length,
          timeOfDelivery: `${days}D - ${hours}H`,
        };
      });
    })
  );
  let comparisons = _.flattenDeep(
    data.datasets.map((item) => {
      // get the journies of each bar by the x axis and its value on y axis
      let comparisonValues = _.flattenDeep(
        item.datasetData.map((categoryData, index) => {
          let totalHours = item.data[index];
          let { days, hours } = daysAndHours(totalHours);
          return categoryData.journies.map((journey, index) => {
            let totalHours = journey.leadTime;
            let { days: journeyDays, hours: journeyHours } = daysAndHours(
              totalHours ?? 0
            );
            return {
              comparisonName: categoryData.comparisonName,
              categoryName: data.labels[index],
              taskName: journey.name,
              taskId: journey.taskId,
              journeyindex: index,
              journeyMovementsCount: journey.movements.length,
              journeyStartedAt: journey.startedAt,
              journeyFinishedAt: journey.journeyFinishedAtDate,
              journeyLeadTime: `${journeyDays}D - ${journeyHours}H`,
              datasetTOD: `${days}D - ${hours}`,
            };
          });
        })
      );
      return comparisonValues;
    })
  );
  return { comparisons, bars };
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
