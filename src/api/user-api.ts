import axios from "@/api/index";
export const getUserApi=()=>axios.get<null,BaseResponse<User>>('/my/userinfo')
export const getMenuApi=()=>axios.get<null,BaseResponse<MenuItem>>('/my/menus')
export const updateUserInfoApi=(data:FormData)=>axios.put<null,BaseResponse>('/my/userinfo',data)