import axios from '@/api/index'
export const postArticleApi=(data:FormData)=>axios.post<null,BaseResponse>('/my/article/add',data)
export const getArticleListApi=(data:ArtListQuery)=>axios.get<null,ArticleListResponse>('/my/article/list',{params:data})
export const deleteArticleApi=(data:FormData)=>axios.delete<null,BaseResponse>('/my/article/info',{params:data})
export const getArticleApi=(id:string)=>axios.get<null,BaseResponse<ArticleEditForm>>('/my/article/info',{params:{id}})
export const putArticleApi=(data:FormData)=>axios.put<null,BaseResponse>('/my/article/info',data)