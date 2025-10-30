import { createBrowserRouter } from "react-router-dom";
import AuthRoot from "@/views/root/auth-root";
import RouterErrorElement from "@/components/common/router-error-element";
import AuthLayout from "@/views/auth/auth-layout";
import PageNotFound from "@/components/common/404";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const router = createBrowserRouter([
  {
    path: "/reg",
    errorElement: <RouterErrorElement />,
    async lazy() {
      const { default: Reg, action } = await import("@/views/auth/reg");
      return {
        element: (
          <AuthLayout>
            <Reg />
          </AuthLayout>
        ),
        action,
      };
    },
  },
  {
    path: "/login",
    errorElement: <RouterErrorElement />,
    async lazy() {
      const { default: Login, action } = await import("@/views/auth/login");
      return {
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
        action,
      };
    },
  },
  {
    path: "/",
    errorElement: <RouterErrorElement />,
    async lazy() {
      const { default: Root, loader } = await import("@/views/root/root");
      return {
        element: (
          <AuthRoot>
            <Root />
          </AuthRoot>
        ),
        loader,
      };
    },
    children: [
      {
        errorElement: <RouterErrorElement />,
        children: [
          {
            index: true,
            async lazy() {
              const { default: Home } = await import("@/views/home/home");
              return {
                Component: Home,
              };
            },
          },
          {
            path: "home",
            async lazy() {
              const { default: Home } = await import("@/views/home/home");
              return {
                Component: Home,
              };
            },
          },
          {
            path: "user-info",
            async lazy() {
              const { default: UserInfo, action } = await import(
                "@/views/user/user-info"
              );
              return {
                Component: UserInfo,
                action,
              };
            },
          },
          {
            path: "user-avatar",
            async lazy() {
              const { default: UserAvatar, action } = await import(
                "@/views/user/user-avatar"
              );
              return {
                Component: UserAvatar,
                action,
              };
            },
          },
          {
            path: "user-pwd",
            async lazy() {
              const { default: UserPassword, action } = await import(
                "@/views/user/user-password"
              );
              return {
                Component: UserPassword,
                action,
              };
            },
          },
          {
            path: "art-cate",
            errorElement: <RouterErrorElement />,
            async lazy() {
              const {
                default: ArticleCate,
                action,
                loader,
              } = await import("@/views/article/article-cate");
              return {
                Component: ArticleCate,
                action,
                loader,
              };
            },
          },
          {
            path: "art-list",
            async lazy() {
              const {
                default: ArticleList,
                loader,
                action,
              } = await import("@/views/article/article-list");
              return {
                Component: ArticleList,
                action,
                loader,
              };
            },
          },
          {
            path: "art-add",
            async lazy() {
              const {
                default: ArticleAdd,
                action,
                loader,
              } = await import("@/views/article/article-add");
              return {
                Component: ArticleAdd,
                action,
                loader,
              };
            },
            shouldRevalidate: () => {
              return false;
            },
          },
          {
            path: "art-edit/:id",
            async lazy(){
              const {default:ArticleEdit,action,loader}=await import('@/views/article/article-edit')
              return {
                Component:ArticleEdit,
                action,
                loader,
              }
            },
            shouldRevalidate: () => {
              return false;
            },
          },
          { path: "*", element: <PageNotFound /> },
        ],
      },
    ],
  },
]);
router.subscribe((state)=>{
  if(state.navigation.location){
    NProgress.start()
  }else{
    NProgress.done()
  }
})
export default router;
