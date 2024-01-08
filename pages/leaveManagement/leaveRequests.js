import LeaveRequests from "./../../components/LeaveRequests";
import Layout from "./../../components/Layout";

const voluntaryResignation = () => {
  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>Leave Requests</h2>
      <LeaveRequests />
    </Layout>
  );
};

export default voluntaryResignation;
