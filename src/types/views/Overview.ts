import { RouteComponentProps } from "react-router";

export interface IOverview {
    history: RouteComponentProps["history"];
    location: RouteComponentProps["location"];
    match: RouteComponentProps["match"];

}