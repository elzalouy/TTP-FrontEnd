import "./slider.css";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import IMAGES from "./../../../assets/img";
import { BurgerIcon, Logo } from "../../../coreUI/usable-elements/images";

type Props = {};

const Sidebar: React.FC<Props> = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={`side-bar ${toggle && "toogle-width"}`}>
      <div className="logo-name-wrapper">
        <div className="logo-name">
          {!toggle && <Logo />}

          <span
            onClick={() => setToggle(!toggle)}
            className={toggle ? "active-burger-toggel-width" : ""}
          >
            <BurgerIcon />
          </span>
        </div>
        <button className="logo-name__button">
          <i
            className="bx bx-arrow-from-right logo-name__icon"
            id="logo-name__icon"
          ></i>
        </button>
      </div>
      <div
        style={{
          width: "100%",
          alignItems: "center",
          margin: "0px 35px 35px 35px",
          paddingLeft: "35px",
        }}
      >
        {!toggle && (
          <Typography
            color="primary.light"
            variant="subtitle1"
            component="span"
          >
            Admin tools
          </Typography>
        )}
      </div>
      <ul className="features-list">
        <li className="features-item">
          <img style={{ marginRight: "15px" }} src={IMAGES.Overviewicon} />
          {!toggle && (
            <Typography
              color="primary.light"
              variant="subtitle1"
              component="span"
            >
              Overview
            </Typography>
          )}
          <span className="tooltip">Overview</span>
        </li>
        <li className="features-item">
          <img style={{ marginRight: "15px" }} src={IMAGES.projectsicon} />
          {!toggle && (
            <Typography
              color="primary.light"
              variant="subtitle1"
              component="span"
            >
              Projects
            </Typography>
          )}
        </li>
        <li
          className={`features-item inbox active ${
            toggle && "active-toggel-width"
          }`}
        >
          <img style={{ marginRight: "15px" }} src={IMAGES.departments} />
          {!toggle && (
            <Typography
              color="primary.light"
              variant="subtitle1"
              component="span"
            >
              Departments
            </Typography>
          )}
        </li>
        <li className="features-item">
          <PersonOutlineIcon color="disabled" />
          {!toggle && (
            <Typography
              color="primary.light"
              variant="subtitle1"
              component="span"
            >
              Project managers
            </Typography>
          )}
        </li>
        <li className="features-item">
          <img style={{ marginRight: "15px" }} src={IMAGES.clients} />
          {!toggle && (
            <Typography
              color="primary.light"
              variant="subtitle1"
              component="span"
            >
              Clients
            </Typography>
          )}
        </li>
        <li className="features-item">
          <img style={{ marginRight: "15px" }} src={IMAGES.tasks} />
          {!toggle && (
            <Typography
              color="primary.light"
              variant="subtitle1"
              component="span"
            >
              Tasks
            </Typography>
          )}
        </li>
        <li className="features-item">
          <img style={{ marginRight: "15px" }} src={IMAGES.categories} />
          {!toggle && (
            <Typography
              color="primary.light"
              variant="subtitle1"
              component="span"
            >
              Category
            </Typography>
          )}
        </li>
        <Divider variant="middle" />
        <li className="align-item">
          <i className="bx bx-message-square-error features-item-icon"></i>
          {!toggle && (
            <Typography
              fontSize={"11px"}
              color="primary.light"
              variant="subtitle1"
              component="span"
            >
              Insights
            </Typography>
          )}
        </li>
        <li className="features-item spam">
          <img style={{ marginRight: "15px" }} src={IMAGES.notification} />
          {!toggle && (
            <Typography
              color="primary.light"
              variant="subtitle1"
              component="span"
            >
              Notifications
            </Typography>
          )}
          <span className="tooltip">Notifications</span>
        </li>
      </ul>
      <div className="user-information">
        <div className="user-information-sub">
          <img style={{ marginRight: "10px" }} src={IMAGES.avatar} />
          {!toggle && (
            <div>
              <span>Ahemd Ali</span>
              <br />
              <Typography
                color="primary.light"
                variant="subtitle1"
                component="span"
              >
                Admin
              </Typography>
            </div>
          )}
        </div>
        {!toggle && (
          <img
            style={{ width: "17px", cursor: "pointer" }}
            src={IMAGES.logouticon}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
