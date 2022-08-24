import React from "react";
import { FilterProps } from "../components/Inputs/SelectFields/Filter";

/**
 * useSelect
 *
 * It give you the option of select like with select element tag, we have implemented this way to add some esier ways of providing styled select options.
 * @param ref Mutable Reference Object passed to control its current node
 * @returns  value String
 */
export function useSelect(
  ref: React.MutableRefObject<HTMLUListElement | null>
) {
  React.useEffect(() => {
    function click(event: any) {
      if (ref.current) {
        if (ref.current.contains(event.target)) {
          console.log(
            event.target,
            ref.current,
            ref.current.contains(event.target)
          );
        } else ref.current.style.display = "none";
      }
    }
    document?.addEventListener("click", (event: any) => click(event));
    return () => {
      document.removeEventListener("click", click);
    };
  }, [ref]);
}
