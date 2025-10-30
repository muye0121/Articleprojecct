import axios from '@/api/index'
export const getCateListApi=()=>axios.get<null,BaseResponse<CateItem[]>>('/my/cate/list')
export const postCateApi=(data:FormData)=>axios.post<null,BaseResponse>('/my/cate/add',data)
export const editCateApi=(data:FormData)=>axios.put<null,BaseResponse>('/my/cate/info',data)
export const delCateApi=(data:FormData)=>axios.delete<null,BaseResponse>('/my/cate/del',{params:data})