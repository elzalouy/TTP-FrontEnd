import _ from "lodash";
import * as React from "react";
import IMAGES from "src/assets/img/Images";
import { useSelect } from "src/coreUI/hooks/useSelect";
import { IFilterProps } from "src/types/components/Inputs";
import Options from "./Options";
import "./Select.css";

const Select = (props: IFilterProps) => {
  const selectRef: React.MutableRefObject<HTMLFieldSetElement | null> =
    React.useRef(null);
  const optionsRef: React.MutableRefObject<HTMLUListElement | null> =
    React.useRef(null);
  useSelect(selectRef, optionsRef);

  const [state, setState] = React.useState({
    label: props.label,
    isOpen: "none",
    selected: "",
    options: props.options
      ? props.options
      : [
          {
            id: "",
            value: "",
            text: "",
          },
        ],
  });

  React.useEffect(() => {
    if (props.options)
      setState({
        ...state,
        options: props.options,
      });
    else
      setState({
        ...state,
        options: [],
      });
  }, [props]);

  React.useEffect(() => {
    let selected = state.options.find(
      (item) => item.id === props.selected
    )?.text;
    if (selected) setState({ ...state, selected: selected });
    else setState({ ...state, selected: "" });
  }, [props.selected]);

  React.useEffect(() => {
    let selected = state.options.find(
      (item) => item.id === props.selected
    )?.text;
    if (selected) setState({ ...state, selected: selected });
  }, [props.selected, props.options]);

  const setShow = () => {
    if (state.isOpen === "none") setState({ ...state, isOpen: "flex" });
    else setState({ ...state, isOpen: "none" });
  };
  return (
    <>
      <fieldset
        ref={selectRef}
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
          <p
            className={"value"}
            style={{
              color:
                props.elementType === "select" && state.selected === ""
                  ? "#707683"
                  : "#303030",
            }}
          >
            {props.elementType === "filter" ? (
              <>
                {state.selected && state.selected !== ""
                  ? _.truncate(state.selected, {
                      length: props.textTruncate,
                      omission: ".",
                    })
                  : "All"}
              </>
            ) : (
              <>{state.selected === "" ? props.label : state.selected}</>
            )}
          </p>
        </label>
        <img
          onClick={setShow}
          src={IMAGES.filterDropdown}
          className="leftIcon"
          alt=""
        />
        <Options
          setShow={setShow}
          selectRef={selectRef}
          display={state.isOpen}
          onSelect={props.onSelect}
          elementType={props.elementType}
          options={state.options}
        />
      </fieldset>
    </>
  );
};

export default Select;
