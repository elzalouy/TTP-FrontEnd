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
  techMembers: TechMemberInterface[] | null;
  loading: boolean | null;
  deptTechMembers: TechMemberInterface[] | null;
}
export const techMembersState: TechMembersInterface = {
  loading: null,
  techMembers: null,
  deptTechMembers: null,
};
