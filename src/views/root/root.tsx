import styles from '@/views/root/CSS/root.module.less'
import logo from '@/assets/images/logo.svg'
import useAppStore,{selectCollapse} from '@/store/app-store';
import { Layout, message,} from 'antd';
import RootHeader from '@/components/root/header';
import { initUser } from '@/store/user-stores';
import { getMenuApi } from '@/api/user-api';
import to from 'await-to-js';
import { Outlet } from 'react-router-dom';
import RootMenu from '@/components/root/menu';
const {Sider, Content ,Footer} = Layout;

const Root: React.FC = () => {
    const collapsed=useAppStore(selectCollapse)
  return (
    <Layout className={styles.container}>
        {/*侧边栏*/}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/*logo区域*/}
        <div className={styles.boxLogo}>
            <img src={logo} alt="log" className={styles.logo}/>
            {!collapsed && <span className={styles.logoText}>文章管理系统</span>}
        </div>
        {/*左侧菜单*/}
        <RootMenu/>
      </Sider>
      <Layout>
        {/*头部区*/}
        <RootHeader/>
        {/*内容区*/}
        <Content className={styles.Content}>
          <Outlet/>
        </Content>
        {/*底部区域*/}
        <Footer className={styles.footer}>Powered by &copy;刘进</Footer>
      </Layout>
    </Layout>
  );
};

export default Root;
export const loader=async ()=>{
  initUser()
  const [err,res]=await to(getMenuApi())
  if(err) return null
  message.success("登陆成功")
  return {menus:res.data}
}