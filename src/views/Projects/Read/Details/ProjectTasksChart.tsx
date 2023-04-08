import { FC, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Project, Task } from "src/types/models/Projects";
import { Dictionary, countBy } from "lodash";

interface ProjectTasksChartProps {
  project?: Project;
  tasks: Task[];
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
  });
  useEffect(() => {
    let values = countBy(tasks, "status");
    let valuesInArr = Object.values(values).map(Number);
    setState({
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
    });
    const ctx = doughnutRef?.current?.getContext("2d");
    if (ctx?.arc) {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: [
            "Task Board",
            "Not Clear",
            "In Progress",
            "Review",
            "Shared",
            "Done",
            "Canceled",
          ],
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
  }, [project, tasks]);
  return (
    <>
      <canvas ref={doughnutRef} />
    </>
  );
};

export default ProjectTasksChart;
