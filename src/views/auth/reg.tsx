import type { FC } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space,message } from "antd";
import { Link } from "react-router-dom";
import { useSubmit,redirect,useNavigation} from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { regApi } from "@/api/auth.api";
import to from 'await-to-js'
const Reg: FC = () => {
  const submit=useSubmit();
  const navigation=useNavigation()
  const onFinish = (values:RegForm) => {
    submit(values,{
      method:'POST',
      action:'/reg'
    })
  };
  return (
    <Form onFinish={onFinish} size="large">
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "请输入用户名!" },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: "用户名必须是1-10位的字母数字！",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "请输入密码!" },
          { pattern: /^\S{6,15}$/, message: "密码必须是6-15位的非空字符！" },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="repassword"
        dependencies={['password']}
        validateFirst
        rules={[
          { required: true, message: "请确认密码!" },
          { pattern: /^\S{6,15}$/, message: "密码必须是6-15位的非空字符！" },
          ({getFieldValue})=>({
            validator(_,value){
                if(value===getFieldValue('password'))return Promise.resolve()
                return Promise.reject(new Error('两次密码不一致'))
            }})
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>

      <Form.Item>
        <Space direction="vertical">
          <Button type="primary" htmlType="submit" loading={navigation.state!='idle'&&{delay:200}}>
            Register
          </Button>
          <div>
            Or <Link to="/login">login now!</Link>
          </div>
        </Space>
      </Form.Item>
    </Form>
  );
};
export const action=async ({request}:ActionFunctionArgs)=>{
  const fd=await request.formData()
  //调用注册的接口
  const [err]=await to(regApi(fd))
  if(err) return null
  return redirect('/login?uname='+fd.get('username'))
}
export default Reg;
