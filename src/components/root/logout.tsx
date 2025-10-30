import type { FC } from "react";
import type { PopconfirmProps } from "antd";
import { Button, Popconfirm } from "antd";
import { resetAllstore } from "@/store/resetters";
import { useNavigate } from "react-router-dom";
const Logout: FC = () => {
    const navigate=useNavigate()
  const confirm: PopconfirmProps["onConfirm"] = () => {
    resetAllstore();
    navigate('/login')
  };

  const cancel: PopconfirmProps["onCancel"] = () => {
    console.log("");
  };
  return (
    <>
      <Popconfirm
        title="退出登录"
        description="您确认退出登录吗？"
        onConfirm={confirm}
        onCancel={cancel}
        okText="确认"
        cancelText="取消"
      >
        <Button type="link" size="large">Logout</Button>
      </Popconfirm>
    </>
  );
};
export default Logout;
