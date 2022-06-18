import React, { useRef, useEffect } from "react";
import { useState } from "react";
import IMAGES from "../../../assets/img/Images";
import "./dropdowns-style.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type Props = {
  handleSetShow: (value: string) => void;
  handleSetShowDelete: (value: string) => void;
  color?:string
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: any) {}

const DepartmentDrop: React.FC<Props> = ({
  handleSetShow,
  handleSetShowDelete,
  color
}) => {
  const [Show, setShow] = useState<string>("none");

  const wrapperRef: React.MutableRefObject<any> = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow("none");
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="dropdown-cover">
      <button
        className="dropdown-moreBtn"
        onClick={() => {
          if (Show === "none") setShow("flex");
          else setShow("none");
        }}
      >
        <MoreHorizIcon style={{color:color}}/>
      </button>

      <div
        className="dropdown-container"
        style={{ display: Show }}
        ref={wrapperRef}
      >
        <button
          className="dropdown-btn"
          onClick={() => {
            setShow("none");
            handleSetShow("flex");
          }}
        >
          <img
            className="dropdown-btn-icon grey-icon"
            src={IMAGES.edit}
            alt="icon"
          />
          <span className="dropdown-btn-titleGrey">Edit department</span>
        </button>

        <button
          className="dropdown-btn"
          onClick={() => {
            setShow("none");
            handleSetShowDelete("flex");
          }}
        >
          <img
            className="dropdown-btn-icon"
            src={IMAGES.deleteicon2}
            alt="icon"
            width="20px"
            height="20px"
          />
          <span className="dropdown-btn-titleRed">Delete</span>
        </button>
      </div>
    </div>
  );
};
export default DepartmentDrop;
