import { Status } from "./BoardView";

export interface IClient {
    _id: string;
    clientName: string;
    doneProject: string[];
    inProgressProject: string[] | number;
    inProgressTask: string[];
    createdAt: string;
    image: any;
}
export interface IClientCard {
    client: IClient;
}
export interface IClientPopover {
    client: IClient;
}
export interface IClientHeader {
    client: IClient;
    preview: string;
}
export interface ITaskCounterContainer {
    id: string;
}
export interface ITaskNumber {
    title: string;
    param: Status;
    _id: string
}
export interface IProjectCounterContainer {
    done: string[];
    client: IClient;
    inProgressProject: number | string[];
}
export interface IProjectNumber {
    title: string;
    number: number | string[];
    dataTestId?: string;
}