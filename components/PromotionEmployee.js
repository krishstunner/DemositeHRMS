import React, { useState, useEffect } from "react";
import { Table, Button, Drawer, Form, Input, message } from "antd";
import api from "@/service/config";

const { Column } = Table;

const dummyData = [
  {
    id: 1,
    name: "John Doe",
    department: "HR",
    currentDesignation: "Associate",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Finance",
    currentDesignation: "Analyst",
  },
  {
    id: 3,
    name: "Michael Johnson",
    department: "Sales",
    currentDesignation: "Manager",
  },
  {
    id: 4,
    name: "Emily Davis",
    department: "Marketing",
    currentDesignation: "Coordinator",
  },
];

const EmployeePromotionTable = () => {
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
    setSelectedEmployee(null);
    getEmployeeAdministrationList();
  }, []);

  const getEmployeeAdministrationList = async (page = 1, pageSize = 10) => {
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
  const handleFormSubmit = async (values) => {
    // Perform the form submission logic here
    console.log("Submitted form values:", values);
    setisLoading(true);
    console.log("selectedE", selectedEmployee);
    const approval = selectedEmployee.promotionApproval?.find((p) => {
      if (p.approval == "Waiting for Approval") {
        return true;
      }
    });
    console.log("approval", approval);
    if (approval) {
      messageApi.open({
        type: "error",
        content: `Already Promotion Approval is in process for this user`,
      });
      // setSelectedEmployee(null);
      setisLoading(false);
      // setIsDrawerVisible(false);
      return;
    }

    let payload = selectedEmployee.promotionApproval
      ? {
          promotionApproval: [
            ...selectedEmployee.promotionApproval,
            {
              currentDepartment: values.department,
              currentDesignation: values.currentDesignation,
              newDesignation: values.newDesignation,
              feedback: values.feedback,
              approval: "Waiting for Approval",
            },
          ],
        }
      : {
          promotionApproval: [
            {
              currentDepartment: values.department,
              currentDesignation: values.currentDesignation,
              newDesignation: values.newDesignation,
              feedback: values.feedback,
              approval: "Waiting for Approval",
            },
          ],
        };
    console.log("payload", payload);
    await api
      .put(`administrations/${selectedEmployee.administrationId}`, {
        data: payload,
      })
      .then((res) => {
        // setDataSource(res.data);
        getEmployeeAdministrationList();
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: `Something went wrong`,
        });
        console.log(err);
      });
    setisLoading(false);
    setIsDrawerVisible(false);
    setSelectedEmployee(null);
    // Update the Employee Promotion data with the submitted values
    // You can use the employee ID (selectedEmployee.id) to find and update the specific employee's record
  };

  return (
    <div>
      {contextHolder}
      <Table dataSource={dataSource}>
        <Column title="Employee ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Department" dataIndex="department" key="department" />
        <Column
          title="Current Designation"
          dataIndex="designation"
          key="currentDesignation"
        />
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
        title="Update Employee Promotion"
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
              label="Current Designation"
              name="currentDesignation"
              initialValue={selectedEmployee.designation}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Promoted to"
              name="newDesignation"
              rules={[
                { required: true, message: "Please enter the new designation" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Feedback on Previous Role"
              name="feedback"
              rules={[
                {
                  required: true,
                  message: "Please provide feedback on the previous role",
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default EmployeePromotionTable;
