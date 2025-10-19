import axios from '@/api/index'
export const regApi=(data:FormData)=>axios.post<null,BaseResponse>('/api/reg',data)
export const loginApi=(data:FormData)=>axios.post<null,LoginResponse>('/api/login',data)