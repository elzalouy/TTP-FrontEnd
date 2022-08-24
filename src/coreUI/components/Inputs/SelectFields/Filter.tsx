import _ from "lodash";
import * as React from "react";
import IMAGES from "src/assets/img/Images";
import { useSelect } from "src/coreUI/hooks/useSelect";
import "./styles.css";

export interface FilterProps {
  options: {
    id: string;
    value: string;
    text: string;
  }[];
  label: string;
  onSelect: any;
  name: string;
  textTruncate: number;
}

const Filter = (props: FilterProps) => {
  const filterRef: React.MutableRefObject<HTMLUListElement | null> =
    React.useRef(null);
  const [state, setState] = React.useState({
    label: props.label,
    text: "",
    value: "",
    options: [
      {
        id: "",
        value: "",
        text: "",
      },
    ],
    selected: {
      id: "",
      value: "",
      text: "",
    },
  });

  useSelect(filterRef);

  React.useEffect(() => {
    setState({ ...state, options: props.options });
  }, [props]);

  const setShow = () => {
    if (filterRef.current) {
      if (filterRef.current.style.display === "none")
        filterRef.current.style.display = "flex";
      else filterRef.current.style.display = "none";
    }
  };

  const onSelect = (e: any) => {
    let option = [...state.options].find(
      (i) => i.id === e.target.id.toString()
    );
    if (option) {
      console.log(option);
      setState({
        ...state,
        text: option.text,
        value: option.value,
        selected: option,
      });
    } else {
      setState({ ...state, text: "All", value: "" });
    }
  };

  return (
    <>
      <fieldset id={`StyledFilter-${props.name}`}>
        <label
          onClick={setShow}
          id={props.label}
          htmlFor="filter"
          className="labelValue unselectable"
        >
          <p className="label">{props.label}</p>
          <p className="value">
            {state.value === ""
              ? "All"
              : _.truncate(state.text, {
                  length: props.textTruncate,
                  omission: ".",
                })}
          </p>
        </label>
        <img
          onClick={setShow}
          src={IMAGES.filterDropdown}
          className="filterIcon"
          alt=""
        />
        <ul
          ref={filterRef}
          style={{ display: "none" }}
          onClick={setShow}
          id={state.label}
          className="options"
        >
          <li
            className="option"
            value={""}
            id=""
            onClick={(e) => {
              onSelect(e);
              props.onSelect(e);
            }}
          >
            All
          </li>
          {state.options?.map((item) => (
            <li
              className="option"
              value={item.id}
              key={item.id}
              id={item.id}
              onClick={(e) => {
                onSelect(e);
                props.onSelect(e);
              }}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </fieldset>
    </>
  );
};

export default Filter;
