import * as React from "react";
import { useSelect } from "src/coreUI/hooks/useSelect";
import { IOptions } from "src/types/components/Inputs";
import "./Select.css";

const Options: React.FC<IOptions> = ({
  selectRef,
  display,
  onSelect,
  elementType,
  options,
  setShow,
  dataTestId,
}) => {
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
        className={
          options && options?.length > 6 ? "options scroll" : "options"
        }
      >
        {elementType === "filter" && (
          <li className="option" value={""} id="" onClick={onSelect}>
            All
          </li>
        )}
        {options &&
          options?.map((item) => (
            <li
              className="option unselectable"
              value={item.id}
              key={item.id}
              id={item.id}
              onClick={onSelect}
              data-test-id={dataTestId + "-option"}
            >
              {item.text}
            </li>
          ))}
      </ul>
    </>
  );
};

export default Options;
