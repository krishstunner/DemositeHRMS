import React, { useState } from "react";
import { Dropdown, Button, Menu, message, Form } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import LeaveForm from "./LeaveForm";
import api from "../../service/api";
import Cookies from "js-cookie";
import moment from "moment";
import "../style.css";

function Restrictedholidaysapplytab() {
  const [form] = Form.useForm();
  const [isLoading, setisLoading] = useState(false);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">Casual Leave (CL)</Menu.Item>
      <Menu.Item key="2">Sick Leave (SL)</Menu.Item>
      <Menu.Item key="3">Maternity Leave (ML)</Menu.Item>
    </Menu>
  );
  const handleFormSubmission = async (values) => {
    // Custom logic for handling form submission
    setisLoading(true);
    console.log("values", values);
    const userDetails = JSON.parse(Cookies.get("userDetails"));
    const userId = userDetails.id;
    const payload = [
      {
        approval: "Waiting for Approval",
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
      .post(`leaveAppyEmp`, { payload, userId: userId })
      .then((res) => {
        form.resetFields();
        message.success("Leave application submitted successfully");
      })
      .catch((err) => {
        message.error("Something went wrong");
        console.log(err);
      });
    setisLoading(false);
  };
  // const dataSource = [
  // {
  //   key: "1",
  //   name: "Sick Leave",
  //   Status: "Pending",
  //   days: "05",
  //   from: "10-12-2023",
  //   to: "15-12-2023",
  // },
  //   {
  //     key: "2",
  //     name: "Casual Leave",
  //     Status: "Pending",
  //     days: "05",
  //     from: "10-12-2023",
  //     to: "15-12-2023",
  //   },
  // ];
  // const columns = [
  //   {
  //     title: "Type of Leave",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "Status",
  //     key: "Status",
  //   },
  //   {
  //     title: "From",
  //     dataIndex: "from",
  //     key: "from",
  //   },
  //   {
  //     title: "To",
  //     dataIndex: "to",
  //     key: "to",
  //   },
  //   {
  //     title: "No of Days",
  //     dataIndex: "days",
  //     key: "days",
  //   },
  // ];

  // const items = [
  //   {
  //     key: "1",
  //     label: "Info",
  //     children: <Table dataSource={dataSource} columns={columns} />,
  //   },
  // ];
  // // const { RangePicker } = DatePicker;
  // // const onChange = (key) => {
  //   // console.log(key);
  // };
  return (
    <div>
      <h2>Restricted Holidays Form</h2>
      {/* <div className="Restrictedholidays"> */}
      {/* Restricted holidays are the holidays for which the employees have option */}
      {/* to choose whether or not to take leave. */}
      {/* </div> */}
      {/* // <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} /> */}
      <LeaveForm
        onSubmit={handleFormSubmission}
        form={form}
        isloading={isLoading}
      />
    </div>
  );
}

export default Restrictedholidaysapplytab;
