import logo from '../../assets/img/ttp_logo.png';
import burgerIcon from '../../assets/img/burgerIcon.svg';
import categories from '../../assets/img/categories.svg';
import clients from '../../assets/img/clients.svg';
import departmentIcon from '../../assets/img/departmentIcon.svg';
import profileImageDemo from '../../assets/img/profileImageDemo.png';
import projects from '../../assets/img/projects.svg';
import tasks from '../../assets/img/tasks.svg';
import overView from '../../assets/img/taskviewiconCopy.svg';


export const Logo = (props: any) => (
    <img src={logo} alt="Logo" {...props} />
);

export const BurgerIcon = (props: any) => (
    <img style={{cursor: "pointer"}} src={burgerIcon} alt="burgerIcon" {...props} />
);

export const Categories = (props: any) => (
    <img style={{cursor: "pointer"}} src={categories} alt="categories" {...props} />
);

export const Clients = (props: any) => (
    <img style={{cursor: "pointer"}} src={clients} alt="clients" {...props} />
);

export const DepartmentIcon = (props: any) => (
    <img style={{cursor: "pointer"}} src={departmentIcon} alt="departmentIcon" {...props} />
);

export const ProfileImageDemo = (props: any) => (
    <img style={{cursor: "pointer"}} src={profileImageDemo} alt="profileImageDemo" {...props} />
);

export const Projects = (props: any) => (
    <img style={{cursor: "pointer"}} src={projects} alt="projects" {...props} />
);

export const Tasks = (props: any) => (
    <img style={{cursor: "pointer"}} src={tasks} alt="tasks" {...props} />
);

export const OverView = (props: any) => (
    <img style={{cursor: "pointer"}} src={overView} alt="overView" {...props} />
);