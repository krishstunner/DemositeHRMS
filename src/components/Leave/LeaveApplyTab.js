import React, { useState } from "react";
import { Dropdown, Button, Menu, message, Form } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import LeaveForm from "./LeaveForm";
import api from "../../service/api";
import Cookies from "js-cookie";
import moment from "moment";

import "../style.css";

function LeaveApplyTab() {
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

  return (
    <div className="leaveapplycontent">
      {/* <div> */}

      {/* </div>
      <div>Applying For Leave</div>
      <Dropdown className="typeofleave" overlay={menu} placement="bottomLeft">
        <Button className="applyLeaveButtons">
          Leave Type <DownOutlined />
        </Button>
      </Dropdown>
      <div className="leaverApplyContentstyle1">
        <div>
          <p>From date</p>
          <DatePicker className="leaveapplycontentdate" onChange={onChange} />
        </div>
        <div>
          <p>Sessions</p>
          <Dropdown
            className="typeofleave"
            overlay={menu}
            placement="bottomLeft"
          >
            <Button className="applyLeaveButtons">
              Session 1 <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="leaverApplyContentstyle2">
        <div>
          <p>To date</p>
          <DatePicker className="leaveapplycontentdate" onChange={onChange} />
        </div>
        <div>
          <p>Sessions</p>
          <Dropdown
            className="typeofleave"
            overlay={menu}
            placement="bottomLeft"
          >
            <Button className="applyLeaveButtons">
              Session 2 <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <Button className="applybtn">Apply</Button> */}
      <h2>Leave Application Form</h2>
      {/* <p>
        Leave is earned by the employee and granted by the employer to take time
        off work. The employee is free to avail this leave in accordance with
        the company policy.
      </p> */}

      <LeaveForm
        onSubmit={handleFormSubmission}
        form={form}
        isloading={isLoading}
      />
    </div>
  );
}

export default LeaveApplyTab;
