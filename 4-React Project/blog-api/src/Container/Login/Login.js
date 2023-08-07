import { Button, Form, Input, Typography } from 'antd'
import React from 'react'
import "./Login.css"

function Login() {

  const { Title } = Typography
  const onFinish = (data) => {
    fetch(`https://blog-api-testing.squadcodersdev.com/api/login`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => console.log(data, "data"))
      .catch((error) => console.log(error))
  }

  return (
    <div className="custom-login-container">

      <Title level={2} className="custom-heading-login">
        Login
      </Title>
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
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
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
          <a className='sign-up-btn'>Sign Up</a>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
