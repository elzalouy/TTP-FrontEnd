import * as React from "react";
interface TasksCheckProps {
  color: string;
}
const TasksCheckIcon: React.FC<TasksCheckProps> = (props) => (
  <svg
    width={15}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.834 14.333H5.5a5.506 5.506 0 0 1-5.5-5.5V5.5C0 2.467 2.467 0 5.5 0h3.334a5.506 5.506 0 0 1 5.5 5.5v3.334c0 3.032-2.468 5.5-5.5 5.5v-.001ZM1 5.5v3.334c0 2.48 2.019 4.5 4.5 4.5h3.334c2.48 0 4.5-2.02 4.5-4.5V5.5c0-2.481-2.02-4.5-4.5-4.5H5.5A4.505 4.505 0 0 0 1 5.5Z"
      fill={props.color}
    />
    <g clipPath="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.495 8.76 4.851 7.138a.5.5 0 0 0-.702.711l2.033 2.007a.497.497 0 0 0 .736-.038l3.301-4a.5.5 0 1 0-.771-.636L6.495 8.76Z"
        fill={props.color}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill={props.color}
          transform="translate(4 5)"
          d="M0 0h6.333v5H0z"
        />
      </clipPath>
    </defs>
  </svg>
);

export default TasksCheckIcon;
