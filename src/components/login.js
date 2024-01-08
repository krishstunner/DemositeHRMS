import React, { useState } from "react";
import "antd/dist/antd.js";
import { Form, Input, Button, message } from "antd";
import "./style.css"; // Import custom CSS modules for styling
import { Router, useLocation, useNavigate } from "react-router";
import api from "../service/api";

import Cookies from "js-cookie";

const Login = () => {
  const [isLoading, setisLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setisLoading(true);
    console.log("Received values:", values);
    const payload = {
      identifier: values.employeeEmail,
      password: values.password,
    };
    const response = await api
      .post("auth/local", payload)
      .then((res) => {
        const jwtToken = res?.data?.jwt;
        const userDetails = res?.data?.user;
        Cookies.set("isLoggedIn", "true", { expires: 7 }); // Set a cookie for "isLoggedIn"
        Cookies.set("userDetails", JSON.stringify(userDetails), { expires: 7 }); // Set a cookie for user details
        Cookies.set("userToken", jwtToken, { expires: 7 });
        messageApi.open({
          type: "success",
          content: `Welcome ${userDetails.username}`,
        }); // Set a cookie for the user token
        navigate("/home");
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: `Invalid Employee Email or Password`,
          duration: 3,
        });
        console.log("error12", error);
      });
    setisLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      {contextHolder}
      {/* <div className="leftColumn"> */}
      {/* <img
          src="/assets/images/LoginLogo.jpg"
          alt=""
          objectFit="contain"
          srcset=""
        /> */}
      {/* </div> */}
      <div className="rightColumn">
        <div className="contentContainer">
          <h1 className="title">Human Resource Management System</h1>
          <p className="quote">
            “When people go to work, they shouldn’t have to leave their hearts
            at home.” – Betty Bender
          </p>
        </div>
        <div className="loginContainer">
          <h2 className="loginTitle">Login</h2>
          <Form
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelCol={{ span: 8 }}
            labelAlign="left"
            wrapperCol={{ span: 24 }}
          >
            <Form.Item
              label="Email"
              name="employeeEmail"
              rules={[
                {
                  required: true,
                  message: "Please enter your Email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your Password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button type="primary" loading={isLoading} htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
