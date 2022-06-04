export interface TechMemberInterface {
  _id?: string;
  name: string;
  departmentId: string;
  boardId?: string;
  isDeleted?:boolean
  trelloMemberId?: string;
  listId?: string;
  newBoardId?: string;
}
export interface TechMembersInterface {
  techMembers: TechMemberInterface[];
  loading: boolean | null;
  deptTechMembers: TechMemberInterface[];
}
export const techMembersState: TechMembersInterface = {
  loading: null,
  techMembers: [],
  deptTechMembers: [],
};
