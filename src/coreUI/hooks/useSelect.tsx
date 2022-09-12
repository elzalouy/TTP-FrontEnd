import React from "react";

/**
 * useSelect
 *
 * It give you the option of select like with select element tag, we have implemented this way to add some esier ways of providing styled select options.
 * @param ref Mutable Reference Object passed to control its current node
 * @returns  value String
 */
export function useSelect(
  selectRef: React.MutableRefObject<any>,
  optionsRed: React.MutableRefObject<any>
) {
  React.useEffect(() => {
    function click(event: any) {
      if (selectRef.current && optionsRed.current) {
        if (!selectRef.current.contains(event.target)) {
          optionsRed.current.style.display = "none";
        }
      }
    }
    document?.addEventListener("click", (event: any) => click(event));
    return () => {
      document.removeEventListener("click", click);
    };
  }, [selectRef]);
}
