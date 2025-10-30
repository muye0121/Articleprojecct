import styles from "@/views/root/CSS/root.module.less";
import logo from "@/assets/images/logo.svg";
import useAppStore, { selectCollapse } from "@/store/app-store";
import { Layout,Spin} from "antd";
import RootHeader from "@/components/root/header";
import { initUser } from "@/store/user-stores";
import { Suspense } from "react";
import { getMenuApi } from "@/api/user-api";
import { defer, Await, Outlet } from "react-router-dom";
import RootMenu from "@/components/root/menu";
import { useLoaderData } from "react-router-dom";
const { Sider, Content, Footer } = Layout;
const Root: React.FC = () => {
  const collapsed = useAppStore(selectCollapse);
  const loaderData = useLoaderData() as {
    result: Promise<[BaseResponse<MenuItem>, void]>;
  };
  return (
    <Suspense fallback={<Spin fullscreen/>}>
      <Await resolve={loaderData.result} >
        {() => {
          return (
            <>
              <Layout className={styles.container}>
                {/*侧边栏*/}
                <Sider trigger={null} collapsible collapsed={collapsed}>
                  {/*logo区域*/}
                  <div className={styles.boxLogo}>
                    <img src={logo} alt="log" className={styles.logo} />
                    {!collapsed && (
                      <span className={styles.logoText}>文章管理系统</span>
                    )}
                  </div>
                  {/*左侧菜单*/}
                  <RootMenu />
                </Sider>
                <Layout>
                  {/*头部区*/}
                  <RootHeader />
                  {/*内容区*/}
                  <Content className={styles.content}>
                    <Outlet />
                  </Content>
                  {/*底部区域*/}
                  <Footer className={styles.footer}>
                    Powered by &copy;刘进
                  </Footer>
                </Layout>
              </Layout>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};
export default Root;
export const loader = async () => {
  const result = Promise.all([getMenuApi(), initUser()]);
  return defer({ result });
};
