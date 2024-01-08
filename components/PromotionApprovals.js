import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Radio,
  message,
  Popconfirm,
} from "antd";
import api from "@/service/config";
import PopConfirm from "./popConfirm";

const { Column } = Table;

const dummyData = [
  {
    id: 1,
    name: "John Doe",
    department: "HR",
    currentDesignation: "Associate",
    approvalStatus: "Pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Finance",
    currentDesignation: "Analyst",
    approvalStatus: "Pending",
  },
  {
    id: 3,
    name: "Michael Johnson",
    department: "Sales",
    currentDesignation: "Manager",
    approvalStatus: "Pending",
  },
  {
    id: 4,
    name: "Emily Davis",
    department: "Marketing",
    currentDesignation: "Coordinator",
    approvalStatus: "Pending",
  },
];

const EmployeePromotionApprovalsTable = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const [popData, setPopData] = useState({
    title: "",
    description: "",
    open: false,
  });
  const [formValues, setformValues] = useState(null);
  const showDrawer = (employee) => {
    console.log("employee", employee);
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
      .get(`getPromotionApprovelist`)
      .then((res) => {
        const data = res.data.returnval.map((res) => {
          return {
            administrationId: res.administrationId,
            id: res.id,
            name: res.name,
            designation: res.designation,
            department: res.department,
            newDesignation: res.promotionApproval.newDesignation,
            approvalStatus: res.promotionApproval.approval,
            feedback: res.promotionApproval.feedback,
            promotionApproval: res.promotionApproval,
          };
        });
        console.log(data);
        setDataSource(data);
        setTotalUsers(res.data.count);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: `Something went worng`,
        });
        console.log(err);
      });
    setisLoading(false);
  };
  console.log("selectedEm".selectedEmployee);
  const handleFormSubmit = async (values) => {
    setPopData({
      title: "",
      description: "",
      open: false,
    });
    // Perform the form submission logic here
    setisLoading(true);
    console.log("selectedE", selectedEmployee);
    const administrationData = await api.get(
      `administrations/${selectedEmployee.administrationId}`
    );
    console.log("administrationData", administrationData);
    const pastDesignation =
      administrationData?.data?.data?.attributes?.pastDesignation;
    let payload = {
      promotionApproval: [{ ...formValues }],
      pastDesignation: pastDesignation
        ? [
            ...pastDesignation,
            {
              designation: formValues.currentDesignation,
              department: formValues.currentDepartment,
              feedback: formValues.feedback,
            },
          ]
        : [
            {
              designation: formValues.currentDesignation,
              department: formValues.currentDepartment,
              feedback: formValues.feedback,
            },
          ],
      currentDesignation: formValues.newDesignation,
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

  const handleOpenPop = (values) => {
    console.log("Submitted form values:", values);

    let title =
      values.approvalStatus == "Approve"
        ? "Approve Promotion"
        : "Reject Promotion";
    let description =
      values.approvalStatus == "Approve"
        ? "Are you sure want to approve this promotion"
        : "Are you sure want to reject the promotion";
    setPopData({ title: title, description: description, open: true });
    setformValues({
      currentDepartment: values.department,
      currentDesignation: values.currentDesignation,
      newDesignation: values.newDesignation,
      feedback: values.feedback,
      approval: "Approved",
    });
  };
  const handleCancel = () => {
    setPopData({
      title: "",
      description: "",
      open: false,
    });
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
          title="New Designation"
          dataIndex="newDesignation"
          key="newDesignation"
        />
        <Column
          title="Approval Status"
          dataIndex="approvalStatus"
          key="approvalStatus"
          render={(text, record) => (
            <div
              style={{
                backgroundColor: "orange",
                textAlign: "center",
                padding: 5,
                border: "2px solid red",
                borderRadius: 5,
                color: "white",
              }}
            >
              {text}
            </div>
          )}
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
        title="Update Employee Promotion Approval"
        visible={isDrawerVisible}
        onClose={closeDrawer}
        width={400}
      >
        {selectedEmployee && (
          <Form layout="vertical" onFinish={handleOpenPop}>
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
              initialValue={selectedEmployee.newDesignation}
              rules={[
                { required: true, message: "Please enter the new designation" },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Feedback on Previous Role"
              name="feedback"
              initialValue={selectedEmployee.feedback}
              rules={[
                {
                  required: true,
                  message: "Please provide feedback on the previous role",
                },
              ]}
            >
              <Input.TextArea disabled rows={4} />
            </Form.Item>
            <Form.Item
              label="Approval Status"
              name="approvalStatus"
              rules={[
                { required: true, message: "Please select an approval status" },
              ]}
            >
              <Radio.Group>
                <Radio value="Approve">Approve</Radio>
                <Radio value="Reject">Reject</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Popconfirm
                title={popData.title}
                description={popData.description}
                open={popData.open}
                onConfirm={handleFormSubmit}
                okText={"Yes"}
                // okButtonProps={{
                //   loading: confirmLoading,
                // }}
                onCancel={handleCancel}
              >
                <Button type="primary" loading={isLoading} htmlType="submit">
                  Submit
                </Button>
              </Popconfirm>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default EmployeePromotionApprovalsTable;
