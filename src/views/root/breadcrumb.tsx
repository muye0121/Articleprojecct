import type { FC } from "react";
import { Breadcrumb } from "antd";
import { useLoaderData, useLocation } from "react-router-dom";
import { useMemo } from "react";
type BreadcrumbItem = {
  title: string;
};
const RootBreadcrumb: FC = () => {
  const location = useLocation();
  const nowPath = location.pathname === "/" ? "/home" : location.pathname;
  const loaderdata = useLoaderData() as { menus: MenuItem[] } | null;
  const items = useMemo(() => {
    return resolveBreadcrumpItems(loaderdata?.menus, nowPath);
  }, [loaderdata, nowPath]);
  return <Breadcrumb items={items} />;
};
const resolveBreadcrumpItems = (
  menus: MenuItem[] | undefined,
  nowPath: string,
  breadcrumbItems: BreadcrumbItem[] = []
): BreadcrumbItem[] | undefined => {
  if (!menus) return;
  for (const item of menus) {
    if (item.key === nowPath) {
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
