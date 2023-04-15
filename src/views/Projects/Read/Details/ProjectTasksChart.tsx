import React, { FC, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Project, Task } from "src/types/models/Projects";
import { Dictionary, countBy } from "lodash";

interface ProjectTasksChartProps {
  project?: Project;
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
  project?: Project;
};
const ProjectTasksChart: FC<ProjectTasksChartProps> = ({ project, tasks }) => {
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
    project: project,
  });

  useEffect(() => {
    setState({ ...state, project, tasks });
  }, [tasks, project]);

  useEffect(() => {
    let values = countBy(tasks, "status");
    console.log({ values });
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
    labels = labels.filter((item) => valuesKeys.includes(item));
    console.log({ tasks, labels });
    setState({
      ...state,
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

    const ctx = doughnutRef?.current?.getContext("2d");
    if (ctx?.arc) {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "# of Tasks",
              data: valuesInArr,
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
              text: "Project Tasks Chart",
            },
            colors: { enabled: true },
          },
        },
      });
    }
    return () => {
      doughnutRef.current = null;
    };
  }, [project, tasks]);

  return (
    <>
      <canvas ref={doughnutRef} />
    </>
  );
};

export default ProjectTasksChart;
