import LeaveApprovals from "./../../components/LeaveApprovals";
import Layout from "./../../components/Layout";

const voluntaryResignation = () => {
  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>Leave Approvals</h2>
      <LeaveApprovals />
    </Layout>
  );
};

export default voluntaryResignation;
