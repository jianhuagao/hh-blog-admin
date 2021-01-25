import { memo, useEffect, useState } from "react";
import { Button, Form, Input, Checkbox, message } from "antd";
import { login } from "@/service/login";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { PageWarp } from "./style";

const LoginBody = () => {
  const onFinish = (values) => {
    const { userid, userpwd } = values;
    login({ userid, userpwd })
      .then((res) => {
        message.success(`欢迎回来:${res.username}`);
        window.localStorage.setItem("user", JSON.stringify(res)); // 插入 对象转字符串
        window.location.reload();
      })
      .catch(() => {
        message.error("登录失败");
        window.localStorage.removeItem("user"); // 移除
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="userid"
        rules={[{ required: true, message: "请输入用户名!" }]}
      >
        <Input
          className="loginInp"
          bordered={false}
          placeholder="请输入账号"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="userpwd"
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input.Password
          className="loginInp"
          bordered={false}
          placeholder="请输入密码"
          size="large"
        />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>keep login</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          className="loginButton"
          shape="round"
          block={true}
          htmlType="submit"
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
const RegisterBody = () => {
  return <span>暂未开放</span>;
};
export default memo(function Login() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    window.innerWidth < 620 && setMobile(true);
  }, [setMobile]);
  return (
    <PageWarp>
      {mobile || <div className="left">{""}</div>}
      <div className="right">
        <div className="loginForm">
          <Router>
            <div className="loginTitle">
              <span className="loginLink loginLinkAction">
                <NavLink to="/login">登录</NavLink>
              </span>
              <span className="loginLink">
                <NavLink to="/register">注册</NavLink>
              </span>
            </div>
            <div className="loginBody">
              <Switch>
                <Redirect from="/" to="/login" exact={true} />
                <Route path="/login" children={<LoginBody />} />
                <Route path="/register" children={<RegisterBody />} />
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    </PageWarp>
  );
});
