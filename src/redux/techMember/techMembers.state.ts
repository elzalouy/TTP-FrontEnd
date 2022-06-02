export interface TechMemberInterface {
  _id?: string;
  name: string;
  departmentId: string;
  boardId?: string;
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
