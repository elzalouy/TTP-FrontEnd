import logo from "src/assets/img/ttp_logo.png";
import burgerIcon from "src/assets/img/burgerIcon.svg";
import categories from "src/assets/img/categories.svg";
import clients from "src/assets/img/clients.svg";
import departmentIcon from "src/assets/img/departmentIcon.svg";
import profileImageDemo from "src/assets/img/profileImageDemo.png";
import projects from "src/assets/img/projects.svg";
import tasks from "src/assets/img/tasks.svg";
import img from "src/assets/img/Images";
import overView from "src/assets/img/taskviewiconCopy.svg";
import { RouteComponentProps } from "react-router";

interface Props {
  history?: RouteComponentProps["history"];
  alt?: string;
  src?: string;
}

export const Logo = (props: Props) => (
  <img
    src={logo}
    alt="Logo"
    onClick={() => props?.history?.push("/Overview")}
    // {...props}
  />
);

export const Notification = (props: Props) => (
  <img
    src={img.notification}
    alt="Logo"
    width={"25px"}
    onClick={() => props?.history?.push("/Overview")}
    {...props}
    // {...props}
  />
);

export const BurgerIcon = (props: any) => (
  <img
    style={{ cursor: "pointer" }}
    src={burgerIcon}
    alt="burgerIcon"
    // {...props}
  />
);

export const Categories = (props: any) => (
  <img
    style={{ cursor: "pointer" }}
    src={categories}
    alt="categories"
    // {...props}
  />
);

export const Clients = (props: any) => (
  <img
    style={{ cursor: "pointer" }}
    src={clients}
    alt="clients"
    //  {...props}
  />
);

export const DepartmentIcon = (props: any) => (
  <img
    style={{ cursor: "pointer" }}
    src={departmentIcon}
    alt="departmentIcon"
    // {...props}
  />
);

export const ProfileImageDemo = (props: any) => (
  <img
    style={{ cursor: "pointer" }}
    src={profileImageDemo}
    alt="profileImageDemo"
    // {...props}
  />
);

export const Projects = (props: any) => (
  <img
    style={{ cursor: "pointer" }}
    src={projects}
    alt="projects"
    //  {...props}
  />
);

export const Tasks = (props: any) => (
  <img
    style={{ cursor: "pointer" }}
    src={tasks}
    alt="tasks"
    // {...props}
  />
);

export const OverView = (props: any) => (
  <img
    style={{ cursor: "pointer" }}
    src={overView}
    alt="overView"
    // {...props}
  />
);
