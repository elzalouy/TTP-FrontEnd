import _ from "lodash";
import * as React from "react";
import IMAGES from "src/assets/img/Images";
import { useSelect } from "src/coreUI/hooks/useSelect";
import { IFilterProps } from "src/types/components/Inputs";
import ListOptions from "./ListOptions";
import "./Select.css";
import { SimpleDialog } from "../SelectDialog/SelectDialog";

const Select = (props: IFilterProps) => {
  // To take control over the mouse click
  const selectRef: React.MutableRefObject<HTMLFieldSetElement | null> =
    React.useRef(null);
  const optionsRef: React.MutableRefObject<HTMLUListElement | null> =
    React.useRef(null);
  useSelect(selectRef, optionsRef);

  React.useEffect(() => {
    setState({
      ...state,
      selected: props.options
        ? props.options.find((item: any) => item.id === props.selected)?.text
        : "",
    });
  }, [props.selected]);

  // Our component state
  const [state, setState] = React.useState({
    open: props.optionsType === "dialog" ? false : "none",
    selected: "",
  });
  const onOpen = () => {
    let State = { ...state };
    State.open =
      props.optionsType === "dialog"
        ? true
        : props.options.length > 0
        ? "flex"
        : "none";
    setState(State);
  };

  const onClose = (value: any) => {
    let State = { ...state };
    State.open = props.optionsType === "dialog" ? false : "none";
    if (props.optionsType === "dialog") {
      State.selected = value.label ? value.label : "";
      props.onSelect(value);
    }
    setState(State);
  };

  const onSelect = (e: any) => {
    let State = { ...state };
    State.selected = props.options
      ? props.options.find((item: any) => item.id === e.target.id)?.text
      : "";
    setState(State);
    props.onSelect(e);
  };

  return (
    <>
      <fieldset
        ref={selectRef}
        id={`${props.elementType}-${props.name}`}
        data-error={props.error ? props.error : ""}
      >
        <label
          onClick={
            state.open === "none" || state.open === false ? onOpen : onClose
          }
          id={props.label}
          className="labelValue unselectable"
          data-test-id={props.dataTestId}
        >
          {props.elementType === "filter" && (
            <p className="label">{props.label}</p>
          )}
          <p
            className={"value"}
            style={{
              color:
                props.elementType === "select" && state.selected === ""
                  ? "#B4B6C4"
                  : "#303030",
            }}
          >
            {props.elementType === "filter" ? (
              <>
                {state.selected && state.selected !== ""
                  ? _.truncate(state.selected, {
                      length: props.textTruncate,
                      omission: "...",
                    })
                  : "All"}
              </>
            ) : (
              <>{state.selected === "" ? props.label : state.selected}</>
            )}
          </p>
        </label>
        <img
          onClick={
            state.open === "none" || state.open === false ? onOpen : onClose
          }
          src={IMAGES.filterDropdown}
          className="leftIcon"
          alt=""
        />
        {props.optionsType === "dialog" ? (
          <>
            <SimpleDialog
              open={
                state.open === true || state.open === false ? state.open : false
              }
              onClose={onClose}
              selectedValue={{
                id: props.options.find(
                  (item: any) => item.id === props.selected
                )?.id,
                label: props.options.find(
                  (item: any) => item.id === props.selected
                )?.text,
                image: props.options.find(
                  (item: any) => item.id === props.selected
                )?.image,
              }}
              options={props.options.map((option: any) => {
                return {
                  label: option.text,
                  id: option.id,
                  image: option?.image,
                };
              })}
            />
          </>
        ) : (
          <ListOptions
            setShow={state.open === "none" ? onOpen : onClose}
            selectRef={selectRef}
            display={
              state.open !== true && state.open !== false ? state.open : "none"
            }
            onSelect={onSelect}
            elementType={props.elementType}
            options={props.options}
            dataTestId={props.dataTestId}
          />
        )}
      </fieldset>
    </>
  );
};

export default Select;
