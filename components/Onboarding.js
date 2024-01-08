import { Form, Input, Button, Select, DatePicker, message } from "antd";
import api from "../service/config";
import React, { useState } from "react";
import "antd/dist/antd.js";

const { Option } = Select;

const RegistrationForm = () => {
  const [isLoading, setisLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm(); // Create a form instance

  const onFinish = async (values) => {
    // Handle form submission
    setisLoading(true);
    const filteredData = Object.entries(values)
      .filter(([key, value]) => value !== null && value !== undefined)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    const payload = { ...filteredData };
    const response = await api
      .post("auth/local/register", payload)
      .then(async (res) => {
        console.log("res", res);
        await api.post("attendences", {
          data: { user: res?.data?.user?.id },
        });
        await api.post("administrations", {
          data: {
            user: res?.data?.user?.id,
            currentDesignation: payload.designation,
            currentDepartment: payload.department,
          },
        });
        await api.post("leaves", {
          data: { user: res?.data?.user?.id },
        });
        await api.post("exit-managements", {
          data: { user: res?.data?.user?.id },
        });
        messageApi.open({
          type: "success",
          content: `User has been registered successfully`,
        });
        form.resetFields(); // Reset the form fields
        // Router.push("/dashboard");
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: `Something went wrong while onboarding`,
        });
        console.log("error12", error);
      });
    setisLoading(false);
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The two passwords do not match."));
    },
  });

  return (
    <>
      {contextHolder}

      <Form
        form={form}
        name="registration-form"
        onFinish={onFinish}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 8 }}
        labelAlign="left"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => validateConfirmPassword({ getFieldValue }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="Age" name="age">
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input.TextArea />
        </Form.Item>

        {/* <Form.Item label="Gender" name="gender">
        <Select>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item> */}

        <Form.Item label="Qualification" name="qualification">
          <Input />
        </Form.Item>

        <Form.Item label="Date of Joining" name="dateOfJoining">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Phone no." name="phone">
          <Input type="tel" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not a valid email!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Department" name="department">
          <Input />
        </Form.Item>
        <Form.Item label="Designation" name="designation">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button
            type="primary"
            loading={isLoading}
            htmlType="submit"
            style={{
              background: "#001529",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegistrationForm;
