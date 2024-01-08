import PromotionApprovalsEmployeeTable from "./../../components/PromotionApprovals";
import Layout from "./../../components/Layout";

const PromotionEmployeesTable = () => {
  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>Promotion Approvals</h2>
      <PromotionApprovalsEmployeeTable />
    </Layout>
  );
};

export default PromotionEmployeesTable;
