import type { FC } from "react";
import { Header } from "antd/es/layout/layout";
import { Button, Avatar, Flex } from "antd";
import useUserStore, { selectAvatar, selectName } from "@/store/user-stores";
import styles from "@/components/root/css/header.module.less";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useAppStore, { setCollapsed, selectCollapse } from "@/store/app-store";
import Logout from "./logout";
import RootBreadcrumb from "@/views/root/breadcrumb";
const RootHeader: FC = () => {
  const name = useUserStore(selectName);
  const avatar = useUserStore(selectAvatar);
  const collapsed = useAppStore(selectCollapse);
  return (
    <Header className={styles.container}>
      <div className={styles.boxLeft}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className={styles.boxCollapsed}
        />
        <span>欢迎：{name},您当前的位置是:</span>
        {/*要做一个面包屑组件*/}
        <RootBreadcrumb />
      </div>
      <Flex align="center" vertical justify="center" >
        {avatar ? <Avatar src={avatar}  /> : <Avatar icon={<UserOutlined />} size='large'/>}
        <Logout />
      </Flex>
    </Header>
  );
};
export default RootHeader;
