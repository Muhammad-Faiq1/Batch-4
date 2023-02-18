import { Button, Form, Input, Typography } from "antd";

import React from "react";
import "./Login.css";

const { Title } = Typography;
function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="custom-login-container">
      <Title level={2} className="custom-heading-login">
        Login
      </Title>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
          initialValue="retta.schimmel@example.com"
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          initialValue="admin123@"
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-mr">
            Submit
          </Button>

          <a> Sign Up</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
