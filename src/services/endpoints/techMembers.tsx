import api from "../api";
export default {
  getHttpTechMembers: (args: any) => api.get("getTechMember",args),
  createTechMember: (args: any) => api.post("createTechMember", args),
  deleteTechMember: (args:any)=>api.delete("deleteTechMembers",args)
};
