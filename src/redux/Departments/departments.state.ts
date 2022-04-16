export interface Department {
  _id: string;
  name: string;
  boardId: string;
  defaultListId: string;
  reviewListId: string;
  sharedListID: string;
  doneListId: string;
  notClearListId: string;
  canceldListId: string;
  color: string;
  mainBoard: boolean;
  teamsId: {
    idInTrello: string;
    idInDB: any;
  }[];
  totalInProgress: number;
  totalDone: number;
}
export interface DepartmentsIterface {
  loading: boolean | null;
  departments: Department[];
}
const departmentsState: DepartmentsIterface = {
  loading: null,
  departments: [],
};
export default departmentsState;
