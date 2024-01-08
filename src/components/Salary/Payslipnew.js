import React from "react";
import { Card, Row, Col } from "antd";

const Payslip = ({ employee }) => {
  return (
    <Card title={employee.title} style={{ width: 400 }}>
      {employee?.headings?.map((emp) => (
        <Row>
          <Col span={12}>{emp.title}</Col>
          <Col span={12}>{emp.amount}</Col>
        </Row>
      ))}
    </Card>
  );
};

export default Payslip;
