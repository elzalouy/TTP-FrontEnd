import * as React from "react";

type TextAreaProps = {
  label: string;
  name: string;
  cols: number;
  rows: number;
  placeholder: string;
  onChange: any;
  value?: string;
  error?: string;
};

const TextArea = (props: TextAreaProps) => {
  return (
    <>
      <label
        htmlFor={`core-textarea-${props.name}`}
        className="core-textarea-label"
      >
        {props.label}
      </label>
      <textarea
        name={props.name}
        id={`core-textarea-${props.name}`}
        cols={props.cols}
        rows={props.rows}
        className="core-textarea"
        onChange={props.onChange}
        data-error={props.error}
      >
        {props.value}
      </textarea>
    </>
  );
};

export default TextArea;
