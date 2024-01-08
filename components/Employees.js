import api from "@/service/config";
import { Table, Button, Drawer, Form, Input, message } from "antd";
import { useState, useEffect } from "react";

const EmployeeDetailsTable = () => {
  const [visible, setVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getEmployeeList();
  }, []);

  const getEmployeeList = async (page = 1, pageSize = 10) => {
    setisLoading(true);
    await api
      .get(`users?page=${page}&size=${pageSize}&sort=id:desc`)
      .then((res) => {
        setDataSource(res.data);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: `Something went worng`,
        });
        console.log(err);
      });
    const count = await api.get(`users/count`);
    setTotalUsers(count.data);
    setisLoading(false);
  };

  // const dataSource = [
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //     age: 30,
  //     qualification: 'Bachelor of Engineering',
  //     phone: '1234567890',
  //     email: 'john@example.com',
  //     designation: 'Software Engineer',
  //     dateOfJoining: '2021-01-01',
  //     address: '123 Main Street',
  //   },
  //   {
  //     id: 2,
  //     name: 'Jane Smith',
  //     age: 28,
  //     qualification: 'Master of Science',
  //     phone: '9876543210',
  //     email: 'jane@example.com',
  //     designation: 'Data Analyst',
  //     dateOfJoining: '2021-02-15',
  //     address: '456 Park Avenue',
  //   },
  //   // Add more sample data rows <here>...
  // ];

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Date of Joining",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          onMouseEnter={() => handleMouseEnter(record)}
          onClick={() => handleAction(record)}
        >
          Update
        </Button>
      ),
    },
  ];

  const handleMouseEnter = (record) => {
    setSelectedEmployee(record);
  };

  const handleAction = (record) => {
    setSelectedEmployee(record);
    setVisible(true);
  };

  const handleDrawerClose = () => {
    setSelectedEmployee(null);
    setVisible(false);
  };

  const handleFormSubmit = async (values) => {
    // Handle form submission and update the selected employee record
    setisLoading(true);
    const payload = { ...values };

    await api.put(`users/${selectedEmployee.id}`, payload);
    messageApi.open({
      type: "success",
      content: `User has been updated successfully`,
    });
    getEmployeeList();
    handleDrawerClose();
    setisLoading(false);
  };
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          total: totalUsers,
          onChange: (page, pageSize) => {
            getEmployeeList(page, pageSize);
          },
        }}
        bordered
      />
      {contextHolder}
      <Drawer
        title="Update Employee"
        visible={visible}
        onClose={handleDrawerClose}
        destroyOnClose={true}
        width={400}
      >
        {selectedEmployee && (
          <Form
            onFinish={handleFormSubmit}
            initialValues={selectedEmployee}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
          >
            <Form.Item
              name="username"
              label="Name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="age"
              label="Age"
              rules={[{ required: true, message: "Please enter the age" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="qualification"
              label="Qualification"
              rules={[
                { required: true, message: "Please enter the qualification" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone No"
              rules={[
                { required: true, message: "Please enter the phone number" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter the email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="designation"
              label="Designation"
              rules={[
                { required: true, message: "Please enter the designation" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter the address" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default EmployeeDetailsTable;
