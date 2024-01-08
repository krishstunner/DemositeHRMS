import { Table, Button, Drawer, Form, Input, message } from "antd";
import { useState, useEffect } from "react";
import api from "@/service/config";

const AdministrationPanelTable = () => {
  const [visible, setVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

  // const dataSource = [
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //     department: 'HR',
  //     designation: 'Manager',
  //   },
  //   {
  //     id: 2,
  //     name: 'Jane Smith',
  //     department: 'Finance',
  //     designation: 'Accountant',
  //   },
  //   // Add more sample data rows here...
  // ];

  useEffect(() => {
    getEmployeeAdminList();
  }, []);

  const getEmployeeAdminList = async (page = 1, pageSize = 10) => {
    setisLoading(true);
    await api
      .get(`getAdministrationlist`)
      .then((res) => {
        console.log("res", res);
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

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => handleAction(record)}>Update</Button>
      ),
    },
  ];

  const handleAction = (record) => {
    setSelectedEmployee(record);
    setVisible(true);
  };

  const handleDrawerClose = () => {
    setVisible(false);
  };

  const handleFormSubmit = (values) => {
    // Handle form submission and update the employee record
    console.log("Updated employee:", selectedEmployee.id, values);

    // Close the drawer
    setVisible(false);
  };

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
      {contextHolder}

      <Drawer
        title="Update Employee"
        visible={visible}
        onClose={handleDrawerClose}
        destroyOnClose={true}
        width={400}
      >
        {selectedEmployee && (
          <Form onFinish={handleFormSubmit} initialValues={selectedEmployee}>
            <Form.Item
              name="name"
              label="Employee Name"
              rules={[
                { required: true, message: "Please enter the employee name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="department"
              label="Department"
              rules={[
                { required: true, message: "Please enter the department" },
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
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default AdministrationPanelTable;
