export interface ITeam {
  _id?: string;
  name: string;
  listId: string;
  isDeleted: boolean;
}
export interface IList {
  _id: string;
  name: string;
  listId: string;
}

export interface IDepartmentState {
  _id: string;
  name: string;
  lists?: IList[];
  color?: string;
  teams: ITeam[];
  boardURL?: string;
  boardId: string;
}

export interface IDepartmentsSlice {
  loading: boolean;
  departments: IDepartmentState[];
  edit?: IDepartmentState;
  delete?: IDepartmentState;
}
export const initDepartmentState: IDepartmentState = {
  id: "",
  name: "",
  lists: [],
  color: "",
  teams: [],
  boardURL: "",
  boardId: "",
};
