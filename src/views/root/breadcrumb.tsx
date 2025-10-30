import type { FC } from "react";
import { Breadcrumb } from "antd";
import { matchPath, useAsyncValue,useLocation } from "react-router-dom";
import { useMemo } from "react";
type BreadcrumbItem = {
  title: string;
};
const RootBreadcrumb: FC = () => {
  const location = useLocation();
  const nowPath = location.pathname === "/" ? "/home" : location.pathname;
  const [menuResult]=useAsyncValue() as [BaseResponse<MenuItem[]>]
  const menus=useMemo(()=>{
    return menuResult.data||[]
  },[menuResult])
  const items = useMemo(() => {
    return resolveBreadcrumpItems(menus, nowPath);
  }, [menus, nowPath]);
  return <Breadcrumb items={items} />;
};
const resolveBreadcrumpItems = (
  menus: MenuItem[] | undefined,
  nowPath: string,
  breadcrumbItems: BreadcrumbItem[] = []
): BreadcrumbItem[] | undefined => {
  if (!menus) return;
  for (const item of menus) {
    const matchResult=matchPath(item.key,nowPath)
    if (matchResult) {
      breadcrumbItems.unshift({ title: item.label });
      return breadcrumbItems;
    }
    if (item.children) {
      const result = resolveBreadcrumpItems(
        item.children,
        nowPath,
        breadcrumbItems
      );
      if (result) {
        breadcrumbItems.unshift({ title: item.label });
        return breadcrumbItems;
      }
    }
  }
};
export default RootBreadcrumb;
