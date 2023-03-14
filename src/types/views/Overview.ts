import { RouteComponentProps } from "react-router";

export interface IOverview {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

export interface FiltersParams {
  categoryId?: string;
  projectId?: string;
}
export interface FiltersProps {
  filters: FiltersParams;
  setFilters: any;
}
