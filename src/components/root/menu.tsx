import type { FC } from "react";
import { Menu } from "antd";
import {useNavigate,useLocation} from "react-router-dom";
import { useState } from "react";
import type { MenuProps } from "antd";
import { useAsyncValue } from "react-router-dom";
import {
  HomeOutlined,
  ReadOutlined,
  AppstoreOutlined,
  ProfileOutlined,
  FileAddOutlined,
  FileTextOutlined,
  UserOutlined,
  SolutionOutlined,
  PictureOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import '@/index.less'
const iconMap = {
  HomeOutlined: <HomeOutlined />,
  ReadOutlined: <ReadOutlined />,
  AppstoreOutlined: <AppstoreOutlined />,
  ProfileOutlined: <ProfileOutlined />,
  FileAddOutlined: <FileAddOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  UserOutlined: <UserOutlined />,
  SolutionOutlined: <SolutionOutlined />,
  PictureOutlined: <PictureOutlined />,
  KeyOutlined: <KeyOutlined />,
};
const rootSubmenuKeys = ["2", "3"]; 
const RootMenu: FC = () => {
  const [menuResult]=useAsyncValue() as[BaseResponse<MenuItem[]>]
  const menus=menuResult.data ||[]
  const navigate=useNavigate()
  const location=useLocation()
  const selectedkeys=location.pathname==='/'?'/home':location.pathname
  const [openKeys, setOpenKeys] = useState<string[]>([getOpenKey(menus,selectedkeys)]);
  resolveMenuIcon(menus);
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const onMenuItemClick:MenuProps['onClick']=({key})=>{
    navigate(key)
  }
  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menus}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onMenuItemClick}
        selectedKeys={[selectedkeys]}
      />
    </>
  );
};
export default RootMenu;
const resolveMenuIcon = (menus: MenuItem[]) => {
  for (const menu of menus) {
    const iconName = menu.icon as keyof typeof iconMap;
    menu.icon = iconMap[iconName];
    if (menu.children) {
      resolveMenuIcon(menu.children);
    }
  }
};
const getOpenKey=(menu:MenuItem[]|undefined,selectedKeys:string,parentkey:string=''):string=>{
  if(!menu) return ''
  for(const item of menu){
    if(item.key===selectedKeys)
      return parentkey
    if(item.children){
      const result=getOpenKey(item.children,selectedKeys,item.key)
      if(result){
        return result
      }
    }
  }
  return ''
}