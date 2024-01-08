import { Form, Input, Button } from 'antd';

const LoginForm = () => {
  const onFinish = (values) => {
    // Handle login form submission
  };

  return (
    <div style={{ width: '30%' }}>
      <Form name="login-form" onFinish={onFinish}>
        <Form.Item
          name="employeeId"
          rules={[{ required: true, message: 'Please enter your Employee ID!' }]}
        >
          <Input placeholder="Employee ID" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
