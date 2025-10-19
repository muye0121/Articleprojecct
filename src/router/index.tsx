import { createBrowserRouter } from "react-router-dom";
import Reg, { action as regAction } from "@/views/auth/reg";
import Login, { action as logAction } from "@/views/auth/login";
import Root, { loader as rootloader } from "@/views/root/root";
import AuthRoot from "@/views/root/auth-root";
import Home from "@/views/home/home";
import AuthLayout from "@/views/auth/auth-layout";
import UserAvatar from "@/views/user/user-avatar";
import UserPassword from "@/views/user/user-password";
import UserInfo from "@/views/user/user-info";
import ArticleList from "@/views/article/article-list";
import ArticleEdit from "@/views/article/article-edit";
import ArticleCate from "@/views/article/article-cate";
import ArticleAdd from "@/views/article/article-add";
const rooter = createBrowserRouter([
  {
    path: "/reg",
    action: regAction,
    element: (
      <AuthLayout>
        <Reg />
      </AuthLayout>
    ),
  },
  {
    path: "/login",
    action: logAction,
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/",
    element: (
      <AuthRoot>
        <Root />
      </AuthRoot>
    ),
    loader: rootloader,
    children: [
      { index: true, element: <Home /> },
      {
        path: "home",
        element: <Home />,
      },
      { path: "user-info", element: <UserInfo /> },
      { path: "user-avatar", element: <UserAvatar /> },
      { path: "user-pwd", element: <UserPassword /> },
      { path: "art-cate", element: <ArticleCate /> },
      { path: "art-list", element: <ArticleList /> },
      { path: "art-add", element: <ArticleAdd /> },
      { path: "art-edit/:id", element: <ArticleEdit /> },
    ],
  },
]);
export default rooter;
