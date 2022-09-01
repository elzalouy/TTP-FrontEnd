import * as React from "react";
import { useSelect } from "src/coreUI/hooks/useSelect";
import "./Select.css";
type OptionsProps = {
  selectRef: React.MutableRefObject<HTMLFieldSetElement | null>;
  display: string;
  onSelect: any;
  elementType: string;
  options: { id: string; value: string; text: string }[];
  setShow: any;
};

const Options = ({
  selectRef,
  display,
  onSelect,
  elementType,
  options,
  setShow,
}: OptionsProps) => {
  const optionsRef: React.MutableRefObject<HTMLUListElement | null> =
    React.useRef(null);
  useSelect(selectRef, optionsRef);
  return (
    <>
      <ul
        onClick={setShow}
        ref={optionsRef}
        id={`core-${elementType}-options`}
        style={{ display: display }}
        className={options.length > 6 ? "options scroll" : "options"}
      >
        {elementType === "filter" && (
          <li className="option" value={""} id="" onClick={onSelect}>
            All
          </li>
        )}
        {options &&
          options?.map((item) => (
            <li
              className="option"
              value={item.id}
              key={item.id}
              id={item.id}
              onClick={onSelect}
            >
              {item.text}
            </li>
          ))}
      </ul>
    </>
  );
};

export default Options;
