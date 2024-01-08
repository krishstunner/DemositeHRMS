import React, { useState, useEffect } from "react";
import { Table, Button, Drawer, Form, Input, message, Radio } from "antd";
import api from "@/service/config";

const { Column } = Table;
const dummyData = [
  {
    id: 1,
    name: "John Doe",
    department: "HR",
    yearsOfService: 5,
    designation: "Manager",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Finance",
    yearsOfService: 3,
    designation: "Accountant",
  },
  {
    id: 3,
    name: "Michael Johnson",
    department: "Sales",
    yearsOfService: 7,
    designation: "Sales Executive",
  },
  {
    id: 4,
    name: "Emily Davis",
    department: "Marketing",
    yearsOfService: 2,
    designation: "Marketing Specialist",
  },
];

const InVoluntaryResignationTable = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

  const showDrawer = (employee) => {
    setSelectedEmployee(employee);
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  useEffect(() => {
    getEmployeeLeaveList();
  }, []);

  const getEmployeeLeaveList = async (page = 1, pageSize = 10) => {
    setisLoading(true);
    await api
      .get(`getAdministrationlist`)
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
  const handleFormSubmit = (values) => {
    // Perform the form submission logic here
    console.log("Submitted form values:", values);
    // Update the InVoluntary Resignation data with the submitted values
    // You can use the employee ID (selectedEmployee.id) to find and update the specific employee's record
  };

  return (
    <div>
      <Table dataSource={dataSource}>
        {contextHolder}
        <Column title="Employee ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Department" dataIndex="department" key="department" />
        <Column
          title="Years of Service"
          dataIndex="yearsOfService"
          key="yearsOfService"
        />
        <Column title="Designation" dataIndex="designation" key="designation" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Button type="primary" onClick={() => showDrawer(record)}>
              Update
            </Button>
          )}
        />
      </Table>

      <Drawer
        title="InVoluntary Resignation"
        visible={isDrawerVisible}
        onClose={closeDrawer}
        width={400}
      >
        {selectedEmployee && (
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              label="Name"
              name="name"
              initialValue={selectedEmployee.name}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Reason for Termination"
              name="reasonForTermination"
              rules={[
                {
                  required: true,
                  message: "Please provide a reason for termination",
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Confirm Termination"
              name="confirmTermination"
              rules={[
                { required: true, message: "Please confirm termination" },
              ]}
            >
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default InVoluntaryResignationTable;
