import type { FC } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Button, Input, Space, message } from "antd";
import { Link } from "react-router-dom";
import {
  useFetcher,
  ActionFunctionArgs,
  useSearchParams,
} from "react-router-dom";
import to from "await-to-js";
import { loginApi } from "@/api/auth.api";
import { setToken } from "@/store/app-store";
const Login: FC = () => {
  const [searchParams] = useSearchParams();
  const loginFetcher = useFetcher();
  const [form] = Form.useForm();
  const onFinish = (values: LoginForm) => {
    if(loginFetcher.state==='submitting') return
    form.resetFields();
    loginFetcher.submit(values, {
      method: "POST",
      action: "/login",
    });
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{ username: searchParams.get("uname") }}
      size="large"
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "请输入用户名！" },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: "用户名必须是1-10位的字母数字!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "请输入密码!" },
          { pattern: /^\S{6,15}$/, message: "密码必须是6-15位的非空字符!" },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Space direction="vertical">
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={loginFetcher.state ==='submitting' && { delay: 200 }}
          >
            Log in
          </Button>
          <div>
            or <Link to="/reg">Register now!</Link>
          </div>
        </Space>
      </Form.Item>
    </Form>
  );
};
export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  //调用登录的接口
  const [err, res] = await to(loginApi(fd));
  if (err) return null;
  setToken(res.token);
  message.success('登陆成功')
};
export default Login;
