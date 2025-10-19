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
  children:MenuItem[]
};
