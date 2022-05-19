export interface Department {
  _id: string;
  name: string;
  boardId: string;
  defaultListId: string;
  reviewListId: string;
  sharedListID: string;
  doneListId: string;
  notClearListId: string;
  notStartedListId: string;
  canceldListId: string;
  color: string;
  mainBoard: boolean;
  teamsId: {
    _id: string;
    name: string;
    departmentId: string;
    listId: string | null;
  }[];
  totalInProgress: number;
  totalDone: number;
}
export interface DepartmentsIterface {
  loading: boolean | null;
  departments: Department[];
  selectedDepart: Department | null;
}
const departmentsState: DepartmentsIterface = {
  loading: null,
  departments: [],
  selectedDepart: null,
};
export default departmentsState;
