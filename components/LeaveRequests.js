import React, { useState } from "react";
import { Table, Button, Drawer, Form, Input, Select } from "antd";

const { Column } = Table;
const { Option } = Select;

const dummyData = [
  {
    id: 1,
    name: "John Doe",
    department: "HR",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Finance",
  },
  {
    id: 3,
    name: "Michael Johnson",
    department: "Sales",
  },
  {
    id: 4,
    name: "Emily Davis",
    department: "Marketing",
  },
];

const EmployeeLeaveRequestsTable = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const showDrawer = (employee) => {
    setSelectedEmployee(employee);
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleFormSubmit = (values) => {
    // Perform the form submission logic here
    console.log("Submitted form values:", values);
    // Update the Employee Leave Requests data with the submitted values
    // You can use the employee ID (selectedEmployee.id) to find and update the specific employee's record
  };

  return (
    <div>
      <Table dataSource={dummyData}>
        <Column title="Employee ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Department" dataIndex="department" key="department" />
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
        title="Update Employee Leave Request"
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
              label="Department"
              name="department"
              initialValue={selectedEmployee.department}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Type of Leave"
              name="leaveType"
              rules={[
                { required: true, message: "Please select the type of leave" },
              ]}
            >
              <Select placeholder="Select Leave Type">
                <Option value="annual">Annual Leave</Option>
                <Option value="sick">Sick Leave</Option>
                <Option value="maternity">Maternity Leave</Option>
                <Option value="paternity">Paternity Leave</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Number of Days"
              name="numberOfDays"
              rules={[
                { required: true, message: "Please enter the number of days" },
              ]}
            >
              <Input type="number" min={1} />
            </Form.Item>
            <Form.Item
              label="Reason for Leave"
              name="reasonForLeave"
              rules={[
                {
                  required: true,
                  message: "Please provide a reason for leave",
                },
              ]}
            >
              <Input.TextArea rows={4} />
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

export default EmployeeLeaveRequestsTable;
