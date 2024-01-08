import React from "react";
import { Card, Row, Col } from "antd";

const EmployeeLeaveManagementPortal = () => {
  const HolidayCard = ({ holiday, date }) => {
    return (
      <Card>
        <h3 style={{ marginBottom: 16 }}>{holiday}</h3>
        <p>Date: {date}</p>
      </Card>
    );
  };

  const holidays = [
    { holiday: "New Year's Day", date: "January 1, 2023" },
    { holiday: "Martin Luther King Jr. Day", date: "January 16, 2023" },
    { holiday: "President's Day", date: "February 20, 2023" },
    { holiday: "Memorial Day", date: "May 29, 2023" },
    { holiday: "Independence Day", date: "July 4, 2023" },
    { holiday: "Labor Day", date: "September 4, 2023" },
    { holiday: "Columbus Day", date: "October 9, 2023" },
    { holiday: "Veterans Day", date: "November 10, 2023" },
    { holiday: "Thanksgiving Day", date: "November 23, 2023" },
    { holiday: "Christmas Day", date: "December 25, 2023" },
    // Add more holidays as needed
  ];

  return (
    <div>
      {/* <h2 style={{ marginBottom: "20px" }}>Employee Self Service</h2> */}
      <h2 style={{ marginBottom: 16 }}>Upcoming Holidays in 2023</h2>

      <Row gutter={[16, 16]}>
        {/* <Col span={8}>
<Card title="Apply for Leave" style={{ height: "100%" }}>
  <p>Submit a leave request for approval.</p>
 
</Card>
</Col>
<Col span={8}>
<Card title="View Leave Balance" style={{ height: "100%" }}>
  <p>Check the number of leave days available.</p>

</Card>
</Col>
<Col span={8}>
<Card title="View Leave History" style={{ height: "100%" }}>
  <p>View the history of approved and rejected leave requests.</p>
  
</Card>
</Col>

<Col span={8}>
<Card title="Cancel Leave" style={{ height: "100%" }}>
  <p>Cancel or modify an existing leave request.</p>

</Card>
</Col>
<Col span={8}>
<Card title="Leave Calendar" style={{ height: "100%" }}>
  <p>View the company-wide leave calendar.</p>
 
</Card>
</Col>
<Col span={8}>
<Card title="Leave Policies" style={{ height: "100%" }}>
  <p>Access and review the company's leave policies.</p>
  
</Card>
</Col> */}
        {holidays.map((item, index) => (
          <Col span={8}>
            <HolidayCard key={index} holiday={item.holiday} date={item.date} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EmployeeLeaveManagementPortal;
