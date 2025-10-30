import  type {FC} from "react";
import CountDown from "../common/count-down";
import { Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
const EditResult: FC = () => {
  const navigate = useNavigate();
  const location=useLocation()
  const gotoList = () => {
    navigate("/art-list"+location.state);
  };
  return (
    <Result
      status="success"
      title="修改成功！"
      subTitle={<CountDown value={5} suffix="秒后自动跳转至文章列表页" onFinish={()=>gotoList()}/>}
      //subTitle='秒后自动跳转至文章列表页'
      extra={[
        <Button type="primary" key="list" onClick={gotoList}>
          去文章列表页
        </Button>,
      ]}
    />
  );
};

export default EditResult;
