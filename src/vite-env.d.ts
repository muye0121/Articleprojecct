/// <reference types="vite/client" />

type RegForm = {
  username: string;
  password: string;
  repassword: string;
};
type LoginForm = Omit<RegForm, "repassword">;
interface BaseResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}
//登录接口返回的数据
interface LoginResponse extends BaseResponse {
  token: string;
}
type User = {
  readonly id: string;
  username: string;
  nickname?: string;
  email?: string;
  user_pic?: string;
};
type MenuItem = {
  readonly key: string;
  title?: string;
  label: string;
  icon: element;
  children: MenuItem[];
};
type UserInfoForm = Pick<User, "id" | "nickname" | "email">;
type ResetPwdForm = {
  old_pwd: string;
  new_ped: string;
  re_pwd: string;
};
type CateItem = {
  readonly id: number;
  cate_name: string;
  cate_alias: string;
};
type ArtCateAddForm = Omit<CateItem, "id">;
type ArticleAddForm = {
  title: string;
  cate_id: string;
  content: string;
  state: "草稿" | "已发布";
  cover_img: Blob;
  [x: string]: string | Blob;
};
type ArticleAddBaseForm = Partial<Pick<ArticleAddForm, "title" | "cate_id">>;
type ArticleEditBaseForm=ArticleAddBaseForm
type ArtListQuery = {
  pagenum: number;
  pagesize: number;
  cate_id: number | string;
  state: string;
};
type Article = {
  id: number;
  title: string;
  pub_date: string;
  state: "草稿" | "已发布";
  cate_name: string;
};
interface ArticleListResponse extends BaseResponse<Article[]> {
  total: number;
}
type ArticleEditForm = ArticleAddForm & { readonly id: string };
