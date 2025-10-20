import axios from "@/api/index";
export const getUserApi=()=>axios.get<null,BaseResponse<User>>('/my/userinfo')
export const getMenuApi=()=>axios.get<null,BaseResponse<MenuItem>>('/my/menus')
export const updateUserInfoApi=(data:FormData)=>axios.put<null,BaseResponse>('/my/userinfo',data)
export const updatePwdApi=(data:FormData)=>axios.patch<null,BaseResponse>('/my/updatepwd',data)
export const updateAvatarApi=(data:FormData)=>axios.patch<null,BaseResponse>('/my/update/avatar',data)