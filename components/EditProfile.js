import React from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditProfileForm = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Perform the form submission logic here
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form validation failed:", errorInfo);
  };

  return (
    <Form
      name="editProfileForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 5 }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please enter your name" },
          {
            max: 50,
            message: "Name must be less than or equal to 50 characters",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone No"
        name="phoneNo"
        rules={[
          { required: true, message: "Please enter your phone number" },
          {
            pattern: /^\d{10}$/,
            message: "Please enter a valid 10-digit phone number",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[
          { required: true, message: "Please enter your address" },
          {
            max: 100,
            message: "Address must be less than or equal to 100 characters",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Profile Picture"
        name="profilePicture"
        rules={[
          { required: true, message: "Please upload your profile picture" },
        ]}
      >
        <Upload>
          <Button icon={<UploadOutlined />}>Browse</Button>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProfileForm;
