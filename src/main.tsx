import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
// App 根组件
import { RouterProvider } from "react-router-dom";
import root from "./router";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zhCN}>
    <RouterProvider router={root}></RouterProvider>
  </ConfigProvider>
);
