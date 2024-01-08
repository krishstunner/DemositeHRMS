import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  message,
  Select,
  DatePicker,
  TextArea,
} from "antd";
import api from "@/service/config";
import moment from "moment";

const { Column } = Table;

const dummyData = [
  {
    id: 1,
    name: "John Doe",
    department: "HR",
    leavesGranted: 15,
    leavesRemaining: 10,
    lossOfPay: 2,
    designation: "Manager",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Finance",
    leavesGranted: 20,
    leavesRemaining: 18,
    lossOfPay: 0,
    designation: "Accountant",
  },
  {
    id: 3,
    name: "Michael Johnson",
    department: "Sales",
    leavesGranted: 12,
    leavesRemaining: 5,
    lossOfPay: 3,
    designation: "Sales Executive",
  },
  {
    id: 4,
    name: "Emily Davis",
    department: "Marketing",
    leavesGranted: 18,
    leavesRemaining: 10,
    lossOfPay: 1,
    designation: "Marketing Specialist",
  },
];

const EmployeesLeaveDetailsTable = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const [daysOfLeave, setDaysOfLeave] = useState(0);

  const [form] = Form.useForm();

  const { TextArea } = Input;
  const showDrawer = (employee) => {
    setSelectedEmployee(employee);
    console.log();
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
      .get(`getEmployeeLeavelist`)
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

  const stringExtract = (string) => {
    const inputString = string;
    const match = inputString.match(/\d+(\.\d+)?/);

    if (match) {
      var number = parseFloat(match[0]);
      return number;
    } else {
      return null;
    }
  };

  const leaveTypeExtract = (string) => {
    const inputString = string;
    const match = inputString.match(/[a-zA-Z]+/);

    if (match) {
      var alphabeticPart = match[0];
      return alphabeticPart;
      // Output: CausualLeaves
    } else {
      console.log("No alphabetic characters found in the string.");
      return null;
    }
  };
  const handleFormSubmit = async (values) => {
    // Perform the form submission logic here
    console.log("Submitted form values:", values);
    setisLoading(true);

    const leaveTypeDays = stringExtract(values.leaveType)
      ? stringExtract(values.leaveType)
      : 0;
    const leaveType = leaveTypeExtract(values.leaveType);
    const numberOfDays = values.daysOfLeave;
    if (values.daysOfLeave >= leaveTypeDays) {
      message.warning(
        "Number of days selected are not available, Retry with another date"
      );
      setisLoading(false);
      return;
    }
    let payload = {};
    if (leaveType == "CausualLeaves") {
      payload = {
        CausualLeaves: selectedEmployee.causualLeave - numberOfDays,
        leavesGranted: selectedEmployee.leavesGranted + numberOfDays,
      };
    } else if (leaveType == "medicalLeave") {
      payload = {
        medicalLeave: selectedEmployee.medicalLeave - numberOfDays,
        leavesGranted: selectedEmployee.leavesGranted + numberOfDays,
      };
    } else if (leaveType == "previlageLeave") {
      payload = {
        previlageLeave: selectedEmployee.previlageLeave - numberOfDays,
        leavesGranted: selectedEmployee.leavesGranted + numberOfDays,
      };
    } else if (leaveType == "lossOfPay") {
      payload = {
        lossOfPay: selectedEmployee.lossOfPay + numberOfDays,
        // leavesGranted: selectedEmployee.leavesGranted + numberOfDays
      };
    }

    await api
      .put(`leaves/${selectedEmployee.leaveId}`, {
        data: payload,
      })
      .then((res) => {
        // setDataSource(res.data);
        getEmployeeLeaveList();
        form.resetFields();
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: `Something went wrong`,
        });
        console.log(err);
        form.resetFields();
      });
    setSelectedEmployee(null);
    setIsDrawerVisible(false);
    setisLoading(false);
  };
  console.log("selected Employee", selectedEmployee);
  const calculateDaysOfLeave = (fromDate, toDate, fromSession, toSession) => {
    if (fromDate && toDate && fromSession && toSession) {
      let days =
        moment(toDate.$d, "YYYYMMDD").diff(
          moment(fromDate.$d, "YYYYMMDD"),
          "days"
        ) + 1; // Including the last day

      // Consider half days for Session 1 and Session 2
      console.log("days 123", days);
      if (fromSession == "Session 2") {
        days = days - 0.5;
      }
      if (toSession == "Session 1") {
        days = days - 0.5;
      }
      return days;
    }
    return 0;
  };

  const handleSessions = () => {
    const fromDate = form.getFieldValue("fromDate");
    const toDate = form.getFieldValue("toDate");
    const toSession = form.getFieldValue("toSession");
    const fromSession = form.getFieldValue("fromSession");
    const days = calculateDaysOfLeave(fromDate, toDate, fromSession, toSession);
    setDaysOfLeave(days);
    form.setFieldsValue({ daysOfLeave: days });
  };

  const handleFromDateChange = (date) => {
    const toDate = form.getFieldValue("toDate");
    const toSession = form.getFieldValue("toSession");
    const fromSession = form.getFieldValue("fromSession");
    const days = calculateDaysOfLeave(date, toDate, fromSession, toSession);
    setDaysOfLeave(days);
    form.setFieldsValue({ daysOfLeave: days });
  };

  const handleToDateChange = (date) => {
    const fromDate = form.getFieldValue("fromDate");
    const toSession = form.getFieldValue("toSession");
    const fromSession = form.getFieldValue("fromSession");
    const days = calculateDaysOfLeave(fromDate, date, fromSession, toSession);
    setDaysOfLeave(days);
    form.setFieldsValue({ daysOfLeave: days });
  };

  return (
    <div>
      {contextHolder}
      <Table
        dataSource={dataSource}
        scroll={{
          x: 1600,
          y: 400,
        }}
      >
        <Column title="Employee ID" dataIndex="id" key="id" fixed width={70} />
        <Column title="Name" width={150} dataIndex="name" fixed key="name" />
        <Column
          title="Number of Leaves Granted"
          dataIndex="leavesGranted"
          key="leavesGranted"
          width={200}
        />
        <Column
          title="Causual Leaves - Remaining"
          dataIndex="causualLeave"
          key="causualLeaves"
          width={200}
        />
        <Column
          title="Medical Leaves - Remaining"
          dataIndex="medicalLeave"
          key="medicalLeaves"
          width={200}
        />
        <Column
          title="Privilage Leaves - Remaining"
          dataIndex="previlageLeave"
          key="previlageLeaves"
          width={200}
        />
        <Column
          title="Action"
          key="action"
          fixed={"right"}
          width={150}
          render={(text, record) => (
            <Button type="primary" onClick={() => showDrawer(record)}>
              Update
            </Button>
          )}
        />
      </Table>

      <Drawer
        title="Employee Leave Details"
        visible={isDrawerVisible}
        onClose={closeDrawer}
        width={400}
      >
        {selectedEmployee && (
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              label="Name"
              name="name"
              initialValue={selectedEmployee.name}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Total Leaves to be granted"
              name="totalLeaves"
              initialValue={selectedEmployee.totalLeaves}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Number of Leaves Granted"
              name="leavesGranted"
              initialValue={selectedEmployee.leavesGranted}
            >
              <Input disabled />
            </Form.Item>

            {/* <Form.Item
              label="Number of Leaves Remaining"
              name="leavesRemaining"
              initialValue={selectedEmployee.leavesRemaining}
            >
              <Input disabled />
            </Form.Item> */}
            <Form.Item
              name="leaveType"
              label="Type of Leave"
              rules={[
                {
                  required: true,
                  message: "Please select leave type",
                },
              ]}
            >
              <Select
                // defaultValue=""
                // style={{ width: 235 }}
                // onChange={handleChange}
                placeholder="Select leave type"
                options={[
                  {
                    value: `medicalLeave${selectedEmployee.medicalLeave}`,
                    label: (
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: 110,
                        }}
                      >
                        <span> Medical Leave -</span>{" "}
                        {selectedEmployee.medicalLeave}
                      </span>
                    ),
                    disabled: selectedEmployee.medicalLeave ? false : true,
                  },
                  {
                    value: `CausualLeaves${selectedEmployee.causualLeave}`,
                    label: (
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: 110,
                        }}
                      >
                        <span>Causual Leave -</span>{" "}
                        {selectedEmployee.causualLeave}
                      </span>
                    ),
                    disabled: selectedEmployee.causualLeave ? false : true,
                  },
                  {
                    value: `previlageLeave${selectedEmployee.previlageLeave}`,
                    label: (
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: 110,
                        }}
                      >
                        <span>Privilage Leave -</span>{" "}
                        {selectedEmployee.previlageLeave}
                      </span>
                    ),
                    disabled: selectedEmployee.previlageLeave ? false : true,
                  },
                  { value: "lossOfPayDays", label: "Loss Of Pay" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="From Date"
              name="fromDate"
              rules={[{ required: true, message: "Please select From date!" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                onChange={handleFromDateChange}
                format="DD-MM-YYYY"
              />
            </Form.Item>

            <Form.Item
              label="From Session"
              name="fromSession"
              rules={[
                { required: true, message: "Please select From session!" },
              ]}
            >
              <Select placeholder="Select session" onChange={handleSessions}>
                <Option value="Session 1">Session 1</Option>
                <Option value="Session 2">Session 2</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="To Date"
              name="toDate"
              rules={[{ required: true, message: "Please select To date!" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                onChange={handleToDateChange}
                format="DD-MM-YYYY"
              />
            </Form.Item>

            <Form.Item
              label="To Session"
              name="toSession"
              rules={[{ required: true, message: "Please select To session!" }]}
            >
              <Select
                placeholder="Select session"
                onChange={handleSessions}
                handleSessions
              >
                <Option value="Session 1">Session 1</Option>
                <Option value="Session 2">Session 2</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Number of Days" name="daysOfLeave">
              <Input value={daysOfLeave} disabled />
            </Form.Item>
            <Form.Item
              label="Reason"
              name="reason"
              placeholder="Please enter reason for leave"
            >
              <TextArea />
            </Form.Item>

            <Form.Item>
              <Button type="primary" loading={isLoading} htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default EmployeesLeaveDetailsTable;
