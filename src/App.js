import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import React from "react";
import { BrowserRouter, Link, Routes } from "react-router-dom";
import Home from "./components/Home";
import Feeds from "./components/Feeds";
import Todo from "./components/Todo/Todo";
import Tasks from "./components/Todo/Tasks";
import Review from "./components/Todo/Review";
import Salary from "./components/Salary/Salary";
import Payslip from "./components/Salary/Payslip";
import YTDReports from "./components/Salary/YTDReports";
import ITStatements from "./components/Salary/ITStatements";
import ITDeclaration from "./components/Salary/ITDeclaration";
import LoansandAdvances from "./components/Salary/LoansandAdvances";
import Reimbursement from "./components/Salary/Reimbursement";
import ProofofInvestment from "./components/Salary/ProofofInvestment";
import SalaryRevision from "./components/Salary/SalaryRevision";
import Leave from "./components/Leave/Leave";
import Leaveapply from "./components/Leave/Leaveapply";
import LeaveBalances from "./components/Leave/LeaveBalances";
import LeaveCalendar from "./components/Leave/LeaveCalendar";
import HolidayCalendar from "./components/Leave/HolidayCalendar";
import Attendance from "./components/Attendance/Attendance";
import AttendanceInfo from "./components/Attendance/AttendanceInfo";
import DocumentCenter from "./components/DocumentCenter/Documentcenter";
import People from "./components/People";
import Helpdesk from "./components/Helpdesk";
import WorkflowDelegates from "./components/WorkflowDelegates";
import Login from "./components/login";
import { Redirect, Route, Switch } from "react-router";
function App() {
  return (
    // <div className="App">
    // </div>
    // Router
    <BrowserRouter>
      <div>
        {/* Nav */}
        <Layout />
        {/* Switch */}
        <Routes>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/feeds" component={Feeds} />
          <Route path="/todo" component={Todo} />
          <Route path="/todo/tasks" component={Tasks} />
          <Route path="/todo/review" component={Review} />
          <Route path="/salary" component={Salary} />
          <Route path="/salary/payslip" component={Payslip} />
          <Route path="/salary/ytdreports" component={YTDReports} />
          <Route path="/salary/itstatements" component={ITStatements} />
          <Route path="/salary/itdeclaration" component={ITDeclaration} />
          <Route path="/salary/loansandadvances" component={LoansandAdvances} />
          <Route path="/salary/reimbursement" component={Reimbursement} />
          <Route
            path="/salary/proofofinvestment"
            component={ProofofInvestment}
          />
          <Route path="/salary/salaryrevision" component={SalaryRevision} />
          <Route path="/leave" component={Leave} />
          <Route path="/leave/leaveapply" component={Leaveapply} />
          <Route path="/leave/leavebalances" component={LeaveBalances} />
          <Route path="/leave/leavecalendar" component={LeaveCalendar} />
          <Route path="/leave/holidaycalendar" component={HolidayCalendar} />
          <Route path="/attendance" component={Attendance} />
          <Route path="/attendanceinfo" component={AttendanceInfo} />
          <Route path="/documentcenter" component={DocumentCenter} />
          <Route path="/people" component={People} />
          <Route path="/helpdesk" component={Helpdesk} />
          <Route path="/workflowdelegates" component={WorkflowDelegates} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
