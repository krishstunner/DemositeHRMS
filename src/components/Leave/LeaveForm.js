import React, { useEffect, useState } from "react";
import { Form, Select, DatePicker, Button, message, Input } from "antd";
import moment from "moment";

const { Option } = Select;

const LeaveForm = ({ onSubmit, form, isloading }) => {
  const [daysOfLeave, setDaysOfLeave] = useState(0);

  const onFinish = (values) => {
    // You can handle the form submission logic here
    onSubmit(values);
  };

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
    console.log("days", days);
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
    <Form
      name="leaveForm"
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      labelStyle={{}}
      labelAlign="left"
      form={form}
    >
      <Form.Item
        label="Applying for Leave"
        name="leaveType"
        rules={[{ required: true, message: "Please select leave type!" }]}
      >
        <Select placeholder="Select leave type">
          <Option value="CL">Casual Leave (CL)</Option>
          <Option value="SL">Sick Leave (SL)</Option>
          <Option value="PL">Privilege Leave (PL)</Option>
          <Option value="ML">Maternity Leave (ML)</Option>
        </Select>
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
        rules={[{ required: true, message: "Please select From session!" }]}
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
      <Form.Item
        label="Number of Days"
        name="daysOfLeave"
        rules={[{ required: true, message: "Please select To session!" }, {}]}
      >
        <Input value={daysOfLeave} disabled />
      </Form.Item>
      <Form.Item
        label="Reason for Leave"
        name="reason"
        rules={[
          { required: true, message: "Please provide a reason for leave!" },
        ]}
      >
        <Input.TextArea placeholder="Enter reason for leave" rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={isloading} type="primary" htmlType="submit">
          Apply
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LeaveForm;
