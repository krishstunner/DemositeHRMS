import { useState, useEffect } from "react";
import { Card } from "antd";
import { Bar, Line, Pie, PolarArea, Bubble } from "react-chartjs-2";
import { Chart } from "chart.js";
import { Row, Col, message } from "antd";
import Cookies from "js-cookie";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  registerables,
} from "chart.js";

const Dashboard = () => {
  const [messageApi, contextHolder] = message.useMessage();

  ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineController,
    ...registerables
  );
  const totalEmployees = 100;
  const employeesPresent = 80;
  const employeesAbsent = 20;
  const employeesInNoticePeriod = 10;
  const pendingPromotionApprovals = 5;
  const pendingExitApprovals = 3;
  const pendingLeaveApprovals = 7;

  const employeeCountData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Employee Count",
        data: [100, 110, 120, 130, 140, 150],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const employeeLeaveData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Employee Leaves",
        data: [5, 7, 3, 10, 8, 6],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const departments = [
    { name: "Sales", count: 25 },
    { name: "Marketing", count: 15 },
    { name: "Operations", count: 30 },
    { name: "Finance", count: 20 },
    { name: "HR", count: 10 },
  ];
  const labels = departments.map((dept) => dept.name);
  const counts = departments.map((dept) => dept.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: counts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const approvals = [
    { name: "Leave Approval", count: 10 },
    { name: "Promotion Approval", count: 5 },
    { name: "Voluntary Resignation Approval", count: 3 },
  ];

  // Extract labels and counts from approval data
  const labelsPolar = approvals.map((approval) => approval.name);
  const countsPolar = approvals.map((approval) => approval.count);

  // Define chart data
  const chartDataPolar = {
    labels: labelsPolar,
    datasets: [
      {
        data: countsPolar,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  const options = {
    scales: {
      x: {
        type: "category",
      },
    },
  };

  return (
    <Row gutter={[16, 16]}>
      {contextHolder}
      <Col span={6}>
        <Card
          title="Total Employees"
          bordered={false}
          style={{ background: "#F06292", color: "#FFF", fontSize: "24px" }}
        >
          <p style={{ fontWeight: "bold" }}>{totalEmployees}</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="Employees Present Today"
          bordered={false}
          style={{ background: "#BA68C8", color: "#FFF", fontSize: "24px" }}
        >
          <p style={{ fontWeight: "bold" }}>{employeesPresent}</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="Employees Absent Today"
          bordered={false}
          style={{ background: "#64B5F6", color: "#FFF", fontSize: "24px" }}
        >
          <p style={{ fontWeight: "bold" }}>{employeesAbsent}</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="Employees in Notice Period"
          bordered={false}
          style={{ background: "#81C784", color: "#FFF", fontSize: "24px" }}
        >
          <p style={{ fontWeight: "bold" }}>{employeesInNoticePeriod}</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="Pending Promotion Approvals"
          bordered={false}
          style={{ background: "#FF8A65", color: "#FFF", fontSize: "24px" }}
        >
          <p style={{ fontWeight: "bold" }}>{pendingPromotionApprovals}</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="Pending Exit Approvals"
          bordered={false}
          style={{ background: "#FFD54F", color: "#FFF", fontSize: "24px" }}
        >
          <p style={{ fontWeight: "bold" }}>{pendingExitApprovals}</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="Pending Leave Approvals"
          bordered={false}
          style={{ background: "#A1887F", color: "#FFF", fontSize: "24px" }}
        >
          <p style={{ fontWeight: "bold" }}>{pendingLeaveApprovals}</p>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Employee Count Growth">
          <Bar data={employeeCountData} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Employee Leaves">
          <Line data={employeeLeaveData} />
        </Card>
      </Col>
      {/* <Col span={12} style={{ height: "700px" }}>
        <Card title="Departments" style={{ height: "700px" }}>
          <Pie data={chartData} options={{ maintainAspectRatio: false }} />;
        </Card>
      </Col> */}
      <Col span={12}>
        <Card title="Departments">
          <Pie
            data={chartData}
            height={400}
            width={500}
            options={{ maintainAspectRatio: false }}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Approvals Pending">
          <PolarArea
            data={chartDataPolar}
            height={400}
            width={500}
            options={{ maintainAspectRatio: false }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
