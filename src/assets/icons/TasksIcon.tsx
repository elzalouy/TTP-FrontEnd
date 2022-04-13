import * as React from "react";
interface Props {
  color: string;
  width: string | number;
  height: string | number;
}
const TasksIcon: React.FC<Props> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <g fill="none">
        <path color={props.color} d="M0 0h24v24H0V0z" />
        <path
          d="M9.321 4.972H7.036a2.304 2.304 0 0 0-1.832.893c-.294.38-.454.848-.454 1.33v13.333a2.255 2.255 0 0 0 2.286 2.222h11.428a2.304 2.304 0 0 0 1.832-.893c.294-.38.454-.848.454-1.33V7.195a2.254 2.254 0 0 0-2.286-2.222H16.18c0-.481-.16-.949-.454-1.33a2.304 2.304 0 0 0-1.832-.892h-2.29a2.255 2.255 0 0 0-2.282 2.222zm0 0a2.254 2.254 0 0 0 2.286 2.222h2.286a2.304 2.304 0 0 0 1.832-.892c.294-.38.454-.849.454-1.33M12.75 12.75h3.429m-3.429 4.444h3.429M9.32 12.75h.012m-.012 4.444h.012"
          strokeLinecap="round"
          stroke="#9fa1ab"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default TasksIcon;
