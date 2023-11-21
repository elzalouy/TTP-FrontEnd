import _ from "lodash";
import { DatasetType } from "src/types/views/Statistics";

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
