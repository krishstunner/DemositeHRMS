import React from "react";
import "../style.css";
import { Card, Col, Row } from "antd";
function ITStatements() {
  return (
    <div>
      <h3>ITStatements</h3>
      <div className="itinfo">
        <Row gutter={(16, 16)}>
          <Col span={4}>
            <Card
              headStyle={{ fontSize: 12 }}
              className="taxcalculation"
              title="TAX calculated as per"
              bordered={false}
            >
              Old Tax REGIME
            </Card>
          </Col>
          <Col span={4}>
            <Card
              headStyle={{ fontSize: 12 }}
              className="taxcalculation"
              title="Net tax in Rupees"
              bordered={false}
            >
              0.00
            </Card>
          </Col>
          <Col span={4}>
            <Card
              headStyle={{ fontSize: 12 }}
              className="taxcalculation"
              title="Total tax due in Rupees"
              bordered={true}
            >
              0.00
            </Card>
          </Col>
          <Col span={4}>
            <Card
              headStyle={{ fontSize: 12 }}
              className="taxcalculation"
              title="Tax Deduction per month in Rupees"
              bordered={false}
            >
              0.00
            </Card>
          </Col>
          <Col span={4}>
            <Card
              headStyle={{ fontSize: 12 }}
              className="taxcalculation"
              title="Remaining Months"
              bordered={false}
            >
              3
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ITStatements;
