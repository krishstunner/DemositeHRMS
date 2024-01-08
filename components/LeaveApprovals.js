import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Radio,
  message,
} from "antd";
import api from "../service/config";
import Cookies from "js-cookie";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Column } = Table;
const { Option } = Select;

const dummyData = [
  {
    id: 1,
    name: "John Doe",
    department: "HR",
    leaveApprovalStatus: "Pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Finance",
    leaveApprovalStatus: "Approved",
  },
  {
    id: 3,
    name: "Michael Johnson",
    department: "Sales",
    leaveApprovalStatus: "Pending",
  },
  {
    id: 4,
    name: "Emily Davis",
    department: "Marketing",
    leaveApprovalStatus: "Pending",
  },
];

const EmployeeLeaveApprovalsTable = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getLeaveApprovals();
  }, []);

  const getLeaveApprovals = async () => {
    const userDetails = JSON.parse(Cookies.get("userDetails"));
    const userId = userDetails.id;
    await api
      .post(`leaveApprovalListEmp`, {
        leaveStatus: "Waiting for Approval",
      })
      .then((res) => {
        console.log(res);
        setTableData(res.data);
        // message.success("Leave application submitted successfully");
      })
      .catch((err) => {
        message.error("Something went wrong");
        console.log(err);
      });
  };
  const showDrawer = (employee) => {
    setSelectedEmployee(employee);
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleFormSubmit = async (values) => {
    // Perform the form submission logic here
    setisLoading(true);
    const userDetails = JSON.parse(Cookies.get("userDetails"));
    const userId = userDetails.id;
    const payload = [
      {
        approval: "Approved",
        leaveType: values.leaveType,
        fromDate: moment(values.fromDate.$d).format("DD-MM-YYYY hh:mm:ss"),
        fromSession: values.fromSession,
        toDate: moment(values.toDate.$d).format("DD-MM-YYYY hh:mm:ss"),
        toSession: values.toSession,
        reason: values.reason,
        noOfDays: values.daysOfLeave,
      },
    ];
    // Add your API calls or other logic here
    await api
      .put(`leaveAppyEmp`, { payload, userId: userId })
      .then((res) => {
        form.resetFields();
        message.success("Leave application submitted successfully");
      })
      .catch((err) => {
        message.error("Something went wrong");
        console.log(err);
      });
    setisLoading(false);
    console.log("Submitted form values:", values);
    // Update the Employee Leave Approvals data with the submitted values
    // You can use the employee ID (selectedEmployee.id) to find and update the specific employee's record
  };
  console.log("selectedEmployee", selectedEmployee);

  return (
    <div>
      <Table dataSource={tableData}>
        <Column
          title="Employee ID"
          dataIndex="userId"
          key="userId"
          width={150}
        />
        <Column title="Name" dataIndex="name" key="name" />
        {/* <Column title="Department" dataIndex="department" key="department" /> */}
        <Column
          title="Leave Approval Status"
          dataIndex="approvalStatus"
          key="leaveApprovalStatus"
          render={(text, record) => (
            <div
              style={{
                backgroundColor: "orange",
                textAlign: "center",
                padding: 5,
                margin: "0 100 0 100",
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
        title="Update Employee Leave Approval"
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
            {/* <Form.Item
              label="Department"
              name="department"
              initialValue={selectedEmployee.department}
            >
              <Input disabled />
            </Form.Item> */}
            <Form.Item
              label="Type of Leave"
              name="leaveType"
              initialValue={selectedEmployee.leaveType}
              rules={[
                { required: true, message: "Please select the type of leave" },
              ]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Fron Date"
              name="fromDate"
              initialValue={moment(
                selectedEmployee.fromDate,
                "DD-MM-YYYY"
              ).format("DD-MM-YYYY")}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="From Session"
              name="fromSession"
              initialValue={selectedEmployee.fromSession}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="To Date"
              name="toDate"
              initialValue={moment(
                selectedEmployee.toDate,
                "DD-MM-YYYY"
              ).format("DD-MM-YYYY")}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="To Session"
              name="toSession"
              initialValue={selectedEmployee.toSession}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Number of Days"
              name="numberOfDays"
              initialValue={selectedEmployee?.numberOfDays?.toString()}
              // rules={[
              //   { required: true, message: "Please enter the number of days" },
              // ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Reason for Leave"
              name="reasonForLeave"
              initialValue={selectedEmployee.reasonForLeave}
              // rules={[
              //   {
              //     required: true,
              //     message: "Please provide a reason for leave",
              //   },
              // ]}
            >
              <Input.TextArea disabled rows={4} />
            </Form.Item>
            <Form.Item
              label="Approve"
              name="approve"
              // rules={[
              //   { required: true, message: "Please select an approval status" },
              // ]}
            >
              <Radio.Group>
                <Radio value="approved">Approve</Radio>
                <Radio value="rejected">Reject</Radio>
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

export default EmployeeLeaveApprovalsTable;
