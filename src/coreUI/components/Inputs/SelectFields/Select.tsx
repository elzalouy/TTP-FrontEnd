import _ from "lodash";
import * as React from "react";
import IMAGES from "src/assets/img/Images";
import { useSelect } from "src/coreUI/hooks/useSelect";
import "./styles.css";

export interface FilterProps {
  name: string;
  label: string;
  onSelect: any;
  selected: string;
  textTruncate: number;
  options: {
    id: string;
    value: string;
    text: string;
  }[];
}

const Select = (props: FilterProps) => {
  const fieldRef: React.MutableRefObject<HTMLFieldSetElement | null> =
    React.useRef(null);
  const selectRef: React.MutableRefObject<HTMLUListElement | null> =
    React.useRef(null);
  const [state, setState] = React.useState({
    label: props.label,
    isOpen: "none",
    selected: "",
    options: [
      {
        id: "",
        value: "",
        text: "",
      },
    ],
  });

  useSelect(fieldRef, selectRef);

  React.useEffect(() => {
    setState({ ...state, options: props.options });
  }, [props]);
  React.useEffect(() => {
    let selected = state.options.find(
      (item) => item.id === props.selected
    )?.text;
    if (selected) setState({ ...state, selected: selected });
  }, [props.selected]);
  const setShow = () => {
    if (state.isOpen === "none") setState({ ...state, isOpen: "flex" });
    else setState({ ...state, isOpen: "none" });
  };

  return (
    <>
      <fieldset ref={fieldRef} id={`StyledFilter-${props.name}`}>
        <label
          onClick={setShow}
          id={props.label}
          htmlFor="filter"
          className="labelValue unselectable"
        >
          <p className="label">{props.label}</p>
          <p className="value">
            {props.selected && props.selected !== ""
              ? _.truncate(state.selected, {
                  length: props.textTruncate,
                  omission: ".",
                })
              : "All"}
          </p>
        </label>
        <img
          onClick={setShow}
          src={IMAGES.filterDropdown}
          className="filterIcon"
          alt=""
        />
        <ul
          ref={selectRef}
          style={{ display: state.isOpen }}
          onClick={setShow}
          id={state.label}
          className="options"
        >
          <li className="option" value={""} id="" onClick={props.onSelect}>
            All
          </li>
          {state.options?.map((item) => (
            <li
              className="option"
              value={item.id}
              key={item.id}
              id={item.id}
              onClick={props.onSelect}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </fieldset>
    </>
  );
};

export default Select;
