import React, { FC, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Project, Task } from "src/types/models/Projects";
import { Dictionary, countBy } from "lodash";
import { Box, Typography, Grid } from "@mui/material";

interface StatusChartProps {
  tasks?: Task[];
}
export type stateType = {
  status: {
    notClear: number;
    inProgress: number;
    taskBoard: number;
    shared: number;
    review: number;
    done: number;
    canceled: number;
  };
  valuesInDic: Dictionary<number> | null;
  valuesInArr: number[];
  labels: string[];
  tasks?: Task[];
};
const StatusChart: FC<StatusChartProps> = ({ tasks }) => {
  const doughnutRef = useRef<HTMLCanvasElement | null>(null);

  const [state, setState] = useState<stateType>({
    status: {
      taskBoard: 0,
      notClear: 0,
      inProgress: 0,
      review: 0,
      shared: 0,
      done: 0,
      canceled: 0,
    },
    valuesInDic: null,
    valuesInArr: [0, 0, 0, 0, 0, 0, 0],
    labels: [
      "Tasks Board",
      "Not Clear",
      "In Progress",
      "Review",
      "Shared",
      "Done",
      "Canceled",
    ],
    tasks: tasks,
  });

  useEffect(() => {
    let values = countBy(tasks, "status");
    let valuesInArr = Object.values(values).map(Number);
    let labels: any[] = [
      "Tasks Board",
      "Not Clear",
      "In Progress",
      "Review",
      "Shared",
      "Done",
      "Canceled",
    ];
    let valuesKeys = Object.keys(values);
    labels = labels?.filter((item) => valuesKeys.includes(item));
    setState({
      tasks: tasks,
      valuesInDic: values,
      valuesInArr: valuesInArr,
      status: {
        taskBoard: values["Tasks Board"],
        notClear: values["Not Clear"],
        shared: values["Shared"],
        review: values["Review"],
        inProgress: values["In Progress"],
        done: values["Done"],
        canceled: values["Canceled"],
      },
      labels,
    });
  }, [tasks]);

  useEffect(() => {
    console.log({ state });
    if (state.tasks && state.tasks?.length > 0) {
      const ctx = doughnutRef?.current?.getContext("2d");
      if (ctx?.arc) {
        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: state.labels,
            datasets: [
              {
                label: "No of Tasks",
                data: state.valuesInArr,
                hoverOffset: 5,
                backgroundColor: [
                  "#FF6384", // pink
                  "#36A2EB", // blue
                  "#FFCE56", // yellow
                  "#4BC0C0", // turquoise
                  "#9966FF", // purple
                  "#FF9F40", // orange
                  "#66CCCC", // teal
                ],
                borderColor: [
                  "#FF6384", // pink
                  "#36A2EB", // blue
                  "#FFCE56", // yellow
                  "#4BC0C0", // turquoise
                  "#9966FF", // purple
                  "#FF9F40", // orange
                  "#66CCCC", // teal
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "right",
              },
              title: {
                display: true,
                text: "Status",
              },
              colors: { enabled: true },
            },
          },
        });
      }
      return () => {
        doughnutRef.current = null;
      };
    }
  }, [state.tasks]);

  return (
    <>
      <Grid
        container
        sx={{
          background: "white",
          borderRadius: "5px",
          margin: "8px",
          padding: 1,
        }}
      >
        <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          <Typography sx={{ fontSize: 24 }}>Tasks Statistics</Typography>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          <canvas ref={doughnutRef} />
        </Grid>
      </Grid>
    </>
  );
};

export default StatusChart;
