import _ from "lodash";
import * as React from "react";
import IMAGES from "src/assets/img/Images";
import { useSelect } from "src/coreUI/hooks/useSelect";
import { IFilterProps } from "src/types/components/Inputs";
import "./Select.css";

const Select = (props: IFilterProps) => {
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
    console.log("changed, ", props.selected);
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
      <fieldset
        ref={fieldRef}
        id={`${props.elementType}-${props.name}`}
        data-error={props.error ? props.error : ""}
      >
        <label
          onClick={setShow}
          id={props.label}
          className="labelValue unselectable"
        >
          {props.elementType === "filter" && (
            <p className="label">{props.label}</p>
          )}
          <p className="value">
            {props.elementType === "select" ? (
              state.selected === "" ? (
                props.label
              ) : (
                state.selected
              )
            ) : (
              <>
                {props.selected && props.selected !== ""
                  ? _.truncate(state.selected, {
                      length: props.textTruncate,
                      omission: ".",
                    })
                  : "All"}
              </>
            )}
          </p>
        </label>
        <img
          onClick={setShow}
          src={IMAGES.filterDropdown}
          className="leftIcon"
          alt=""
        />
        <ul
          ref={selectRef}
          style={{ display: state.isOpen }}
          onClick={setShow}
          id={state.label}
          className="options"
        >
          {props.elementType === "filter" && (
            <li className="option" value={""} id="" onClick={props.onSelect}>
              All
            </li>
          )}
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
