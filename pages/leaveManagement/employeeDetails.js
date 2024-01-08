import EmployeeLeaveDetails from "./../../components/EmployeeLeaveDetails";
import Layout from "./../../components/Layout";

const voluntaryResignation = () => {
  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>Leave Management</h2>
      <EmployeeLeaveDetails />
    </Layout>
  );
};

export default voluntaryResignation;
