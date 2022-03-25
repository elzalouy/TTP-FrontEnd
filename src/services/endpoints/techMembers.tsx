import api from "../api";
export default {
  getHttpTechMembers: (args: any) => api.get("getTechMember", args),
};
