import { Status } from "./BoardView";

export interface IClient {
  _id?: string;
  clientName?: string;
  doneProject?: string | number;
  inProgressProject?: string | number;
  inProgressTask?: string | number;
  createdAt?: string;
  image?: any;
}
export interface IClientState {
  image: File | null | any;
  clientName: string;
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
  id: string | undefined;
}
export interface ITaskNumber {
  title: string;
  param: Status;
  _id: string | undefined;
}
export interface IProjectCounterContainer {
  done?: string | number;
  client: IClient;
  inProgressProject?: number | string;
}
export interface IProjectNumber {
  title: string;
  number?: number | string;
  dataTestId?: string;
}
