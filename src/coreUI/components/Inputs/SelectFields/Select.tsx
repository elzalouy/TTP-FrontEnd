import * as React from "react";
import IMAGES from "src/assets/img/Images";
import DateRange from "../DateRangePicker/DateRangePicker";
import ListOptions from "./ListOptions";
import { useSelect } from "src/coreUI/hooks/useSelect";
import { IFilterProps } from "src/types/components/Inputs";
import { SimpleDialog } from "../SelectDialog/SelectDialog";
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-date-range/dist/styles.css"; // main style file
import "./Select.css";

const Select = (props: IFilterProps) => {
  const selectRef: React.MutableRefObject<HTMLFieldSetElement | null> =
    React.useRef(null);
  const optionsRef: React.MutableRefObject<HTMLUListElement | null> =
    React.useRef(null);
  useSelect(selectRef, optionsRef);

  const [state, setState] = React.useState({
    open: props.optionsType === "list" ? "none" : false,
    selected: "",
  });

  React.useEffect(() => {
    let State = { ...state };
    switch (props.optionsType) {
      case "list":
        State.selected = props?.options
          ? props?.options?.find((item: any) => item?.id === props.selected)
              ?.text
          : "";
        break;
      case "date-picker":
        State.selected =
          props.selected !== "" && props.selected !== undefined ? "Range" : "";
        break;
      case "dialog":
        State.selected = props?.options
          ? props?.options?.find((item: any) => item?.id === props.selected)
              ?.text
          : "";
        break;
      default:
        break;
    }
    setState(State);
  }, [props.selected]);

  const onOpen = () => {
    let State = { ...state };
    switch (props.optionsType) {
      case "list":
        State.open = "flex";
        setState(State);
        break;
      case "date-picker":
        State.open = true;
        setState(State);

        break;
      case "dialog":
        State.open = true;
        setState(State);

        break;
      default:
        State.open = "none";
        break;
    }
  };

  const onClose = (value: any) => {
    let State = { ...state };
    switch (props.optionsType) {
      case "date-picker":
        State = {
          selected: value?.startDate !== undefined ? "Range" : "",
          open: false,
        };
        setState({ ...State });
        props.onSelect(value);
        break;
      case "dialog":
        State = {
          selected: value.label ? value.label : "",
          open: false,
        };
        setState({ ...State });
        props.onSelect(value);
        break;
      case "list":
        State.open = "none";
        setState({ ...State });
        break;
    }
  };

  const onSelect = (e: any) => {
    let State = { ...state };
    State.selected = props.options
      ? props.options.find((item: any) => item?.id === e.target.id)?.text
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
                props.elementType === "select" &&
                ["", null, undefined].includes(props.selected)
                  ? "#B4B6C4"
                  : "#303030",
            }}
          >
            {props.elementType === "filter" ? (
              <>
                {state.selected && state.selected !== ""
                  ? state.selected
                  : "All"}
              </>
            ) : (
              <>
                {["", null, undefined].includes(props.selected)
                  ? props.label
                  : state.selected}
              </>
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
        {props.optionsType === "dialog" && (
          <>
            <SimpleDialog
              open={
                state.open === true || state.open === false ? state.open : false
              }
              onClose={onClose}
              selectedValue={{
                id: props?.options?.find(
                  (item: any) => item?.id === props.selected
                )?.id,
                label: props?.options?.find(
                  (item: any) => item?.id === props.selected
                )?.text,
                image: props?.options?.find(
                  (item: any) => item?.id === props.selected
                )?.image,
              }}
              options={props.options
                ?.map((option: any) => {
                  return {
                    label: option.text,
                    id: option.id,
                    image: option?.image,
                  };
                })
                .filter((item: any) => item?.id !== props.selected)}
            />
          </>
        )}
        {props.optionsType === "list" && (
          <ListOptions
            removeAllOption={props.removeAllOption}
            setShow={state.open === "none" ? onOpen : onClose}
            selectRef={selectRef}
            display={typeof state.open === "string" ? state.open : "none"}
            onSelect={onSelect}
            elementType={props.elementType}
            options={props.options?.filter(
              (item: any) => item?.id !== props?.selected
            )}
            dataTestId={props.dataTestId}
          />
        )}
        {props.optionsType === "date-picker" && (
          <DateRange
            onClose={onClose}
            value={props.selected}
            open={typeof state.open === "boolean" ? state.open : false}
          />
        )}
      </fieldset>
    </>
  );
};

export default Select;
