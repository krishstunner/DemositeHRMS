import React from "react";
import "../style.css";
import Payslipnew from "./Payslipnew";

const earnings = {
  title: "Earnings",
  name: "John Doe",

  headings: [
    { title: "Basic", amount: "1,13,592.00" },
    { title: "HRA", amount: "56,796.00" },
    { title: "Special Earnings", amount: "43,165.00" },
    { title: "Total Allowance", amount: "2,13,553.00" },
  ],
};
const deductions = {
  title: "Deductions",
  name: "John Doe",
  headings: [
    { title: "Income Tax", amount: "13,034.00" },
    { title: "PF Employee Contribution", amount: "1,800.00" },
    { title: "Total Deductions", amount: "14,834.00" },
    { title: "Net Salary", amount: "1,98,719.00" },
    { title: "Expense Reimbursements", amount: "0.00" },
  ],
};
const netsalary = {
  title: "Net Salary",
  name: "John Doe",
  headings: [
    { title: "Net Salary", amount: "1,98,719.00" },
    { title: "Expense Reimbursements", amount: "0.00" },
  ],
};

function Payslip() {
  const DemoBox = (props) => (
    <div className="boxes">
      <p className={`height-${props.value}`}>{props.children}</p>
    </div>
  );

  return (
    <>
      <h3>Payslip</h3>
      {/* <div className="payslipContent">
        <div className="earnings">
          <DemoBox value={120}>Earnings</DemoBox>
        </div>

        <div className="deductions">
          <DemoBox value={120}>Deductions</DemoBox>
        </div>
        <div>
          <h3>Employee Details</h3>
        </div>
      </div> */}
      <div style={{ padding: "20px", display: "flex" }}>
        <Payslipnew employee={earnings} />
        <Payslipnew employee={deductions} />
        {/* <Payslipnew employee={netsalary} /> */}
      </div>
    </>
  );
}

export default Payslip;
